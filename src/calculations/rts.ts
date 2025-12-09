/**
 * Sunrise, Transit, and Sunset (RTS) calculations for Solar Position Algorithm
 * Handles high-latitude edge cases (polar day/night)
 */

import { SUN_RADIUS, INVALID_VALUE } from '../constants';
import { JDSign, SunState, SpaData } from '../types';
import {
  deg2rad,
  rad2deg,
  limitDegrees180,
  limitDegrees180pm,
  limitZero2one,
  limitMinutes,
} from '../utils/math';
import { julianDay } from '../utils/date';
import { dayfracToLocalHr } from '../utils/time';
import { sunMeanLongitude } from './sun';

/**
 * Calculate sun hour angle at rise/set for a given zenith
 * @param latitude - Observer latitude in degrees
 * @param deltaZero - Geocentric declination at noon in degrees
 * @param h0Prime - Zenith angle for rise/set (negative of elevation at horizon)
 * @returns Hour angle in degrees, or INVALID_VALUE if sun doesn't rise/set (polar day/night)
 */
export function sunHourAngleAtRiseSet(
  latitude: number,
  deltaZero: number,
  h0Prime: number
): number {
  const latitudeRad = deg2rad(latitude);
  const deltaZeroRad = deg2rad(deltaZero);

  const argument =
    (Math.sin(deg2rad(h0Prime)) -
      Math.sin(latitudeRad) * Math.sin(deltaZeroRad)) /
    (Math.cos(latitudeRad) * Math.cos(deltaZeroRad));

  if (Math.abs(argument) <= 1) {
    return limitDegrees180(rad2deg(Math.acos(argument)));
  }

  // Sun never rises or sets (polar day or polar night)
  return INVALID_VALUE;
}

/**
 * Calculate approximate sun transit time
 * @param alphaZero - Right ascension at noon in degrees
 * @param longitude - Observer longitude in degrees
 * @param nu - Greenwich sidereal time in degrees
 * @returns Approximate transit time as day fraction
 */
export function approxSunTransitTime(
  alphaZero: number,
  longitude: number,
  nu: number
): number {
  return (alphaZero - longitude - nu) / 360.0;
}

/**
 * Calculate approximate sunrise and sunset times
 * @param mRts - Array to store [transit, rise, set] day fractions (modified in place)
 * @param h0 - Hour angle at rise/set in degrees
 */
export function approxSunRiseAndSet(mRts: number[], h0: number): void {
  const h0Dfrac = h0 / 360.0;
  mRts[SunState.SUN_RISE] = limitZero2one(mRts[SunState.SUN_TRANSIT] - h0Dfrac);
  mRts[SunState.SUN_SET] = limitZero2one(mRts[SunState.SUN_TRANSIT] + h0Dfrac);
  mRts[SunState.SUN_TRANSIT] = limitZero2one(mRts[SunState.SUN_TRANSIT]);
}

/**
 * Calculate interpolated alpha or delta for RTS
 * @param ad - Array of [yesterday, today, tomorrow] values
 * @param n - Interpolation factor
 * @returns Interpolated value
 */
export function rtsAlphaDeltaPrime(ad: number[], n: number): number {
  let a = ad[JDSign.JD_ZERO] - ad[JDSign.JD_MINUS];
  let b = ad[JDSign.JD_PLUS] - ad[JDSign.JD_ZERO];

  // Handle wraparound for right ascension
  if (Math.abs(a) >= 2.0) {
    a = limitZero2one(a);
  }
  if (Math.abs(b) >= 2.0) {
    b = limitZero2one(b);
  }

  return ad[JDSign.JD_ZERO] + (n * (a + b + (b - a) * n)) / 2.0;
}

/**
 * Calculate sun altitude for RTS
 * @param latitude - Observer latitude in degrees
 * @param deltaPrime - Topocentric declination in degrees
 * @param hPrime - Topocentric hour angle in degrees
 * @returns Sun altitude in degrees
 */
export function rtsSunAltitude(
  latitude: number,
  deltaPrime: number,
  hPrime: number
): number {
  const latitudeRad = deg2rad(latitude);
  const deltaPrimeRad = deg2rad(deltaPrime);

  return rad2deg(
    Math.asin(
      Math.sin(latitudeRad) * Math.sin(deltaPrimeRad) +
        Math.cos(latitudeRad) *
          Math.cos(deltaPrimeRad) *
          Math.cos(deg2rad(hPrime))
    )
  );
}

/**
 * Calculate refined sunrise or sunset time
 * @param mRts - Array of [transit, rise, set] day fractions
 * @param hRts - Array of sun altitudes at [transit, rise, set]
 * @param deltaPrime - Array of topocentric declinations
 * @param latitude - Observer latitude in degrees
 * @param hPrime - Array of topocentric hour angles
 * @param h0Prime - Target elevation at horizon
 * @param sun - SunState indicating which time to calculate
 * @returns Refined day fraction for the requested sun state
 */
export function sunRiseAndSet(
  mRts: number[],
  hRts: number[],
  deltaPrime: number[],
  latitude: number,
  hPrime: number[],
  h0Prime: number,
  sun: SunState
): number {
  return (
    mRts[sun] +
    (hRts[sun] - h0Prime) /
      (360.0 *
        Math.cos(deg2rad(deltaPrime[sun])) *
        Math.cos(deg2rad(latitude)) *
        Math.sin(deg2rad(hPrime[sun])))
  );
}

/**
 * Calculate equation of time
 * @param m - Sun mean longitude in degrees
 * @param alpha - Geocentric right ascension in degrees
 * @param delPsi - Nutation in longitude in degrees
 * @param epsilon - True obliquity in degrees
 * @returns Equation of time in minutes
 */
export function equationOfTime(
  m: number,
  alpha: number,
  delPsi: number,
  epsilon: number
): number {
  return limitMinutes(
    4.0 * (m - 0.0057183 - alpha + delPsi * Math.cos(deg2rad(epsilon)))
  );
}

/**
 * RTS calculation result interface
 */
export interface RtsResult {
  /** Sunrise time in fractional hours (local time) */
  sunrise: number;
  /** Solar noon/transit time in fractional hours (local time) */
  suntransit: number;
  /** Sunset time in fractional hours (local time) */
  sunset: number;
  /** Sunrise hour angle in degrees */
  srha: number;
  /** Sunset hour angle in degrees */
  ssha: number;
  /** Sun transit altitude in degrees */
  sta: number;
  /** Equation of time in minutes */
  eot: number;
}

/**
 * Calculate equation of time and sun rise/transit/set times
 * This is the main RTS calculation function that handles high-latitude cases
 * 
 * @param spa - SPA data object with all calculated values
 * @param calculateRaDec - Function to calculate RA and Dec for a given Julian Day
 * @returns RTS calculation results
 */
export function calculateEotAndSunRiseTransitSet(
  spa: SpaData,
  calculateRaDec: (jd: number, deltaT: number) => { alpha: number; delta: number; nu: number }
): RtsResult {
  const h0Prime = -1 * (SUN_RADIUS + spa.atmosphericRefraction);

  // Calculate values at midnight UTC
  const sunRtsJd = julianDay(
    spa.year,
    spa.month,
    spa.day,
    0, 0, 0, 0, 0
  );

  // Get RA/Dec at midnight
  const rtsNoon = calculateRaDec(sunRtsJd, spa.deltaT);
  const nu = rtsNoon.nu;

  // Calculate equation of time
  const m = sunMeanLongitude(spa.jme);
  const eot = equationOfTime(m, spa.alpha, spa.delPsi, spa.epsilon);

  // Calculate RA/Dec for yesterday, today, tomorrow
  const alpha: number[] = [];
  const delta: number[] = [];

  for (let i = 0; i < JDSign.JD_COUNT; i++) {
    const result = calculateRaDec(sunRtsJd + i - 1, spa.deltaT);
    alpha[i] = result.alpha;
    delta[i] = result.delta;
  }

  // Calculate approximate transit time
  const mRts: number[] = [];
  mRts[SunState.SUN_TRANSIT] = approxSunTransitTime(
    alpha[JDSign.JD_ZERO],
    spa.longitude,
    nu
  );

  // Calculate hour angle at rise/set
  const h0 = sunHourAngleAtRiseSet(spa.latitude, delta[JDSign.JD_ZERO], h0Prime);

  // Handle polar day/night
  if (h0 === INVALID_VALUE) {
    return {
      sunrise: INVALID_VALUE,
      suntransit: INVALID_VALUE,
      sunset: INVALID_VALUE,
      srha: INVALID_VALUE,
      ssha: INVALID_VALUE,
      sta: INVALID_VALUE,
      eot,
    };
  }

  // Calculate approximate rise/set times
  approxSunRiseAndSet(mRts, h0);

  // Refine calculations using interpolation
  const nuRts: number[] = [];
  const hPrime: number[] = [];
  const alphaPrime: number[] = [];
  const deltaPrime: number[] = [];
  const hRts: number[] = [];

  for (let i = 0; i < SunState.SUN_COUNT; i++) {
    nuRts[i] = nu + 360.985647 * mRts[i];
    const n = mRts[i] + spa.deltaT / 86400.0;
    alphaPrime[i] = rtsAlphaDeltaPrime(alpha, n);
    deltaPrime[i] = rtsAlphaDeltaPrime(delta, n);
    hPrime[i] = limitDegrees180pm(nuRts[i] + spa.longitude - alphaPrime[i]);
    hRts[i] = rtsSunAltitude(spa.latitude, deltaPrime[i], hPrime[i]);
  }

  // Calculate final times
  const srha = hPrime[SunState.SUN_RISE];
  const ssha = hPrime[SunState.SUN_SET];
  const sta = hRts[SunState.SUN_TRANSIT];

  const suntransit = dayfracToLocalHr(
    mRts[SunState.SUN_TRANSIT] - hPrime[SunState.SUN_TRANSIT] / 360.0,
    spa.timezone
  );

  const sunrise = dayfracToLocalHr(
    sunRiseAndSet(mRts, hRts, deltaPrime, spa.latitude, hPrime, h0Prime, SunState.SUN_RISE),
    spa.timezone
  );

  const sunset = dayfracToLocalHr(
    sunRiseAndSet(mRts, hRts, deltaPrime, spa.latitude, hPrime, h0Prime, SunState.SUN_SET),
    spa.timezone
  );

  return {
    sunrise,
    suntransit,
    sunset,
    srha,
    ssha,
    sta,
    eot,
  };
}

/**
 * Calculate sunrise/sunset for a custom zenith angle (for twilight calculations)
 * @param latitude - Observer latitude in degrees
 * @param delta - Sun declination in degrees
 * @param suntransit - Solar noon time in fractional hours
 * @param zenithAngle - Custom zenith angle in degrees
 * @returns Object with sunrise and sunset in fractional hours, or null values for polar cases
 */
export function calculateCustomZenithTimes(
  latitude: number,
  delta: number,
  suntransit: number,
  zenithAngle: number
): { sunrise: number | null; sunset: number | null } {
  const latRad = deg2rad(latitude);
  const deltaRad = deg2rad(delta);
  const zenithRad = deg2rad(zenithAngle);

  const cosH0 =
    (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(deltaRad)) /
    (Math.cos(latRad) * Math.cos(deltaRad));

  // Check for polar day/night at this zenith angle
  if (cosH0 < -1 || cosH0 > 1) {
    return { sunrise: null, sunset: null };
  }

  const H0h = (rad2deg(Math.acos(cosH0))) / 15; // Convert to hours

  return {
    sunrise: suntransit - H0h,
    sunset: suntransit + H0h,
  };
}
