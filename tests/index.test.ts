import { describe, it, expect } from 'vitest';
import { 
  getSunrise, 
  getSunset, 
  getSolarNoon, 
  getSolarPosition, 
  getTwilight,
  getSunTimes 
} from '../src/index';

describe('SunriseSunsetJS library', () => {
  it('should return correct sunrise time for GMT', () => {
    const result = getSunrise(51.1788, -1.8262, new Date("2000-01-21 12:00:00 GMT"));
    // SPA algorithm gives slightly different but more accurate time
    // Expected: 07:59:50 UTC (±30 seconds)
    expect(result).not.toBeNull();
    const expected = new Date("Fri, 21 Jan 2000 07:59:50 GMT");
    expect(Math.abs(result!.getTime() - expected.getTime())).toBeLessThan(30000);
  });

  it('should return null for sunrise in Reine, Norway during polar day', () => {
    // On June 1st at 67.9°N, the sun doesn't set - it's polar day (midnight sun)
    // The sun actually doesn't "rise" in the traditional sense during this period
    // because it never went below the horizon
    const result = getSunrise(67.9323866, 13.0887329, new Date("2022-06-01T12:00:00Z"));
    expect(result).toBeNull();
  });

  it('should return null for sunset in Reine, Norway during polar day', () => {
    // Same location, same date - no sunset either
    const result = getSunset(67.9323866, 13.0887329, new Date("2022-06-01T12:00:00Z"));
    expect(result).toBeNull();
  });

  it('should return valid sunrise/sunset for Reine, Norway outside polar day', () => {
    // Test for a date when sunrise/sunset do occur (e.g., March equinox)
    const sunrise = getSunrise(67.9323866, 13.0887329, new Date("2022-03-21T12:00:00Z"));
    const sunset = getSunset(67.9323866, 13.0887329, new Date("2022-03-21T12:00:00Z"));
    expect(sunrise).not.toBeNull();
    expect(sunset).not.toBeNull();
  });

  it('should return correct sunset time for GMT', () => {
    const result = getSunset(51.1788, -1.8262, new Date("2000-01-21 12:00:00 GMT"));
    // SPA algorithm gives slightly different but more accurate time
    // Expected: 16:37:34 UTC (±30 seconds)
    expect(result).not.toBeNull();
    const expected = new Date("Fri, 21 Jan 2000 16:37:34 GMT");
    expect(Math.abs(result!.getTime() - expected.getTime())).toBeLessThan(30000);
  });

  it('should return correct sunrise time for CEST', () => {
    const result = getSunrise(46.0207, 7.7491, new Date('Sat Apr 13 2019 21:51:00 GMT+0200'));
    // Expected: 06:47:16 local time (04:47:16 UTC) (±30 seconds)
    expect(result).not.toBeNull();
    const expected = new Date('2019-04-13T04:47:16Z');
    expect(Math.abs(result!.getTime() - expected.getTime())).toBeLessThan(30000);
  });

  it('should return correct solar noon time', () => {
    const result = getSolarNoon(51.5074, -0.1278, new Date("2024-06-21T12:00:00Z"));
    expect(result).not.toBeNull();
    // Solar noon in London on summer solstice is around 13:00 BST (12:00 UTC)
    expect(result!.getUTCHours()).toBeGreaterThanOrEqual(11);
    expect(result!.getUTCHours()).toBeLessThanOrEqual(13);
  });

  it('should return valid solar position', () => {
    const result = getSolarPosition(51.5074, -0.1278, new Date("2024-06-21T12:00:00Z"));
    expect(result).not.toBeNull();
    expect(result!.zenith).toBeGreaterThan(0);
    expect(result!.zenith).toBeLessThan(180);
    expect(result!.azimuth).toBeGreaterThanOrEqual(0);
    expect(result!.azimuth).toBeLessThan(360);
    expect(result!.elevation).toBeGreaterThan(-90);
    expect(result!.elevation).toBeLessThan(90);
  });

  it('should return twilight times', () => {
    const result = getTwilight(51.5074, -0.1278, new Date("2024-03-21T12:00:00Z"));
    expect(result).not.toBeNull();
    // On equinox, all twilight types should be available at this latitude
    expect(result!.civilDawn).not.toBeNull();
    expect(result!.civilDusk).not.toBeNull();
    expect(result!.nauticalDawn).not.toBeNull();
    expect(result!.nauticalDusk).not.toBeNull();
    expect(result!.astronomicalDawn).not.toBeNull();
    expect(result!.astronomicalDusk).not.toBeNull();
    
    // Dawn should be before dusk
    expect(result!.civilDawn!.getTime()).toBeLessThan(result!.civilDusk!.getTime());
  });

  it('should return all sun times in one call', () => {
    const result = getSunTimes(51.5074, -0.1278, new Date("2024-06-21T12:00:00Z"));
    expect(result).not.toBeNull();
    expect(result.sunrise).not.toBeNull();
    expect(result.sunset).not.toBeNull();
    expect(result.solarNoon).not.toBeNull();
    expect(result.twilight).not.toBeNull();
    
    // Sunrise should be before solar noon, which should be before sunset
    expect(result.sunrise!.getTime()).toBeLessThan(result.solarNoon!.getTime());
    expect(result.solarNoon!.getTime()).toBeLessThan(result.sunset!.getTime());
  });

  it('should handle polar night correctly', () => {
    // Tromsø, Norway on December 21st (polar night)
    const sunrise = getSunrise(69.6496, 18.9560, new Date("2024-12-21T12:00:00Z"));
    const sunset = getSunset(69.6496, 18.9560, new Date("2024-12-21T12:00:00Z"));
    // Both should be null during polar night
    expect(sunrise).toBeNull();
    expect(sunset).toBeNull();
  });
});
