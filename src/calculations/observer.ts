/**
 * Observer position and topocentric calculations for Solar Position Algorithm
 */

import { SUN_RADIUS } from '../constants';
import { deg2rad, rad2deg, limitDegrees } from '../utils/math';
import { ParallaxResult } from '../types';

/**
 * Calculate Greenwich mean sidereal time
 * @param jd - Julian Day
 * @param jc - Julian Century
 * @returns Greenwich mean sidereal time in degrees
 */
export function greenwichMeanSiderealTime(jd: number, jc: number): number {
  return limitDegrees(
    280.46061837 +
      360.98564736629 * (jd - 2451545.0) +
      jc * jc * (0.000387933 - jc / 38710000.0)
  );
}

/**
 * Calculate Greenwich sidereal time
 * @param nu0 - Greenwich mean sidereal time in degrees
 * @param deltaPsi - Nutation in longitude in degrees
 * @param epsilon - True obliquity in degrees
 * @returns Greenwich sidereal time in degrees
 */
export function greenwichSiderealTime(
  nu0: number,
  deltaPsi: number,
  epsilon: number
): number {
  return nu0 + deltaPsi * Math.cos(deg2rad(epsilon));
}

/**
 * Calculate observer hour angle
 * @param nu - Greenwich sidereal time in degrees
 * @param longitude - Observer longitude in degrees
 * @param alphaDeg - Geocentric right ascension in degrees
 * @returns Observer hour angle in degrees
 */
export function observerHourAngle(
  nu: number,
  longitude: number,
  alphaDeg: number
): number {
  return limitDegrees(nu + longitude - alphaDeg);
}

/**
 * Calculate right ascension parallax and topocentric declination
 * @param latitude - Observer latitude in degrees
 * @param elevation - Observer elevation in meters
 * @param xi - Sun equatorial horizontal parallax in degrees
 * @param h - Observer hour angle in degrees
 * @param delta - Geocentric declination in degrees
 * @returns Parallax result with deltaAlpha and deltaPrime
 */
export function rightAscensionParallaxAndTopocentricDec(
  latitude: number,
  elevation: number,
  xi: number,
  h: number,
  delta: number
): ParallaxResult {
  const latRad = deg2rad(latitude);
  const xiRad = deg2rad(xi);
  const hRad = deg2rad(h);
  const deltaRad = deg2rad(delta);

  const u = Math.atan(0.99664719 * Math.tan(latRad));
  const y =
    0.99664719 * Math.sin(u) + (elevation * Math.sin(latRad)) / 6378140.0;
  const x = Math.cos(u) + (elevation * Math.cos(latRad)) / 6378140.0;

  const deltaAlphaRad = Math.atan2(
    -x * Math.sin(xiRad) * Math.sin(hRad),
    Math.cos(deltaRad) - x * Math.sin(xiRad) * Math.cos(hRad)
  );

  const deltaPrime = rad2deg(
    Math.atan2(
      (Math.sin(deltaRad) - y * Math.sin(xiRad)) * Math.cos(deltaAlphaRad),
      Math.cos(deltaRad) - x * Math.sin(xiRad) * Math.cos(hRad)
    )
  );

  return {
    deltaAlpha: rad2deg(deltaAlphaRad),
    deltaPrime,
  };
}

/**
 * Calculate topocentric right ascension
 * @param alphaDeg - Geocentric right ascension in degrees
 * @param deltaAlpha - Right ascension parallax in degrees
 * @returns Topocentric right ascension in degrees
 */
export function topocentricRightAscension(
  alphaDeg: number,
  deltaAlpha: number
): number {
  return alphaDeg + deltaAlpha;
}

/**
 * Calculate topocentric local hour angle
 * @param h - Observer hour angle in degrees
 * @param deltaAlpha - Right ascension parallax in degrees
 * @returns Topocentric local hour angle in degrees
 */
export function topocentricLocalHourAngle(
  h: number,
  deltaAlpha: number
): number {
  return h - deltaAlpha;
}

/**
 * Calculate topocentric elevation angle (uncorrected)
 * @param latitude - Observer latitude in degrees
 * @param deltaPrime - Topocentric declination in degrees
 * @param hPrime - Topocentric local hour angle in degrees
 * @returns Topocentric elevation angle in degrees
 */
export function topocentricElevationAngle(
  latitude: number,
  deltaPrime: number,
  hPrime: number
): number {
  const latRad = deg2rad(latitude);
  const deltaPrimeRad = deg2rad(deltaPrime);

  return rad2deg(
    Math.asin(
      Math.sin(latRad) * Math.sin(deltaPrimeRad) +
        Math.cos(latRad) * Math.cos(deltaPrimeRad) * Math.cos(deg2rad(hPrime))
    )
  );
}

/**
 * Calculate atmospheric refraction correction
 * @param pressure - Atmospheric pressure in millibars
 * @param temperature - Temperature in Celsius
 * @param atmosphericRefraction - Atmospheric refraction at sunrise/sunset in degrees
 * @param e0 - Uncorrected elevation angle in degrees
 * @returns Refraction correction in degrees
 */
export function atmosphericRefractionCorrection(
  pressure: number,
  temperature: number,
  atmosphericRefraction: number,
  e0: number
): number {
  let delE = 0;
  if (e0 >= -1 * (SUN_RADIUS + atmosphericRefraction)) {
    delE =
      (pressure / 1010.0) *
      (283.0 / (273.0 + temperature)) *
      (1.02 / (60.0 * Math.tan(deg2rad(e0 + 10.3 / (e0 + 5.11)))));
  }
  return delE;
}

/**
 * Calculate topocentric elevation angle (corrected for refraction)
 * @param e0 - Uncorrected elevation angle in degrees
 * @param deltaE - Atmospheric refraction correction in degrees
 * @returns Corrected topocentric elevation angle in degrees
 */
export function topocentricElevationAngleCorrected(
  e0: number,
  deltaE: number
): number {
  return e0 + deltaE;
}

/**
 * Calculate topocentric zenith angle
 * @param e - Topocentric elevation angle in degrees
 * @returns Topocentric zenith angle in degrees
 */
export function topocentricZenithAngle(e: number): number {
  return 90.0 - e;
}

/**
 * Calculate topocentric azimuth angle (astronomers' convention - westward from south)
 * @param hPrime - Topocentric local hour angle in degrees
 * @param latitude - Observer latitude in degrees
 * @param deltaPrime - Topocentric declination in degrees
 * @returns Azimuth angle in degrees
 */
export function topocentricAzimuthAngleAstro(
  hPrime: number,
  latitude: number,
  deltaPrime: number
): number {
  const hPrimeRad = deg2rad(hPrime);
  const latRad = deg2rad(latitude);

  return limitDegrees(
    rad2deg(
      Math.atan2(
        Math.sin(hPrimeRad),
        Math.cos(hPrimeRad) * Math.sin(latRad) -
          Math.tan(deg2rad(deltaPrime)) * Math.cos(latRad)
      )
    )
  );
}

/**
 * Calculate topocentric azimuth angle (navigators' convention - eastward from north)
 * @param azimuthAstro - Astronomical azimuth in degrees
 * @returns Azimuth angle in degrees
 */
export function topocentricAzimuthAngle(azimuthAstro: number): number {
  return limitDegrees(azimuthAstro + 180.0);
}

/**
 * Calculate surface incidence angle
 * @param zenith - Topocentric zenith angle in degrees
 * @param azimuthAstro - Astronomical azimuth in degrees
 * @param azimuthRotation - Surface azimuth rotation in degrees
 * @param slope - Surface slope in degrees
 * @returns Surface incidence angle in degrees
 */
export function surfaceIncidenceAngle(
  zenith: number,
  azimuthAstro: number,
  azimuthRotation: number,
  slope: number
): number {
  const zenithRad = deg2rad(zenith);
  const slopeRad = deg2rad(slope);

  return rad2deg(
    Math.acos(
      Math.cos(zenithRad) * Math.cos(slopeRad) +
        Math.sin(slopeRad) *
          Math.sin(zenithRad) *
          Math.cos(deg2rad(azimuthAstro - azimuthRotation))
    )
  );
}
