/**
 * Nutation and obliquity calculations for Solar Position Algorithm
 */

import {
  Y_TERMS,
  PE_TERMS,
  Y_COUNT,
  TERM_X_COUNT,
  TERM_PSI_A,
  TERM_PSI_B,
  TERM_EPS_C,
  TERM_EPS_D,
} from '../constants';
import { deg2rad, thirdOrderPolynomial } from '../utils/math';

/**
 * Nutation calculation result
 */
export interface NutationResult {
  /** Nutation in longitude (degrees) */
  delPsi: number;
  /** Nutation in obliquity (degrees) */
  delEpsilon: number;
}

/**
 * Calculate mean elongation of the Moon from the Sun
 * @param jce - Julian Ephemeris Century
 * @returns Mean elongation in degrees
 */
export function meanElongationMoonSun(jce: number): number {
  return thirdOrderPolynomial(
    1.0 / 189474.0,
    -0.0019142,
    445267.11148,
    297.85036,
    jce
  );
}

/**
 * Calculate mean anomaly of the Sun
 * @param jce - Julian Ephemeris Century
 * @returns Mean anomaly in degrees
 */
export function meanAnomalySun(jce: number): number {
  return thirdOrderPolynomial(
    -1.0 / 300000.0,
    -0.0001603,
    35999.05034,
    357.52772,
    jce
  );
}

/**
 * Calculate mean anomaly of the Moon
 * @param jce - Julian Ephemeris Century
 * @returns Mean anomaly in degrees
 */
export function meanAnomalyMoon(jce: number): number {
  return thirdOrderPolynomial(
    1.0 / 56250.0,
    0.0086972,
    477198.867398,
    134.96298,
    jce
  );
}

/**
 * Calculate argument of latitude of the Moon
 * @param jce - Julian Ephemeris Century
 * @returns Argument of latitude in degrees
 */
export function argumentLatitudeMoon(jce: number): number {
  return thirdOrderPolynomial(
    1.0 / 327270.0,
    -0.0036825,
    483202.017538,
    93.27191,
    jce
  );
}

/**
 * Calculate ascending node longitude of the Moon
 * @param jce - Julian Ephemeris Century
 * @returns Ascending longitude in degrees
 */
export function ascendingLongitudeMoon(jce: number): number {
  return thirdOrderPolynomial(
    1.0 / 450000.0,
    0.0020708,
    -1934.136261,
    125.04452,
    jce
  );
}

/**
 * Calculate XY term summation for nutation
 */
function xyTermSummation(i: number, x: number[]): number {
  let sum = 0;
  for (let j = 0; j < TERM_X_COUNT; j++) {
    sum += x[j] * Y_TERMS[i][j];
  }
  return sum;
}

/**
 * Calculate nutation in longitude and obliquity
 * @param jce - Julian Ephemeris Century
 * @param x - Array of X terms [x0, x1, x2, x3, x4]
 * @returns Nutation in longitude and obliquity (degrees)
 */
export function nutationLongitudeAndObliquity(
  jce: number,
  x: number[]
): NutationResult {
  let sumPsi = 0;
  let sumEpsilon = 0;

  for (let i = 0; i < Y_COUNT; i++) {
    const xyTermSum = deg2rad(xyTermSummation(i, x));
    sumPsi +=
      (PE_TERMS[i][TERM_PSI_A] + jce * PE_TERMS[i][TERM_PSI_B]) *
      Math.sin(xyTermSum);
    sumEpsilon +=
      (PE_TERMS[i][TERM_EPS_C] + jce * PE_TERMS[i][TERM_EPS_D]) *
      Math.cos(xyTermSum);
  }

  return {
    delPsi: sumPsi / 36000000.0,
    delEpsilon: sumEpsilon / 36000000.0,
  };
}

/**
 * Calculate ecliptic mean obliquity
 * @param jme - Julian Ephemeris Millennium
 * @returns Mean obliquity in arc seconds
 */
export function eclipticMeanObliquity(jme: number): number {
  const u = jme / 10.0;
  return (
    84381.448 +
    u *
      (-4680.93 +
        u *
          (-1.55 +
            u *
              (1999.25 +
                u *
                  (-51.38 +
                    u *
                      (-249.67 +
                        u *
                          (-39.05 + u * (7.12 + u * (27.87 + u * (5.79 + u * 2.45)))))))))
  );
}

/**
 * Calculate ecliptic true obliquity
 * @param deltaEpsilon - Nutation in obliquity (degrees)
 * @param epsilon0 - Mean obliquity (arc seconds)
 * @returns True obliquity in degrees
 */
export function eclipticTrueObliquity(
  deltaEpsilon: number,
  epsilon0: number
): number {
  return deltaEpsilon + epsilon0 / 3600.0;
}
