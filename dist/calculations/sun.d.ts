/**
 * Sun position calculations for Solar Position Algorithm
 * Calculates geocentric position, right ascension, declination
 */
/**
 * Calculate geocentric longitude from heliocentric longitude
 * @param l - Heliocentric longitude in degrees
 * @returns Geocentric longitude in degrees
 */
export declare function geocentricLongitude(l: number): number;
/**
 * Calculate geocentric latitude from heliocentric latitude
 * @param b - Heliocentric latitude in degrees
 * @returns Geocentric latitude in degrees
 */
export declare function geocentricLatitude(b: number): number;
/**
 * Calculate the aberration correction
 * @param r - Earth radius vector in AU
 * @returns Aberration correction in degrees
 */
export declare function aberrationCorrection(r: number): number;
/**
 * Calculate the apparent sun longitude
 * @param theta - Geocentric longitude in degrees
 * @param deltaPsi - Nutation in longitude in degrees
 * @param deltaTau - Aberration correction in degrees
 * @returns Apparent sun longitude in degrees
 */
export declare function apparentSunLongitude(theta: number, deltaPsi: number, deltaTau: number): number;
/**
 * Calculate geocentric sun right ascension
 * @param lamda - Apparent sun longitude in degrees
 * @param epsilon - True obliquity of ecliptic in degrees
 * @param beta - Geocentric latitude in degrees
 * @returns Right ascension in degrees (0-360)
 */
export declare function geocentricRightAscension(lamda: number, epsilon: number, beta: number): number;
/**
 * Calculate geocentric sun declination
 * @param beta - Geocentric latitude in degrees
 * @param epsilon - True obliquity of ecliptic in degrees
 * @param lamda - Apparent sun longitude in degrees
 * @returns Declination in degrees
 */
export declare function geocentricDeclination(beta: number, epsilon: number, lamda: number): number;
/**
 * Calculate sun mean longitude
 * @param jme - Julian Ephemeris Millennium
 * @returns Mean longitude in degrees
 */
export declare function sunMeanLongitude(jme: number): number;
/**
 * Calculate sun equatorial horizontal parallax
 * @param r - Earth radius vector in AU
 * @returns Parallax in degrees
 */
export declare function sunEquatorialHorizontalParallax(r: number): number;
//# sourceMappingURL=sun.d.ts.map