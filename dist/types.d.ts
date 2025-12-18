/**
 * Solar Position Algorithm (SPA) Type Definitions
 * Based on NREL's Solar Position Algorithm for Solar Radiation Applications
 */
/**
 * Output calculation modes
 */
export declare enum SpaFunction {
    /** Calculate only zenith and azimuth */
    SPA_ZA = 0,
    /** Calculate zenith, azimuth, and incidence angle */
    SPA_ZA_INC = 1,
    /** Calculate zenith, azimuth, and rise/transit/set */
    SPA_ZA_RTS = 2,
    /** Calculate all output values */
    SPA_ALL = 3
}
/**
 * Julian Day offset enumeration for RTS calculations
 */
export declare enum JDSign {
    JD_MINUS = 0,
    JD_ZERO = 1,
    JD_PLUS = 2,
    JD_COUNT = 3
}
/**
 * Sun state enumeration for RTS calculations
 */
export declare enum SunState {
    SUN_TRANSIT = 0,
    SUN_RISE = 1,
    SUN_SET = 2,
    SUN_COUNT = 3
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
    /** Golden hour begins/ends (sun 6° above horizon to 4° below horizon) */
    goldenHour: {
        morning: {
            start: Date | null;
            end: Date | null;
        };
        evening: {
            start: Date | null;
            end: Date | null;
        };
    } | null;
    /** Blue hour begins/ends (sun 4° below horizon to 6° below horizon) */
    blueHour: {
        morning: {
            start: Date | null;
            end: Date | null;
        };
        evening: {
            start: Date | null;
            end: Date | null;
        };
    } | null;
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
    jd: number;
    jc: number;
    jde: number;
    jce: number;
    jme: number;
    l: number;
    b: number;
    r: number;
    theta: number;
    beta: number;
    x0: number;
    x1: number;
    x2: number;
    x3: number;
    x4: number;
    delPsi: number;
    delEpsilon: number;
    epsilon0: number;
    epsilon: number;
    delTau: number;
    lamda: number;
    nu0: number;
    nu: number;
    alpha: number;
    delta: number;
    h: number;
    xi: number;
    delAlpha: number;
    deltaPrime: number;
    alphaPrime: number;
    hPrime: number;
    e0: number;
    delE: number;
    e: number;
    eot: number;
    srha: number;
    ssha: number;
    sta: number;
    zenith: number;
    azimuthAstro: number;
    azimuth: number;
    incidence: number;
    suntransit: number;
    sunrise: number;
    sunset: number;
}
/**
 * Parallax calculation result
 */
export interface ParallaxResult {
    deltaAlpha: number;
    deltaPrime: number;
}
//# sourceMappingURL=types.d.ts.map