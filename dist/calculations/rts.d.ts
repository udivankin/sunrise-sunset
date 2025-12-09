/**
 * Sunrise, Transit, and Sunset (RTS) calculations for Solar Position Algorithm
 * Handles high-latitude edge cases (polar day/night)
 */
import { SunState, SpaData } from '../types';
/**
 * Calculate sun hour angle at rise/set for a given zenith
 * @param latitude - Observer latitude in degrees
 * @param deltaZero - Geocentric declination at noon in degrees
 * @param h0Prime - Zenith angle for rise/set (negative of elevation at horizon)
 * @returns Hour angle in degrees, or INVALID_VALUE if sun doesn't rise/set (polar day/night)
 */
export declare function sunHourAngleAtRiseSet(latitude: number, deltaZero: number, h0Prime: number): number;
/**
 * Calculate approximate sun transit time
 * @param alphaZero - Right ascension at noon in degrees
 * @param longitude - Observer longitude in degrees
 * @param nu - Greenwich sidereal time in degrees
 * @returns Approximate transit time as day fraction
 */
export declare function approxSunTransitTime(alphaZero: number, longitude: number, nu: number): number;
/**
 * Calculate approximate sunrise and sunset times
 * @param mRts - Array to store [transit, rise, set] day fractions (modified in place)
 * @param h0 - Hour angle at rise/set in degrees
 */
export declare function approxSunRiseAndSet(mRts: number[], h0: number): void;
/**
 * Calculate interpolated alpha or delta for RTS
 * @param ad - Array of [yesterday, today, tomorrow] values
 * @param n - Interpolation factor
 * @returns Interpolated value
 */
export declare function rtsAlphaDeltaPrime(ad: number[], n: number): number;
/**
 * Calculate sun altitude for RTS
 * @param latitude - Observer latitude in degrees
 * @param deltaPrime - Topocentric declination in degrees
 * @param hPrime - Topocentric hour angle in degrees
 * @returns Sun altitude in degrees
 */
export declare function rtsSunAltitude(latitude: number, deltaPrime: number, hPrime: number): number;
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
export declare function sunRiseAndSet(mRts: number[], hRts: number[], deltaPrime: number[], latitude: number, hPrime: number[], h0Prime: number, sun: SunState): number;
/**
 * Calculate equation of time
 * @param m - Sun mean longitude in degrees
 * @param alpha - Geocentric right ascension in degrees
 * @param delPsi - Nutation in longitude in degrees
 * @param epsilon - True obliquity in degrees
 * @returns Equation of time in minutes
 */
export declare function equationOfTime(m: number, alpha: number, delPsi: number, epsilon: number): number;
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
export declare function calculateEotAndSunRiseTransitSet(spa: SpaData, calculateRaDec: (jd: number, deltaT: number) => {
    alpha: number;
    delta: number;
    nu: number;
}): RtsResult;
/**
 * Calculate sunrise/sunset for a custom zenith angle (for twilight calculations)
 * @param latitude - Observer latitude in degrees
 * @param delta - Sun declination in degrees
 * @param suntransit - Solar noon time in fractional hours
 * @param zenithAngle - Custom zenith angle in degrees
 * @returns Object with sunrise and sunset in fractional hours, or null values for polar cases
 */
export declare function calculateCustomZenithTimes(latitude: number, delta: number, suntransit: number, zenithAngle: number): {
    sunrise: number | null;
    sunset: number | null;
};
//# sourceMappingURL=rts.d.ts.map