/**
 * Solar Position Algorithm Constants
 * Based on NREL's Solar Position Algorithm for Solar Radiation Applications
 */
export declare const PI: number;
export declare const SUN_RADIUS = 0.26667;
export declare const REFRACTION_CORRECTION = 0.5667;
export declare const L_COUNT = 6;
export declare const B_COUNT = 2;
export declare const R_COUNT = 5;
export declare const Y_COUNT = 63;
export declare const L_SUBCOUNT: number[];
export declare const B_SUBCOUNT: number[];
export declare const R_SUBCOUNT: number[];
export declare const TERM_A = 0;
export declare const TERM_B = 1;
export declare const TERM_C = 2;
export declare const TERM_X0 = 0;
export declare const TERM_X1 = 1;
export declare const TERM_X2 = 2;
export declare const TERM_X3 = 3;
export declare const TERM_X4 = 4;
export declare const TERM_X_COUNT = 5;
export declare const TERM_PSI_A = 0;
export declare const TERM_PSI_B = 1;
export declare const TERM_EPS_C = 2;
export declare const TERM_EPS_D = 3;
export declare const ZENITH_SUNRISE_SUNSET = 90.8333;
export declare const ZENITH_CIVIL_TWILIGHT = 96;
export declare const ZENITH_NAUTICAL_TWILIGHT = 102;
export declare const ZENITH_ASTRONOMICAL_TWILIGHT = 108;
export declare const ZENITH_GOLDEN_HOUR = 84;
export declare const ZENITH_BLUE_HOUR = 94;
export declare const INVALID_VALUE = -99999;
/**
 * Earth Heliocentric Longitude Periodic Terms (L)
 * Each series contains [A, B, C] coefficients
 */
export declare const L_TERMS: number[][][];
/**
 * Earth Heliocentric Latitude Periodic Terms (B)
 */
export declare const B_TERMS: number[][][];
/**
 * Earth Radius Vector Periodic Terms (R)
 */
export declare const R_TERMS: number[][][];
/**
 * Nutation Y Terms - coefficients for calculating nutation in longitude and obliquity
 */
export declare const Y_TERMS: number[][];
/**
 * Periodic Terms for Nutation in Longitude and Obliquity (PE)
 * [PSI_A, PSI_B, EPS_C, EPS_D]
 */
export declare const PE_TERMS: number[][];
//# sourceMappingURL=constants.d.ts.map