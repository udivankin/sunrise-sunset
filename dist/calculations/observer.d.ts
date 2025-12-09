/**
 * Observer position and topocentric calculations for Solar Position Algorithm
 */
import { ParallaxResult } from '../types';
/**
 * Calculate Greenwich mean sidereal time
 * @param jd - Julian Day
 * @param jc - Julian Century
 * @returns Greenwich mean sidereal time in degrees
 */
export declare function greenwichMeanSiderealTime(jd: number, jc: number): number;
/**
 * Calculate Greenwich sidereal time
 * @param nu0 - Greenwich mean sidereal time in degrees
 * @param deltaPsi - Nutation in longitude in degrees
 * @param epsilon - True obliquity in degrees
 * @returns Greenwich sidereal time in degrees
 */
export declare function greenwichSiderealTime(nu0: number, deltaPsi: number, epsilon: number): number;
/**
 * Calculate observer hour angle
 * @param nu - Greenwich sidereal time in degrees
 * @param longitude - Observer longitude in degrees
 * @param alphaDeg - Geocentric right ascension in degrees
 * @returns Observer hour angle in degrees
 */
export declare function observerHourAngle(nu: number, longitude: number, alphaDeg: number): number;
/**
 * Calculate right ascension parallax and topocentric declination
 * @param latitude - Observer latitude in degrees
 * @param elevation - Observer elevation in meters
 * @param xi - Sun equatorial horizontal parallax in degrees
 * @param h - Observer hour angle in degrees
 * @param delta - Geocentric declination in degrees
 * @returns Parallax result with deltaAlpha and deltaPrime
 */
export declare function rightAscensionParallaxAndTopocentricDec(latitude: number, elevation: number, xi: number, h: number, delta: number): ParallaxResult;
/**
 * Calculate topocentric right ascension
 * @param alphaDeg - Geocentric right ascension in degrees
 * @param deltaAlpha - Right ascension parallax in degrees
 * @returns Topocentric right ascension in degrees
 */
export declare function topocentricRightAscension(alphaDeg: number, deltaAlpha: number): number;
/**
 * Calculate topocentric local hour angle
 * @param h - Observer hour angle in degrees
 * @param deltaAlpha - Right ascension parallax in degrees
 * @returns Topocentric local hour angle in degrees
 */
export declare function topocentricLocalHourAngle(h: number, deltaAlpha: number): number;
/**
 * Calculate topocentric elevation angle (uncorrected)
 * @param latitude - Observer latitude in degrees
 * @param deltaPrime - Topocentric declination in degrees
 * @param hPrime - Topocentric local hour angle in degrees
 * @returns Topocentric elevation angle in degrees
 */
export declare function topocentricElevationAngle(latitude: number, deltaPrime: number, hPrime: number): number;
/**
 * Calculate atmospheric refraction correction
 * @param pressure - Atmospheric pressure in millibars
 * @param temperature - Temperature in Celsius
 * @param atmosphericRefraction - Atmospheric refraction at sunrise/sunset in degrees
 * @param e0 - Uncorrected elevation angle in degrees
 * @returns Refraction correction in degrees
 */
export declare function atmosphericRefractionCorrection(pressure: number, temperature: number, atmosphericRefraction: number, e0: number): number;
/**
 * Calculate topocentric elevation angle (corrected for refraction)
 * @param e0 - Uncorrected elevation angle in degrees
 * @param deltaE - Atmospheric refraction correction in degrees
 * @returns Corrected topocentric elevation angle in degrees
 */
export declare function topocentricElevationAngleCorrected(e0: number, deltaE: number): number;
/**
 * Calculate topocentric zenith angle
 * @param e - Topocentric elevation angle in degrees
 * @returns Topocentric zenith angle in degrees
 */
export declare function topocentricZenithAngle(e: number): number;
/**
 * Calculate topocentric azimuth angle (astronomers' convention - westward from south)
 * @param hPrime - Topocentric local hour angle in degrees
 * @param latitude - Observer latitude in degrees
 * @param deltaPrime - Topocentric declination in degrees
 * @returns Azimuth angle in degrees
 */
export declare function topocentricAzimuthAngleAstro(hPrime: number, latitude: number, deltaPrime: number): number;
/**
 * Calculate topocentric azimuth angle (navigators' convention - eastward from north)
 * @param azimuthAstro - Astronomical azimuth in degrees
 * @returns Azimuth angle in degrees
 */
export declare function topocentricAzimuthAngle(azimuthAstro: number): number;
/**
 * Calculate surface incidence angle
 * @param zenith - Topocentric zenith angle in degrees
 * @param azimuthAstro - Astronomical azimuth in degrees
 * @param azimuthRotation - Surface azimuth rotation in degrees
 * @param slope - Surface slope in degrees
 * @returns Surface incidence angle in degrees
 */
export declare function surfaceIncidenceAngle(zenith: number, azimuthAstro: number, azimuthRotation: number, slope: number): number;
//# sourceMappingURL=observer.d.ts.map