/**
 * Mathematical utility functions for Solar Position Algorithm
 */
/**
 * Convert degrees to radians
 */
export declare function deg2rad(degrees: number): number;
/**
 * Convert radians to degrees
 */
export declare function rad2deg(radians: number): number;
/**
 * Limit degrees to 0-360 range
 */
export declare function limitDegrees(degrees: number): number;
/**
 * Limit degrees to 0-180 range
 */
export declare function limitDegrees180(degrees: number): number;
/**
 * Limit degrees to -180 to +180 range
 */
export declare function limitDegrees180pm(degrees: number): number;
/**
 * Limit value to 0-1 range (fractional day)
 */
export declare function limitZero2one(value: number): number;
/**
 * Calculate third-order polynomial: ((a*x + b)*x + c)*x + d
 */
export declare function thirdOrderPolynomial(a: number, b: number, c: number, d: number, x: number): number;
/**
 * Limit minutes to -20 to 20 range (for equation of time)
 */
export declare function limitMinutes(minutes: number): number;
//# sourceMappingURL=math.d.ts.map