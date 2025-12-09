/**
 * Solar Position Algorithm (SPA) Main Calculator
 * Based on NREL's Solar Position Algorithm for Solar Radiation Applications
 *
 * This is the core SPA calculation module that orchestrates all sub-calculations
 * to determine precise solar position and rise/transit/set times.
 */
import { SpaData, SpaOptions } from './types';
/**
 * Create a new SpaData object with default values
 */
export declare function createSpaData(): SpaData;
/**
 * Validate SPA input values
 * @returns 0 if valid, error code otherwise
 */
export declare function validateInputs(spa: SpaData): number;
/**
 * Calculate geocentric sun right ascension and declination
 * This is a core calculation that's reused for RTS calculations
 */
export declare function calculateGeocentricSunRaAndDec(spa: SpaData): void;
/**
 * Main SPA calculation function
 * Calculates all solar position values based on input parameters
 *
 * @param spa - SPA data object with input values filled in
 * @returns 0 if successful, error code otherwise
 */
export declare function spaCalculate(spa: SpaData): number;
/**
 * Initialize SPA data from a Date object and coordinates
 */
export declare function initSpaFromDate(date: Date, latitude: number, longitude: number, options?: SpaOptions): SpaData;
/**
 * Check if a sunrise/sunset time is valid (not polar day/night)
 */
export declare function isValidSunTime(time: number): boolean;
//# sourceMappingURL=spa.d.ts.map