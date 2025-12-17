/**
 * Solar Position Algorithm (SPA) Main Calculator
 * Based on NREL's Solar Position Algorithm for Solar Radiation Applications
 * 
 * This is the core SPA calculation module that orchestrates all sub-calculations
 * to determine precise solar position and rise/transit/set times.
 */

import { SpaData, SpaFunction, SpaOptions } from './types';
import { REFRACTION_CORRECTION, INVALID_VALUE } from './constants';
import {
  julianDay,
  julianCentury,
  julianEphemerisDay,
  julianEphemerisCentury,
  julianEphemerisMillennium,
} from './utils/date';
import {
  earthHeliocentricLongitude,
  earthHeliocentricLatitude,
  earthRadiusVector,
} from './calculations/earth';
import {
  geocentricLongitude,
  geocentricLatitude,
  aberrationCorrection,
  apparentSunLongitude,
  geocentricRightAscension,
  geocentricDeclination,
  sunEquatorialHorizontalParallax,
} from './calculations/sun';
import {
  meanElongationMoonSun,
  meanAnomalySun,
  meanAnomalyMoon,
  argumentLatitudeMoon,
  ascendingLongitudeMoon,
  nutationLongitudeAndObliquity,
  eclipticMeanObliquity,
  eclipticTrueObliquity,
} from './calculations/nutation';
import {
  greenwichMeanSiderealTime,
  greenwichSiderealTime,
  observerHourAngle,
  rightAscensionParallaxAndTopocentricDec,
  topocentricRightAscension,
  topocentricLocalHourAngle,
  topocentricElevationAngle,
  atmosphericRefractionCorrection,
  topocentricElevationAngleCorrected,
  topocentricZenithAngle,
  topocentricAzimuthAngleAstro,
  topocentricAzimuthAngle,
  surfaceIncidenceAngle,
} from './calculations/observer';
import { calculateEotAndSunRiseTransitSet } from './calculations/rts';

/**
 * Create a new SpaData object with default values
 */
export function createSpaData(): SpaData {
  return {
    // Input values
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    deltaUt1: 0,
    deltaT: 67,
    timezone: 0,
    longitude: 0,
    latitude: 0,
    elevation: 0,
    pressure: 1013,
    temperature: 15,
    slope: 0,
    azimuthRotation: 0,
    atmosphericRefraction: REFRACTION_CORRECTION,
    timezoneId: '',
    function: SpaFunction.SPA_ALL,

    // Intermediate values
    jd: 0,
    jc: 0,
    jde: 0,
    jce: 0,
    jme: 0,
    l: 0,
    b: 0,
    r: 0,
    theta: 0,
    beta: 0,
    x0: 0,
    x1: 0,
    x2: 0,
    x3: 0,
    x4: 0,
    delPsi: 0,
    delEpsilon: 0,
    epsilon0: 0,
    epsilon: 0,
    delTau: 0,
    lamda: 0,
    nu0: 0,
    nu: 0,
    alpha: 0,
    delta: 0,
    h: 0,
    xi: 0,
    delAlpha: 0,
    deltaPrime: 0,
    alphaPrime: 0,
    hPrime: 0,
    e0: 0,
    delE: 0,
    e: 0,
    eot: 0,
    srha: 0,
    ssha: 0,
    sta: 0,

    // Output values
    zenith: 0,
    azimuthAstro: 0,
    azimuth: 0,
    incidence: 0,
    suntransit: 0,
    sunrise: 0,
    sunset: 0,
  };
}

/**
 * Validate SPA input values
 * @returns 0 if valid, error code otherwise
 */
export function validateInputs(spa: SpaData): number {
  if (spa.year < -2000 || spa.year > 6000) return 1;
  if (spa.month < 1 || spa.month > 12) return 2;
  if (spa.day < 1 || spa.day > 31) return 3;
  if (spa.hour < 0 || spa.hour > 24) return 4;
  if (spa.minute < 0 || spa.minute > 59) return 5;
  if (spa.second < 0 || spa.second >= 60) return 6;
  if (spa.pressure < 0 || spa.pressure > 5000) return 12;
  if (spa.temperature <= -273 || spa.temperature > 6000) return 13;
  if (spa.deltaUt1 <= -1 || spa.deltaUt1 >= 1) return 17;
  if (spa.hour === 24 && spa.minute > 0) return 5;
  if (spa.hour === 24 && spa.second > 0) return 6;
  if (Math.abs(spa.deltaT) > 8000) return 7;
  if (Math.abs(spa.timezone) > 18) return 8;
  if (Math.abs(spa.longitude) > 180) return 9;
  if (Math.abs(spa.latitude) > 90) return 10;
  if (Math.abs(spa.atmosphericRefraction) > 5) return 16;
  if (spa.elevation < -6500000) return 11;
  return 0;
}

/**
 * Calculate geocentric sun right ascension and declination
 * This is a core calculation that's reused for RTS calculations
 */
export function calculateGeocentricSunRaAndDec(spa: SpaData): void {
  spa.jc = julianCentury(spa.jd);
  spa.jde = julianEphemerisDay(spa.jd, spa.deltaT);
  spa.jce = julianEphemerisCentury(spa.jde);
  spa.jme = julianEphemerisMillennium(spa.jce);

  spa.l = earthHeliocentricLongitude(spa.jme);
  spa.b = earthHeliocentricLatitude(spa.jme);
  spa.r = earthRadiusVector(spa.jme);

  spa.theta = geocentricLongitude(spa.l);
  spa.beta = geocentricLatitude(spa.b);

  // Calculate X terms for nutation
  spa.x0 = meanElongationMoonSun(spa.jce);
  spa.x1 = meanAnomalySun(spa.jce);
  spa.x2 = meanAnomalyMoon(spa.jce);
  spa.x3 = argumentLatitudeMoon(spa.jce);
  spa.x4 = ascendingLongitudeMoon(spa.jce);

  const x = [spa.x0, spa.x1, spa.x2, spa.x3, spa.x4];
  const nutation = nutationLongitudeAndObliquity(spa.jce, x);
  spa.delPsi = nutation.delPsi;
  spa.delEpsilon = nutation.delEpsilon;

  spa.epsilon0 = eclipticMeanObliquity(spa.jme);
  spa.epsilon = eclipticTrueObliquity(spa.delEpsilon, spa.epsilon0);

  spa.delTau = aberrationCorrection(spa.r);
  spa.lamda = apparentSunLongitude(spa.theta, spa.delPsi, spa.delTau);

  spa.nu0 = greenwichMeanSiderealTime(spa.jd, spa.jc);
  spa.nu = greenwichSiderealTime(spa.nu0, spa.delPsi, spa.epsilon);

  spa.alpha = geocentricRightAscension(spa.lamda, spa.epsilon, spa.beta);
  spa.delta = geocentricDeclination(spa.beta, spa.epsilon, spa.lamda);
}

/**
 * Helper function to calculate RA/Dec for a given Julian Day
 * Used by RTS calculations
 */
function calculateRaDecForJd(
  jd: number,
  deltaT: number
): { alpha: number; delta: number; nu: number } {
  const jc = julianCentury(jd);
  const jde = julianEphemerisDay(jd, deltaT);
  const jce = julianEphemerisCentury(jde);
  const jme = julianEphemerisMillennium(jce);

  const l = earthHeliocentricLongitude(jme);
  const b = earthHeliocentricLatitude(jme);
  const r = earthRadiusVector(jme);

  const theta = geocentricLongitude(l);
  const beta = geocentricLatitude(b);

  const x0 = meanElongationMoonSun(jce);
  const x1 = meanAnomalySun(jce);
  const x2 = meanAnomalyMoon(jce);
  const x3 = argumentLatitudeMoon(jce);
  const x4 = ascendingLongitudeMoon(jce);

  const x = [x0, x1, x2, x3, x4];
  const nutation = nutationLongitudeAndObliquity(jce, x);

  const epsilon0 = eclipticMeanObliquity(jme);
  const epsilon = eclipticTrueObliquity(nutation.delEpsilon, epsilon0);

  const delTau = aberrationCorrection(r);
  const lamda = apparentSunLongitude(theta, nutation.delPsi, delTau);

  const nu0 = greenwichMeanSiderealTime(jd, jc);
  const nu = greenwichSiderealTime(nu0, nutation.delPsi, epsilon);

  const alpha = geocentricRightAscension(lamda, epsilon, beta);
  const delta = geocentricDeclination(beta, epsilon, lamda);

  return { alpha, delta, nu };
}

/**
 * Main SPA calculation function
 * Calculates all solar position values based on input parameters
 * 
 * @param spa - SPA data object with input values filled in
 * @returns 0 if successful, error code otherwise
 */
export function spaCalculate(spa: SpaData): number {
  const result = validateInputs(spa);
  if (result !== 0) {
    return result;
  }

  // Calculate Julian Day
  spa.jd = julianDay(
    spa.year,
    spa.month,
    spa.day,
    spa.hour,
    spa.minute,
    spa.second,
    spa.deltaUt1,
    spa.timezone
  );

  // Calculate geocentric sun position
  calculateGeocentricSunRaAndDec(spa);

  // Calculate observer-specific values
  spa.h = observerHourAngle(spa.nu, spa.longitude, spa.alpha);
  spa.xi = sunEquatorialHorizontalParallax(spa.r);

  const parallax = rightAscensionParallaxAndTopocentricDec(
    spa.latitude,
    spa.elevation,
    spa.xi,
    spa.h,
    spa.delta
  );
  spa.delAlpha = parallax.deltaAlpha;
  spa.deltaPrime = parallax.deltaPrime;

  spa.alphaPrime = topocentricRightAscension(spa.alpha, spa.delAlpha);
  spa.hPrime = topocentricLocalHourAngle(spa.h, spa.delAlpha);

  spa.e0 = topocentricElevationAngle(spa.latitude, spa.deltaPrime, spa.hPrime);
  spa.delE = atmosphericRefractionCorrection(
    spa.pressure,
    spa.temperature,
    spa.atmosphericRefraction,
    spa.e0
  );
  spa.e = topocentricElevationAngleCorrected(spa.e0, spa.delE);

  spa.zenith = topocentricZenithAngle(spa.e);
  spa.azimuthAstro = topocentricAzimuthAngleAstro(
    spa.hPrime,
    spa.latitude,
    spa.deltaPrime
  );
  spa.azimuth = topocentricAzimuthAngle(spa.azimuthAstro);

  // Calculate incidence angle if requested
  if (
    spa.function === SpaFunction.SPA_ZA_INC ||
    spa.function === SpaFunction.SPA_ALL
  ) {
    spa.incidence = surfaceIncidenceAngle(
      spa.zenith,
      spa.azimuthAstro,
      spa.azimuthRotation,
      spa.slope
    );
  }

  // Calculate RTS if requested
  if (
    spa.function === SpaFunction.SPA_ZA_RTS ||
    spa.function === SpaFunction.SPA_ALL
  ) {
    const rts = calculateEotAndSunRiseTransitSet(spa, calculateRaDecForJd);
    spa.sunrise = rts.sunrise;
    spa.suntransit = rts.suntransit;
    spa.sunset = rts.sunset;
    spa.srha = rts.srha;
    spa.ssha = rts.ssha;
    spa.sta = rts.sta;
    spa.eot = rts.eot;
  }

  return 0;
}

/**
 * Initialize SPA data from a Date object and coordinates
 */
export function initSpaFromDate(
  date: Date,
  latitude: number,
  longitude: number,
  options: SpaOptions = {}
): SpaData {
  const spa = createSpaData();

  // Use local time components
  spa.year = date.getFullYear();
  spa.month = date.getMonth() + 1;
  spa.day = date.getDate();
  spa.hour = date.getHours();
  spa.minute = date.getMinutes();
  spa.second = date.getSeconds() + date.getMilliseconds() / 1000;

  if (options.timezone !== undefined) {
    spa.timezone = options.timezone;
  } else {
    spa.timezone = -date.getTimezoneOffset() / 60;
  }

  spa.timezoneId = options.timezoneId ?? '';

  spa.latitude = latitude;
  spa.longitude = longitude;

  // Apply options
  spa.elevation = options.elevation ?? 0;
  spa.pressure = options.pressure ?? 1013;
  spa.temperature = options.temperature ?? 15;
  spa.deltaUt1 = options.deltaUt1 ?? 0;
  spa.deltaT = options.deltaT ?? 67;
  spa.slope = options.slope ?? 0;
  spa.azimuthRotation = options.azimuthRotation ?? 0;
  spa.atmosphericRefraction = options.atmosphericRefraction ?? REFRACTION_CORRECTION;

  spa.function = SpaFunction.SPA_ALL;

  return spa;
}

/**
 * Check if a sunrise/sunset time is valid (not polar day/night)
 */
export function isValidSunTime(time: number): boolean {
  return time !== INVALID_VALUE && isFinite(time) && time >= 0;
}
