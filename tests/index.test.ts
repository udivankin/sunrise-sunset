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

  it('should honor timezoneId when timezone is omitted', () => {
    const date = new Date("2024-06-21T12:00:00Z");
    const utc = getSunTimes(16, 108, date, { timezoneId: 'UTC' });
    const hoChiMinh = getSunTimes(16, 108, date, { timezoneId: 'Asia/Ho_Chi_Minh' });
    const explicitOffset = getSunTimes(16, 108, date, { timezone: 7 });

    expect(utc.sunrise).not.toBeNull();
    expect(hoChiMinh.sunrise).not.toBeNull();
    expect(explicitOffset.sunrise).not.toBeNull();

    expect(hoChiMinh.sunrise!.getTime()).toBe(explicitOffset.sunrise!.getTime());
    expect(hoChiMinh.sunrise!.getTime()).not.toBe(utc.sunrise!.getTime());
  });

  it('should not drop twilight times outside the runtime timezone day', () => {
    const originalTimezone = process.env.TZ;

    try {
      process.env.TZ = 'Asia/Ho_Chi_Minh';
      const newYorkFromVietnam = getSunTimes(40, -70, new Date("2026-05-03T12:00:00Z"));

      expect(newYorkFromVietnam.twilight).not.toBeNull();
      expect(newYorkFromVietnam.twilight!.civilDusk).not.toBeNull();
      expect(newYorkFromVietnam.twilight!.nauticalDusk).not.toBeNull();
      expect(newYorkFromVietnam.twilight!.astronomicalDusk).not.toBeNull();
      expect(newYorkFromVietnam.twilight!.goldenHour.evening.start).not.toBeNull();
      expect(newYorkFromVietnam.twilight!.blueHour.evening.end).not.toBeNull();
      expect(getTwilight(40, -70, new Date("2026-05-03T12:00:00Z"))!.civilDusk).not.toBeNull();

      process.env.TZ = 'America/New_York';
      const vietnamFromNewYork = getSunTimes(16, 108, new Date("2026-05-03T12:00:00Z"));

      expect(vietnamFromNewYork.twilight).not.toBeNull();
      expect(vietnamFromNewYork.twilight!.civilDawn).not.toBeNull();
      expect(vietnamFromNewYork.twilight!.nauticalDawn).not.toBeNull();
      expect(vietnamFromNewYork.twilight!.astronomicalDawn).not.toBeNull();
      expect(vietnamFromNewYork.twilight!.goldenHour.morning.end).not.toBeNull();
      expect(vietnamFromNewYork.twilight!.blueHour.morning.start).not.toBeNull();
      expect(getTwilight(16, 108, new Date("2026-05-03T12:00:00Z"))!.civilDawn).not.toBeNull();
    } finally {
      process.env.TZ = originalTimezone;
    }
  });
});

/**
 * Reference times below were cross-checked against two independent implementations that
 * agree with each other to about a second: pvlib's NREL SPA and skyfield/JPL DE421.
 * `null` means the sun never reaches that angle on that day, so the event does not exist.
 * Every case passes `timezone: 0` so the expected values do not depend on the runner's TZ.
 */
const UTC = { timezone: 0 };

const POLAR_CASES = [
  {
    name: 'Tromsø during polar night',
    lat: 69.6496, lon: 18.9560, date: '2026-12-21T12:00:00Z',
    solarNoon: '2026-12-21T10:42:12.4Z', peakElevation: -3.089,
    civil: ['2026-12-21T08:31:15.5Z', '2026-12-21T12:53:09.1Z'],
    nautical: ['2026-12-21T06:46:42.9Z', '2026-12-21T14:37:41.7Z'],
    astronomical: ['2026-12-21T05:28:19.7Z', '2026-12-21T15:56:04.8Z'],
  },
  {
    name: 'Utqiaġvik during polar night',
    lat: 71.2906, lon: -156.7886, date: '2026-12-21T12:00:00Z',
    solarNoon: '2026-12-21T22:25:26.0Z', peakElevation: -4.731,
    civil: ['2026-12-21T20:56:06.1Z', '2026-12-21T23:54:46.0Z'],
    nautical: ['2026-12-21T18:45:24.4Z', '2026-12-22T02:05:27.6Z'],
    astronomical: ['2026-12-21T17:18:33.8Z', '2026-12-22T03:32:18.3Z'],
  },
  {
    name: 'Longyearbyen during polar night',
    lat: 78.2232, lon: 15.6267, date: '2026-12-21T12:00:00Z',
    solarNoon: '2026-12-21T10:55:31.4Z', peakElevation: -11.662,
    civil: null,
    nautical: ['2026-12-21T09:58:28.5Z', '2026-12-21T11:52:34.3Z'],
    astronomical: ['2026-12-21T06:37:06.9Z', '2026-12-21T15:13:55.6Z'],
  },
  {
    name: 'Longyearbyen under the midnight sun',
    lat: 78.2232, lon: 15.6267, date: '2026-06-21T12:00:00Z',
    solarNoon: '2026-06-21T10:59:17.9Z', peakElevation: 35.236,
    civil: null, nautical: null, astronomical: null,
  },
  {
    name: 'McMurdo under the midnight sun',
    lat: -77.8419, lon: 166.6863, date: '2026-12-21T12:00:00Z',
    solarNoon: '2026-12-21T00:51:06.3Z', peakElevation: 35.614,
    civil: null, nautical: null, astronomical: null,
  },
  {
    name: 'McMurdo during polar night',
    lat: -77.8419, lon: 166.6863, date: '2026-06-21T12:00:00Z',
    solarNoon: '2026-06-21T00:54:57.8Z', peakElevation: -11.282,
    civil: null,
    nautical: ['2026-06-20T23:32:49.1Z', '2026-06-21T02:17:06.6Z'],
    astronomical: ['2026-06-20T20:32:33.1Z', '2026-06-21T05:17:22.4Z'],
  },
] as const;

describe('polar day and night', () => {
  for (const c of POLAR_CASES) {
    it(`reports solar noon ${c.name}`, () => {
      const date = new Date(c.date);
      const noon = getSolarNoon(c.lat, c.lon, date, UTC);

      expect(noon).not.toBeNull();
      expect(Math.abs(noon!.getTime() - Date.parse(c.solarNoon))).toBeLessThan(3000);
      // the transit is real: the library's own engine puts the sun at its daily peak there
      expect(getSolarPosition(c.lat, c.lon, noon!, UTC)!.elevation).toBeCloseTo(c.peakElevation, 2);

      // and the sun genuinely never crosses the horizon, so these must stay null
      expect(getSunrise(c.lat, c.lon, date, UTC)).toBeNull();
      expect(getSunset(c.lat, c.lon, date, UTC)).toBeNull();
    });

    it(`grades twilight per zenith angle ${c.name}`, () => {
      const date = new Date(c.date);
      const twilight = getTwilight(c.lat, c.lon, date, UTC);
      expect(twilight).not.toBeNull();

      const noon = getSolarNoon(c.lat, c.lon, date, UTC)!.getTime();
      const bands = [
        [c.civil, twilight!.civilDawn, twilight!.civilDusk],
        [c.nautical, twilight!.nauticalDawn, twilight!.nauticalDusk],
        [c.astronomical, twilight!.astronomicalDawn, twilight!.astronomicalDusk],
      ] as const;

      for (const [expected, dawn, dusk] of bands) {
        if (expected === null) {
          expect(dawn).toBeNull();
          expect(dusk).toBeNull();
          continue;
        }
        expect(dawn).not.toBeNull();
        expect(dusk).not.toBeNull();
        expect(Math.abs(dawn!.getTime() - Date.parse(expected[0]))).toBeLessThan(60000);
        expect(Math.abs(dusk!.getTime() - Date.parse(expected[1]))).toBeLessThan(60000);
        expect(dawn!.getTime()).toBeLessThan(noon);
        expect(noon).toBeLessThan(dusk!.getTime());
      }
    });
  }

  it('reports solar noon at every latitude on every day of the year', () => {
    const latitudes = [-90, -89, -78.2232, -66.5606, -45, 0, 45, 66.5606, 78.2232, 89, 90];
    const dates = ['2026-01-15', '2026-03-20', '2026-06-21', '2026-09-23', '2026-12-21'];

    for (const lat of latitudes) {
      for (const day of dates) {
        const date = new Date(`${day}T12:00:00Z`);
        const where = `lat ${lat} on ${day}`;
        expect(getSolarNoon(lat, 15, date, UTC), where).not.toBeNull();
        expect(getTwilight(lat, 15, date, UTC), where).not.toBeNull();
        expect(getSunTimes(lat, 15, date, UTC).solarNoon, where).not.toBeNull();
        expect(getSunTimes(lat, 15, date, UTC).twilight, where).not.toBeNull();
      }
    }
  });

  it('never leaks the polar sentinel into a returned date', () => {
    const latitudes = [-90, -85, -78.2232, -70, 70, 78.2232, 85, 90];
    const dates = ['2026-06-21', '2026-12-21'];

    for (const lat of latitudes) {
      for (const day of dates) {
        const date = new Date(`${day}T12:00:00Z`);
        const twilight = getTwilight(lat, 15, date, UTC)!;
        const times = [
          twilight.civilDawn, twilight.civilDusk,
          twilight.nauticalDawn, twilight.nauticalDusk,
          twilight.astronomicalDawn, twilight.astronomicalDusk,
          twilight.goldenHour.morning.start, twilight.goldenHour.morning.end,
          twilight.goldenHour.evening.start, twilight.goldenHour.evening.end,
          twilight.blueHour.morning.start, twilight.blueHour.morning.end,
          twilight.blueHour.evening.start, twilight.blueHour.evening.end,
        ];

        for (const time of times) {
          if (time === null) continue;
          expect(Number.isNaN(time.getTime()), `lat ${lat} on ${day}`).toBe(false);
          const hoursAway = Math.abs(time.getTime() - date.getTime()) / 3600000;
          expect(hoursAway, `lat ${lat} on ${day}: ${time.toISOString()}`).toBeLessThan(36);
        }
      }
    }
  });

  it('leaves non-polar results untouched', () => {
    const date = new Date('2026-12-21T12:00:00Z');
    const times = getSunTimes(51.5074, -0.1278, date, UTC);

    expect(times.sunrise!.toISOString()).toBe('2026-12-21T08:03:43.968Z');
    expect(times.solarNoon!.toISOString()).toBe('2026-12-21T11:58:34.713Z');
    expect(times.sunset!.toISOString()).toBe('2026-12-21T15:53:25.078Z');
    expect(times.twilight!.civilDawn!.toISOString()).toBe('2026-12-21T07:23:29.608Z');
    expect(times.twilight!.civilDusk!.toISOString()).toBe('2026-12-21T16:33:39.818Z');
  });
});
