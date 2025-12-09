/**
 * Earth position calculations for Solar Position Algorithm
 * Calculates heliocentric longitude, latitude, and radius vector
 */

import {
  L_TERMS,
  B_TERMS,
  R_TERMS,
  L_COUNT,
  B_COUNT,
  R_COUNT,
  L_SUBCOUNT,
  B_SUBCOUNT,
  R_SUBCOUNT,
  TERM_A,
  TERM_B,
  TERM_C,
} from '../constants';
import { rad2deg, limitDegrees } from '../utils/math';

/**
 * Calculate the sum of periodic terms for a given series
 * @param terms - Array of [A, B, C] coefficients
 * @param count - Number of terms to sum
 * @param jme - Julian Ephemeris Millennium
 * @returns Sum of periodic terms
 */
function earthPeriodicTermSummation(
  terms: number[][],
  count: number,
  jme: number
): number {
  let sum = 0;
  for (let i = 0; i < count; i++) {
    sum += terms[i][TERM_A] * Math.cos(terms[i][TERM_B] + terms[i][TERM_C] * jme);
  }
  return sum;
}

/**
 * Calculate the value from periodic term sums
 * @param termSum - Array of periodic term sums
 * @param count - Number of series
 * @param jme - Julian Ephemeris Millennium
 * @returns Combined value
 */
function earthValues(termSum: number[], count: number, jme: number): number {
  let sum = 0;
  for (let i = 0; i < count; i++) {
    sum += termSum[i] * Math.pow(jme, i);
  }
  sum /= 1.0e8;
  return sum;
}

/**
 * Calculate Earth's heliocentric longitude
 * @param jme - Julian Ephemeris Millennium
 * @returns Heliocentric longitude in degrees (0-360)
 */
export function earthHeliocentricLongitude(jme: number): number {
  const sum: number[] = [];
  for (let i = 0; i < L_COUNT; i++) {
    sum[i] = earthPeriodicTermSummation(L_TERMS[i], L_SUBCOUNT[i], jme);
  }
  return limitDegrees(rad2deg(earthValues(sum, L_COUNT, jme)));
}

/**
 * Calculate Earth's heliocentric latitude
 * @param jme - Julian Ephemeris Millennium
 * @returns Heliocentric latitude in degrees
 */
export function earthHeliocentricLatitude(jme: number): number {
  const sum: number[] = [];
  for (let i = 0; i < B_COUNT; i++) {
    sum[i] = earthPeriodicTermSummation(B_TERMS[i], B_SUBCOUNT[i], jme);
  }
  return rad2deg(earthValues(sum, B_COUNT, jme));
}

/**
 * Calculate Earth's radius vector (distance from Sun)
 * @param jme - Julian Ephemeris Millennium
 * @returns Radius vector in Astronomical Units (AU)
 */
export function earthRadiusVector(jme: number): number {
  const sum: number[] = [];
  for (let i = 0; i < R_COUNT; i++) {
    sum[i] = earthPeriodicTermSummation(R_TERMS[i], R_SUBCOUNT[i], jme);
  }
  return earthValues(sum, R_COUNT, jme);
}
