/**
 * Sun position calculations for Solar Position Algorithm
 * Calculates geocentric position, right ascension, declination
 */

import { deg2rad, rad2deg, limitDegrees } from '../utils/math';

/**
 * Calculate geocentric longitude from heliocentric longitude
 * @param l - Heliocentric longitude in degrees
 * @returns Geocentric longitude in degrees
 */
export function geocentricLongitude(l: number): number {
  let theta = l + 180.0;
  if (theta >= 360.0) {
    theta -= 360.0;
  }
  return theta;
}

/**
 * Calculate geocentric latitude from heliocentric latitude
 * @param b - Heliocentric latitude in degrees
 * @returns Geocentric latitude in degrees
 */
export function geocentricLatitude(b: number): number {
  return -b;
}

/**
 * Calculate the aberration correction
 * @param r - Earth radius vector in AU
 * @returns Aberration correction in degrees
 */
export function aberrationCorrection(r: number): number {
  return -20.4898 / (3600.0 * r);
}

/**
 * Calculate the apparent sun longitude
 * @param theta - Geocentric longitude in degrees
 * @param deltaPsi - Nutation in longitude in degrees
 * @param deltaTau - Aberration correction in degrees
 * @returns Apparent sun longitude in degrees
 */
export function apparentSunLongitude(
  theta: number,
  deltaPsi: number,
  deltaTau: number
): number {
  return theta + deltaPsi + deltaTau;
}

/**
 * Calculate geocentric sun right ascension
 * @param lamda - Apparent sun longitude in degrees
 * @param epsilon - True obliquity of ecliptic in degrees
 * @param beta - Geocentric latitude in degrees
 * @returns Right ascension in degrees (0-360)
 */
export function geocentricRightAscension(
  lamda: number,
  epsilon: number,
  beta: number
): number {
  const lamdaRad = deg2rad(lamda);
  const epsilonRad = deg2rad(epsilon);

  return limitDegrees(
    rad2deg(
      Math.atan2(
        Math.sin(lamdaRad) * Math.cos(epsilonRad) -
          Math.tan(deg2rad(beta)) * Math.sin(epsilonRad),
        Math.cos(lamdaRad)
      )
    )
  );
}

/**
 * Calculate geocentric sun declination
 * @param beta - Geocentric latitude in degrees
 * @param epsilon - True obliquity of ecliptic in degrees
 * @param lamda - Apparent sun longitude in degrees
 * @returns Declination in degrees
 */
export function geocentricDeclination(
  beta: number,
  epsilon: number,
  lamda: number
): number {
  const betaRad = deg2rad(beta);
  const epsilonRad = deg2rad(epsilon);

  return rad2deg(
    Math.asin(
      Math.sin(betaRad) * Math.cos(epsilonRad) +
        Math.cos(betaRad) * Math.sin(epsilonRad) * Math.sin(deg2rad(lamda))
    )
  );
}

/**
 * Calculate sun mean longitude
 * @param jme - Julian Ephemeris Millennium
 * @returns Mean longitude in degrees
 */
export function sunMeanLongitude(jme: number): number {
  return limitDegrees(
    280.4664567 +
      jme *
        (360007.6982779 +
          jme *
            (0.03032028 +
              jme * (1 / 49931.0 + jme * (-1 / 15300.0 + jme * (-1 / 2000000.0)))))
  );
}

/**
 * Calculate sun equatorial horizontal parallax
 * @param r - Earth radius vector in AU
 * @returns Parallax in degrees
 */
export function sunEquatorialHorizontalParallax(r: number): number {
  return 8.794 / (3600.0 * r);
}
