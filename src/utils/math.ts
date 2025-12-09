/**
 * Mathematical utility functions for Solar Position Algorithm
 */

import { PI } from '../constants';

/**
 * Convert degrees to radians
 */
export function deg2rad(degrees: number): number {
  return (PI / 180.0) * degrees;
}

/**
 * Convert radians to degrees
 */
export function rad2deg(radians: number): number {
  return (180.0 / PI) * radians;
}

/**
 * Limit degrees to 0-360 range
 */
export function limitDegrees(degrees: number): number {
  let limited = degrees / 360.0;
  limited = 360.0 * (limited - Math.floor(limited));
  if (limited < 0) {
    limited += 360.0;
  }
  return limited;
}

/**
 * Limit degrees to 0-180 range
 */
export function limitDegrees180(degrees: number): number {
  let limited = degrees / 180.0;
  limited = 180.0 * (limited - Math.floor(limited));
  if (limited < 0) {
    limited += 180.0;
  }
  return limited;
}

/**
 * Limit degrees to -180 to +180 range
 */
export function limitDegrees180pm(degrees: number): number {
  let limited = degrees / 360.0;
  limited = 360.0 * (limited - Math.floor(limited));
  if (limited < -180.0) {
    limited += 360.0;
  } else if (limited > 180.0) {
    limited -= 360.0;
  }
  return limited;
}

/**
 * Limit value to 0-1 range (fractional day)
 */
export function limitZero2one(value: number): number {
  let limited = value - Math.floor(value);
  if (limited < 0) {
    limited += 1.0;
  }
  return limited;
}

/**
 * Calculate third-order polynomial: ((a*x + b)*x + c)*x + d
 */
export function thirdOrderPolynomial(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number
): number {
  return ((a * x + b) * x + c) * x + d;
}

/**
 * Limit minutes to -20 to 20 range (for equation of time)
 */
export function limitMinutes(minutes: number): number {
  let limited = minutes;
  if (limited < -20.0) {
    limited += 1440.0;
  } else if (limited > 20.0) {
    limited -= 1440.0;
  }
  return limited;
}
