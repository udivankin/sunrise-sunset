/**
 * Earth position calculations for Solar Position Algorithm
 * Calculates heliocentric longitude, latitude, and radius vector
 */
/**
 * Calculate Earth's heliocentric longitude
 * @param jme - Julian Ephemeris Millennium
 * @returns Heliocentric longitude in degrees (0-360)
 */
export declare function earthHeliocentricLongitude(jme: number): number;
/**
 * Calculate Earth's heliocentric latitude
 * @param jme - Julian Ephemeris Millennium
 * @returns Heliocentric latitude in degrees
 */
export declare function earthHeliocentricLatitude(jme: number): number;
/**
 * Calculate Earth's radius vector (distance from Sun)
 * @param jme - Julian Ephemeris Millennium
 * @returns Radius vector in Astronomical Units (AU)
 */
export declare function earthRadiusVector(jme: number): number;
//# sourceMappingURL=earth.d.ts.map