/**
 * Time conversion utilities for Solar Position Algorithm
 */

import { limitZero2one } from './math';

/**
 * Convert day fraction to local hour
 * @param dayfrac - Day fraction (0-1)
 * @param timezone - Timezone offset in hours
 * @returns Local hour (0-24)
 */
export function dayfracToLocalHr(dayfrac: number, timezone: number): number {
  return 24.0 * limitZero2one(dayfrac + timezone / 24.0);
}

/**
 * Convert fractional hours to Date object
 * @param date - Base date (used for year, month, day)
 * @param fractionalHour - Hour as fractional value (0-24)
 * @param timezone - Timezone offset in hours (negative west of Greenwich)
 * @returns Date object representing the time
 */
export function fractionalHourToDate(
  date: Date,
  fractionalHour: number,
  timezone: number
): Date {
  // Handle invalid values (polar day/night)
  if (fractionalHour < 0 || !isFinite(fractionalHour)) {
    return new Date(NaN);
  }

  // Convert fractional hour to milliseconds from midnight UTC
  const hours = Math.floor(fractionalHour);
  const minutesDecimal = (fractionalHour - hours) * 60;
  const minutes = Math.floor(minutesDecimal);
  const secondsDecimal = (minutesDecimal - minutes) * 60;
  const seconds = Math.floor(secondsDecimal);
  const milliseconds = Math.round((secondsDecimal - seconds) * 1000);

  // Create a new date starting from the base date at midnight UTC
  const result = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0, 0, 0, 0
    )
  );

  // The fractional hour is in local time, so we need to convert to UTC
  // Local time = UTC + timezone, so UTC = Local - timezone
  const utcHours = hours - timezone;
  
  result.setUTCHours(utcHours, minutes, seconds, milliseconds);

  return result;
}

/**
 * Convert fractional hours to time string (HH:MM:SS.mmm)
 * @param fractionalHour - Hour as fractional value (0-24)
 * @returns Formatted time string
 */
export function fractionalHourToString(fractionalHour: number): string {
  if (fractionalHour < 0 || !isFinite(fractionalHour)) {
    return 'N/A';
  }

  const totalSec = Math.round(fractionalHour * 3600);
  const H = Math.floor(totalSec / 3600);
  const rem = totalSec - H * 3600;
  const M = Math.floor(rem / 60);
  const S = rem - M * 60;
  const ms = Math.round(
    (fractionalHour * 3600 - Math.floor(fractionalHour * 3600)) * 1000
  );

  return (
    `${H.toString().padStart(2, '0')}:` +
    `${M.toString().padStart(2, '0')}:` +
    `${S.toString().padStart(2, '0')}.` +
    `${ms.toString().padStart(3, '0')}`
  );
}
