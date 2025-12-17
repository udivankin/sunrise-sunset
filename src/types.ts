/**
 * Solar Position Algorithm (SPA) Type Definitions
 * Based on NREL's Solar Position Algorithm for Solar Radiation Applications
 */

/**
 * Output calculation modes
 */
export enum SpaFunction {
  /** Calculate only zenith and azimuth */
  SPA_ZA = 0,
  /** Calculate zenith, azimuth, and incidence angle */
  SPA_ZA_INC = 1,
  /** Calculate zenith, azimuth, and rise/transit/set */
  SPA_ZA_RTS = 2,
  /** Calculate all output values */
  SPA_ALL = 3,
}

/**
 * Julian Day offset enumeration for RTS calculations
 */
export enum JDSign {
  JD_MINUS = 0,
  JD_ZERO = 1,
  JD_PLUS = 2,
  JD_COUNT = 3,
}

/**
 * Sun state enumeration for RTS calculations
 */
export enum SunState {
  SUN_TRANSIT = 0,
  SUN_RISE = 1,
  SUN_SET = 2,
  SUN_COUNT = 3,
}

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
  /** Timezone offset in hours from UTC (e.g., -5 for EST) */
  timezone?: number;
  /** IANA Timezone ID (e.g., 'America/New_York') */
  timezoneId?: string;
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
 * Complete SPA data structure containing all input, intermediate, and output values
 */
export interface SpaData {
  // Input values
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  deltaUt1: number;
  deltaT: number;
  timezone: number;
  longitude: number;
  latitude: number;
  elevation: number;
  pressure: number;
  temperature: number;
  slope: number;
  azimuthRotation: number;
  atmosphericRefraction: number;
  timezoneId: string;
  function: SpaFunction;

  // Intermediate values
  jd: number;          // Julian day
  jc: number;          // Julian century
  jde: number;         // Julian ephemeris day
  jce: number;         // Julian ephemeris century
  jme: number;         // Julian ephemeris millennium
  l: number;           // Earth heliocentric longitude [degrees]
  b: number;           // Earth heliocentric latitude [degrees]
  r: number;           // Earth radius vector [AU]
  theta: number;       // Geocentric longitude [degrees]
  beta: number;        // Geocentric latitude [degrees]
  x0: number;          // Mean elongation (moon-sun) [degrees]
  x1: number;          // Mean anomaly (sun) [degrees]
  x2: number;          // Mean anomaly (moon) [degrees]
  x3: number;          // Argument latitude (moon) [degrees]
  x4: number;          // Ascending longitude (moon) [degrees]
  delPsi: number;      // Nutation longitude [degrees]
  delEpsilon: number;  // Nutation obliquity [degrees]
  epsilon0: number;    // Ecliptic mean obliquity [arc seconds]
  epsilon: number;     // Ecliptic true obliquity [degrees]
  delTau: number;      // Aberration correction [degrees]
  lamda: number;       // Apparent sun longitude [degrees]
  nu0: number;         // Greenwich mean sidereal time [degrees]
  nu: number;          // Greenwich sidereal time [degrees]
  alpha: number;       // Geocentric sun right ascension [degrees]
  delta: number;       // Geocentric sun declination [degrees]
  h: number;           // Observer hour angle [degrees]
  xi: number;          // Sun equatorial horizontal parallax [degrees]
  delAlpha: number;    // Sun right ascension parallax [degrees]
  deltaPrime: number;  // Topocentric sun declination [degrees]
  alphaPrime: number;  // Topocentric sun right ascension [degrees]
  hPrime: number;      // Topocentric local hour angle [degrees]
  e0: number;          // Topocentric elevation angle (uncorrected) [degrees]
  delE: number;        // Atmospheric refraction correction [degrees]
  e: number;           // Topocentric elevation angle (corrected) [degrees]
  eot: number;         // Equation of time [minutes]
  srha: number;        // Sunrise hour angle [degrees]
  ssha: number;        // Sunset hour angle [degrees]
  sta: number;         // Sun transit altitude [degrees]

  // Output values
  zenith: number;       // Topocentric zenith angle [degrees]
  azimuthAstro: number; // Topocentric azimuth angle (westward from south)
  azimuth: number;      // Topocentric azimuth angle (eastward from north)
  incidence: number;    // Surface incidence angle [degrees]
  suntransit: number;   // Local sun transit time [fractional hour]
  sunrise: number;      // Local sunrise time [fractional hour]
  sunset: number;       // Local sunset time [fractional hour]
}

/**
 * Parallax calculation result
 */
export interface ParallaxResult {
  deltaAlpha: number;
  deltaPrime: number;
}
