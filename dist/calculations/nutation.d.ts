/**
 * Nutation and obliquity calculations for Solar Position Algorithm
 */
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
export declare function meanElongationMoonSun(jce: number): number;
/**
 * Calculate mean anomaly of the Sun
 * @param jce - Julian Ephemeris Century
 * @returns Mean anomaly in degrees
 */
export declare function meanAnomalySun(jce: number): number;
/**
 * Calculate mean anomaly of the Moon
 * @param jce - Julian Ephemeris Century
 * @returns Mean anomaly in degrees
 */
export declare function meanAnomalyMoon(jce: number): number;
/**
 * Calculate argument of latitude of the Moon
 * @param jce - Julian Ephemeris Century
 * @returns Argument of latitude in degrees
 */
export declare function argumentLatitudeMoon(jce: number): number;
/**
 * Calculate ascending node longitude of the Moon
 * @param jce - Julian Ephemeris Century
 * @returns Ascending longitude in degrees
 */
export declare function ascendingLongitudeMoon(jce: number): number;
/**
 * Calculate nutation in longitude and obliquity
 * @param jce - Julian Ephemeris Century
 * @param x - Array of X terms [x0, x1, x2, x3, x4]
 * @returns Nutation in longitude and obliquity (degrees)
 */
export declare function nutationLongitudeAndObliquity(jce: number, x: number[]): NutationResult;
/**
 * Calculate ecliptic mean obliquity
 * @param jme - Julian Ephemeris Millennium
 * @returns Mean obliquity in arc seconds
 */
export declare function eclipticMeanObliquity(jme: number): number;
/**
 * Calculate ecliptic true obliquity
 * @param deltaEpsilon - Nutation in obliquity (degrees)
 * @param epsilon0 - Mean obliquity (arc seconds)
 * @returns True obliquity in degrees
 */
export declare function eclipticTrueObliquity(deltaEpsilon: number, epsilon0: number): number;
//# sourceMappingURL=nutation.d.ts.map