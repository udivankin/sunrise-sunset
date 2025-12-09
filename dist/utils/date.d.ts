/**
 * Date and Julian day calculation utilities for Solar Position Algorithm
 */
/**
 * Calculate Julian Day from calendar date and time
 * @param year - 4-digit year
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @param hour - Hour (0-24)
 * @param minute - Minute (0-59)
 * @param second - Second (0-59.999...)
 * @param deltaUt1 - Fractional second difference between UTC and UT
 * @param timezone - Timezone offset in hours (negative west of Greenwich)
 * @returns Julian Day number
 */
export declare function julianDay(year: number, month: number, day: number, hour: number, minute: number, second: number, deltaUt1: number, timezone: number): number;
/**
 * Calculate Julian Century from Julian Day
 * @param jd - Julian Day
 * @returns Julian Century
 */
export declare function julianCentury(jd: number): number;
/**
 * Calculate Julian Ephemeris Day
 * @param jd - Julian Day
 * @param deltaT - Difference between earth rotation time and terrestrial time (seconds)
 * @returns Julian Ephemeris Day
 */
export declare function julianEphemerisDay(jd: number, deltaT: number): number;
/**
 * Calculate Julian Ephemeris Century
 * @param jde - Julian Ephemeris Day
 * @returns Julian Ephemeris Century
 */
export declare function julianEphemerisCentury(jde: number): number;
/**
 * Calculate Julian Ephemeris Millennium
 * @param jce - Julian Ephemeris Century
 * @returns Julian Ephemeris Millennium
 */
export declare function julianEphemerisMillennium(jce: number): number;
/**
 * Extract date components from a JavaScript Date object
 * Returns components in local time
 */
export declare function extractLocalDateComponents(date: Date): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    timezone: number;
};
/**
 * Extract date components from a JavaScript Date object
 * Returns components in UTC
 */
export declare function extractUTCDateComponents(date: Date): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
};
//# sourceMappingURL=date.d.ts.map