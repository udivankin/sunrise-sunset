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
export function julianDay(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  deltaUt1: number,
  timezone: number
): number {
  let y = year;
  let m = month;

  const dayDecimal =
    day + (hour - timezone + (minute + (second + deltaUt1) / 60.0) / 60.0) / 24.0;

  if (m < 3) {
    m += 12;
    y--;
  }

  let jd =
    Math.floor(365.25 * (y + 4716.0)) +
    Math.floor(30.6001 * (m + 1)) +
    dayDecimal -
    1524.5;

  if (jd > 2299160.0) {
    const a = Math.floor(y / 100);
    jd += 2 - a + Math.floor(a / 4);
  }

  return jd;
}

/**
 * Calculate Julian Century from Julian Day
 * @param jd - Julian Day
 * @returns Julian Century
 */
export function julianCentury(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Calculate Julian Ephemeris Day
 * @param jd - Julian Day
 * @param deltaT - Difference between earth rotation time and terrestrial time (seconds)
 * @returns Julian Ephemeris Day
 */
export function julianEphemerisDay(jd: number, deltaT: number): number {
  return jd + deltaT / 86400.0;
}

/**
 * Calculate Julian Ephemeris Century
 * @param jde - Julian Ephemeris Day
 * @returns Julian Ephemeris Century
 */
export function julianEphemerisCentury(jde: number): number {
  return (jde - 2451545.0) / 36525.0;
}

/**
 * Calculate Julian Ephemeris Millennium
 * @param jce - Julian Ephemeris Century
 * @returns Julian Ephemeris Millennium
 */
export function julianEphemerisMillennium(jce: number): number {
  return jce / 10.0;
}

/**
 * Extract date components from a JavaScript Date object
 * Returns components in local time
 */
export function extractLocalDateComponents(date: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  timezone: number;
} {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds() + date.getMilliseconds() / 1000,
    timezone: -date.getTimezoneOffset() / 60,
  };
}

/**
 * Extract date components from a JavaScript Date object
 * Returns components in UTC
 */
export function extractUTCDateComponents(date: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds() + date.getUTCMilliseconds() / 1000,
  };
}
