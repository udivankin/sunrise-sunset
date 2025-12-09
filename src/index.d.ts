declare module 'sunrise-sunset-js' {
  /**
   * Optional parameters for SPA calculations
   */
  export interface SpaOptions {
    /** Observer elevation in meters (default: 0) */
    elevation?: number;
    /** Annual average local pressure in millibars (default: 1013) */
    pressure?: number;
    /** Annual average local temperature in Celsius (default: 15) */
    temperature?: number;
    /** Fractional second difference between UTC and UT (default: 0) */
    deltaUt1?: number;
    /** Difference between earth rotation time and terrestrial time in seconds (default: 67) */
    deltaT?: number;
    /** Surface slope in degrees (default: 0) */
    slope?: number;
    /** Surface azimuth rotation in degrees (default: 0) */
    azimuthRotation?: number;
    /** Atmospheric refraction at sunrise/sunset in degrees (default: 0.5667) */
    atmosphericRefraction?: number;
  }

  /**
   * Solar position output
   */
  export interface SolarPosition {
    /** Topocentric zenith angle in degrees */
    zenith: number;
    /** Topocentric azimuth angle (eastward from north) in degrees */
    azimuth: number;
    /** Topocentric azimuth angle (westward from south) in degrees - for astronomers */
    azimuthAstro: number;
    /** Topocentric elevation angle in degrees */
    elevation: number;
    /** Right ascension in degrees */
    rightAscension: number;
    /** Declination in degrees */
    declination: number;
    /** Hour angle in degrees */
    hourAngle: number;
  }

  /**
   * Twilight calculation results
   */
  export interface TwilightTimes {
    /** Civil twilight begins (sun 6° below horizon) */
    civilDawn: Date | null;
    /** Civil twilight ends (sun 6° below horizon) */
    civilDusk: Date | null;
    /** Nautical twilight begins (sun 12° below horizon) */
    nauticalDawn: Date | null;
    /** Nautical twilight ends (sun 12° below horizon) */
    nauticalDusk: Date | null;
    /** Astronomical twilight begins (sun 18° below horizon) */
    astronomicalDawn: Date | null;
    /** Astronomical twilight ends (sun 18° below horizon) */
    astronomicalDusk: Date | null;
  }

  /**
   * Get the sunrise time for a given location and date
   * @returns Date object representing sunrise time, or null if sun doesn't rise (polar night)
   */
  export function getSunrise(
    latitude: number,
    longitude: number,
    date?: Date,
    options?: SpaOptions
  ): Date | null;

  /**
   * Get the sunset time for a given location and date
   * @returns Date object representing sunset time, or null if sun doesn't set (polar day)
   */
  export function getSunset(
    latitude: number,
    longitude: number,
    date?: Date,
    options?: SpaOptions
  ): Date | null;

  /**
   * Get the solar noon (sun transit) time for a given location and date
   * @returns Date object representing solar noon time, or null on calculation error
   */
  export function getSolarNoon(
    latitude: number,
    longitude: number,
    date?: Date,
    options?: SpaOptions
  ): Date | null;

  /**
   * Get the current solar position (zenith, azimuth, elevation, etc.)
   * @returns Solar position object, or null on calculation error
   */
  export function getSolarPosition(
    latitude: number,
    longitude: number,
    date?: Date,
    options?: SpaOptions
  ): SolarPosition | null;

  /**
   * Get civil, nautical, and astronomical twilight times
   * @returns Twilight times object, with null values for polar conditions
   */
  export function getTwilight(
    latitude: number,
    longitude: number,
    date?: Date,
    options?: SpaOptions
  ): TwilightTimes | null;

  /**
   * Get all sun times for a given location and date in a single call
   */
  export function getSunTimes(
    latitude: number,
    longitude: number,
    date?: Date,
    options?: SpaOptions
  ): {
    sunrise: Date | null;
    sunset: Date | null;
    solarNoon: Date | null;
    twilight: TwilightTimes | null;
  };
}
