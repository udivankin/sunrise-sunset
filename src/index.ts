/**
 * Solar Position Algorithm Constants
 * Based on NREL's Solar Position Algorithm for Solar Radiation Applications
 *
 * @module sunrise-sunset
 */

import {
  SpaOptions,
  SolarPosition,
  TwilightTimes,
} from './types';
import {
  ZENITH_CIVIL_TWILIGHT,
  ZENITH_NAUTICAL_TWILIGHT,
  ZENITH_ASTRONOMICAL_TWILIGHT,
  ZENITH_GOLDEN_HOUR,
  ZENITH_BLUE_HOUR,
} from './constants';
import { fractionalHourToDate } from './utils/time';
import {
  initSpaFromDate,
  spaCalculate,
  isValidSunTime,
} from './spa';
import { calculateCustomZenithTimes } from './calculations/rts';

// Re-export types for consumers
export type { SpaOptions, SolarPosition, TwilightTimes } from './types';

/**
 * Get the sunrise time for a given location and date
 * 
 * @param latitude - Observer latitude in degrees (positive north)
 * @param longitude - Observer longitude in degrees (positive east)
 * @param date - Date for calculation (defaults to current date/time)
 * @param options - Optional SPA calculation options
 * @returns Date object representing sunrise time, or null if sun doesn't rise (polar night)
 * 
 * @example
 * ```typescript
 * const sunrise = getSunrise(51.5074, -0.1278); // London
 * console.log(sunrise?.toLocaleTimeString());
 * ```
 */
export function getSunrise(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  options?: SpaOptions
): Date | null {
  const spa = initSpaFromDate(date, latitude, longitude, options);
  const result = spaCalculate(spa);

  if (result !== 0 || !isValidSunTime(spa.sunrise)) {
    return null;
  }

  return fractionalHourToDate(date, spa.sunrise, spa.timezone);
}

/**
 * Get the sunset time for a given location and date
 * 
 * @param latitude - Observer latitude in degrees (positive north)
 * @param longitude - Observer longitude in degrees (positive east)
 * @param date - Date for calculation (defaults to current date/time)
 * @param options - Optional SPA calculation options
 * @returns Date object representing sunset time, or null if sun doesn't set (polar day)
 * 
 * @example
 * ```typescript
 * const sunset = getSunset(51.5074, -0.1278); // London
 * console.log(sunset?.toLocaleTimeString());
 * ```
 */
export function getSunset(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  options?: SpaOptions
): Date | null {
  const spa = initSpaFromDate(date, latitude, longitude, options);
  const result = spaCalculate(spa);

  if (result !== 0 || !isValidSunTime(spa.sunset)) {
    return null;
  }

  return fractionalHourToDate(date, spa.sunset, spa.timezone);
}

/**
 * Get the solar noon (sun transit) time for a given location and date
 * 
 * @param latitude - Observer latitude in degrees (positive north)
 * @param longitude - Observer longitude in degrees (positive east)
 * @param date - Date for calculation (defaults to current date/time)
 * @param options - Optional SPA calculation options
 * @returns Date object representing solar noon time, or null on calculation error
 * 
 * @example
 * ```typescript
 * const noon = getSolarNoon(51.5074, -0.1278); // London
 * console.log(noon?.toLocaleTimeString());
 * ```
 */
export function getSolarNoon(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  options?: SpaOptions
): Date | null {
  const spa = initSpaFromDate(date, latitude, longitude, options);
  const result = spaCalculate(spa);

  if (result !== 0 || !isValidSunTime(spa.suntransit)) {
    return null;
  }

  return fractionalHourToDate(date, spa.suntransit, spa.timezone);
}

/**
 * Get the current solar position (zenith, azimuth, elevation, etc.)
 * 
 * @param latitude - Observer latitude in degrees (positive north)
 * @param longitude - Observer longitude in degrees (positive east)
 * @param date - Date for calculation (defaults to current date/time)
 * @param options - Optional SPA calculation options
 * @returns Solar position object with zenith, azimuth, elevation, etc.
 * 
 * @example
 * ```typescript
 * const position = getSolarPosition(51.5074, -0.1278);
 * console.log(`Sun is at ${position.elevation}° elevation, ${position.azimuth}° azimuth`);
 * ```
 */
export function getSolarPosition(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  options?: SpaOptions
): SolarPosition | null {
  const spa = initSpaFromDate(date, latitude, longitude, options);
  const result = spaCalculate(spa);

  if (result !== 0) {
    return null;
  }

  return {
    zenith: spa.zenith,
    azimuth: spa.azimuth,
    azimuthAstro: spa.azimuthAstro,
    elevation: spa.e,
    rightAscension: spa.alpha,
    declination: spa.delta,
    hourAngle: spa.h,
  };
}

/**
 * Get civil, nautical, and astronomical twilight times
 * 
 * Civil twilight: Sun is 6° below the horizon
 * Nautical twilight: Sun is 12° below the horizon
 * Astronomical twilight: Sun is 18° below the horizon
 * 
 * @param latitude - Observer latitude in degrees (positive north)
 * @param longitude - Observer longitude in degrees (positive east)
 * @param date - Date for calculation (defaults to current date/time)
 * @param options - Optional SPA calculation options
 * @returns Twilight times object, with null values for polar conditions
 * 
 * @example
 * ```typescript
 * const twilight = getTwilight(51.5074, -0.1278);
 * console.log(`Civil dawn: ${twilight.civilDawn?.toLocaleTimeString()}`);
 * console.log(`Civil dusk: ${twilight.civilDusk?.toLocaleTimeString()}`);
 * ```
 */
export function getTwilight(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  options?: SpaOptions
): TwilightTimes | null {
  const spa = initSpaFromDate(date, latitude, longitude, options);
  const result = spaCalculate(spa);

  if (result !== 0 || !isValidSunTime(spa.suntransit)) {
    return null;
  }

  // Calculate twilight times using custom zenith angles
  const civil = calculateCustomZenithTimes(
    latitude,
    spa.delta,
    spa.suntransit,
    ZENITH_CIVIL_TWILIGHT
  );

  const nautical = calculateCustomZenithTimes(
    latitude,
    spa.delta,
    spa.suntransit,
    ZENITH_NAUTICAL_TWILIGHT
  );

  const astronomical = calculateCustomZenithTimes(
    latitude,
    spa.delta,
    spa.suntransit,
    ZENITH_ASTRONOMICAL_TWILIGHT
  );

  const golden = calculateCustomZenithTimes(
    latitude,
    spa.delta,
    spa.suntransit,
    ZENITH_GOLDEN_HOUR
  );

  const blue = calculateCustomZenithTimes(
    latitude,
    spa.delta,
    spa.suntransit,
    ZENITH_BLUE_HOUR
  );

  // Convert fractional hours to Date objects
  const toDate = (hours: number | null): Date | null => {
    if (hours === null || !isFinite(hours) || hours < 0 || hours > 24) {
      return null;
    }
    return fractionalHourToDate(date, hours, spa.timezone);
  };

  return {
    civilDawn: toDate(civil.sunrise),
    civilDusk: toDate(civil.sunset),
    nauticalDawn: toDate(nautical.sunrise),
    nauticalDusk: toDate(nautical.sunset),
    astronomicalDawn: toDate(astronomical.sunrise),
    astronomicalDusk: toDate(astronomical.sunset),
    goldenHour: {
      morning: { start: toDate(spa.sunrise), end: toDate(golden.sunrise) },
      evening: { start: toDate(golden.sunset), end: toDate(spa.sunset) },
    },
    blueHour: {
      morning: { start: toDate(blue.sunrise), end: toDate(spa.sunrise) },
      evening: { start: toDate(spa.sunset), end: toDate(blue.sunset) },
    },
  };
}

/**
 * Get all sun times for a given location and date in a single call
 * More efficient than calling individual functions separately
 * 
 * @param latitude - Observer latitude in degrees (positive north)
 * @param longitude - Observer longitude in degrees (positive east)
 * @param date - Date for calculation (defaults to current date/time)
 * @param options - Optional SPA calculation options
 * @returns Object containing sunrise, sunset, solar noon, and twilight times
 * 
 * @example
 * ```typescript
 * const times = getSunTimes(51.5074, -0.1278);
 * console.log(`Sunrise: ${times.sunrise?.toLocaleTimeString()}`);
 * console.log(`Sunset: ${times.sunset?.toLocaleTimeString()}`);
 * console.log(`Solar noon: ${times.solarNoon?.toLocaleTimeString()}`);
 * ```
 */
export function getSunTimes(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  options?: SpaOptions
): {
  sunrise: Date | null;
  sunset: Date | null;
  solarNoon: Date | null;
  twilight: TwilightTimes | null;
} {
  const spa = initSpaFromDate(date, latitude, longitude, options);
  const result = spaCalculate(spa);

  if (result !== 0) {
    return {
      sunrise: null,
      sunset: null,
      solarNoon: null,
      twilight: null,
    };
  }

  const toDate = (hours: number): Date | null => {
    if (!isValidSunTime(hours)) {
      return null;
    }
    return fractionalHourToDate(date, hours, spa.timezone);
  };

  // Calculate twilight times
  let twilight: TwilightTimes | null = null;
  if (isValidSunTime(spa.suntransit)) {
    const civil = calculateCustomZenithTimes(
      latitude,
      spa.delta,
      spa.suntransit,
      ZENITH_CIVIL_TWILIGHT
    );

    const nautical = calculateCustomZenithTimes(
      latitude,
      spa.delta,
      spa.suntransit,
      ZENITH_NAUTICAL_TWILIGHT
    );

    const astronomical = calculateCustomZenithTimes(
      latitude,
      spa.delta,
      spa.suntransit,
      ZENITH_ASTRONOMICAL_TWILIGHT
    );

    const golden = calculateCustomZenithTimes(
      latitude,
      spa.delta,
      spa.suntransit,
      ZENITH_GOLDEN_HOUR
    );

    const blue = calculateCustomZenithTimes(
      latitude,
      spa.delta,
      spa.suntransit,
      ZENITH_BLUE_HOUR
    );

    const twilightToDate = (hours: number | null): Date | null => {
      if (hours === null || !isFinite(hours) || hours < 0 || hours > 24) {
        return null;
      }
      return fractionalHourToDate(date, hours, spa.timezone);
    };

    twilight = {
      civilDawn: twilightToDate(civil.sunrise),
      civilDusk: twilightToDate(civil.sunset),
      nauticalDawn: twilightToDate(nautical.sunrise),
      nauticalDusk: twilightToDate(nautical.sunset),
      astronomicalDawn: twilightToDate(astronomical.sunrise),
      astronomicalDusk: twilightToDate(astronomical.sunset),
      goldenHour: {
        morning: { start: twilightToDate(spa.sunrise), end: twilightToDate(golden.sunrise) },
        evening: { start: twilightToDate(golden.sunset), end: twilightToDate(spa.sunset) },
      },
      blueHour: {
        morning: { start: twilightToDate(blue.sunrise), end: twilightToDate(spa.sunrise) },
        evening: { start: twilightToDate(spa.sunset), end: twilightToDate(blue.sunset) },
      },
    };
  }

  return {
    sunrise: toDate(spa.sunrise),
    sunset: toDate(spa.sunset),
    solarNoon: toDate(spa.suntransit),
    twilight,
  };
}

