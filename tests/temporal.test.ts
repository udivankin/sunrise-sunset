import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  getSunrise,
  getSunTimes,
  TemporalDateInput,
} from '../src/temporal';
import { getSunrise as getDateSunrise, getSunTimes as getDateSunTimes } from '../src/index';

class MockInstant {
  constructor(readonly epochMilliseconds: number) {}

  toZonedDateTimeISO(timeZone: string) {
    return new MockZonedDateTime(this.epochMilliseconds, timeZone);
  }

  toString() {
    return new Date(this.epochMilliseconds).toISOString();
  }
}

class MockZonedDateTime {
  constructor(
    readonly epochMilliseconds: number,
    readonly timeZoneId: string
  ) {}

  toInstant() {
    return new MockInstant(this.epochMilliseconds);
  }

  toPlainDate() {
    const date = new Date(this.epochMilliseconds);
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      toPlainDateTime: () => ({
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        toZonedDateTime: () => this,
      }),
    };
  }

  toPlainTime() {
    return {
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      toString: () => '12:00:00',
    };
  }

  toString() {
    return `${new Date(this.epochMilliseconds).toISOString()}[${this.timeZoneId}]`;
  }
}

describe('Temporal API', () => {
  const originalTemporal = (globalThis as unknown as { Temporal?: unknown }).Temporal;

  beforeEach(() => {
    (globalThis as unknown as { Temporal?: unknown }).Temporal = {
      Instant: {
        fromEpochMilliseconds: (epochMilliseconds: number) => new MockInstant(epochMilliseconds),
      },
    };
  });

  afterEach(() => {
    (globalThis as unknown as { Temporal?: unknown }).Temporal = originalTemporal;
  });

  it('returns Temporal.Instant values from the temporal subpath API', () => {
    const date = new Date('2026-05-03T12:00:00Z');
    const expected = getDateSunrise(40, -70, date);
    const sunrise = getSunrise(40, -70, date);

    expect(sunrise).toBeInstanceOf(MockInstant);
    expect(sunrise!.epochMilliseconds).toBe(expected!.getTime());
  });

  it('accepts Temporal.Instant input dates', () => {
    const instant = new MockInstant(Date.parse('2026-05-03T12:00:00Z'));
    const expected = getDateSunrise(40, -70, new Date(instant.epochMilliseconds));
    const sunrise = getSunrise(40, -70, instant as unknown as TemporalDateInput);

    expect(sunrise!.epochMilliseconds).toBe(expected!.getTime());
  });

  it('accepts Temporal.ZonedDateTime input dates and carries its timezoneId', () => {
    const zonedDateTime = new MockZonedDateTime(
      Date.parse('2026-05-03T05:00:00Z'),
      'Asia/Ho_Chi_Minh'
    );
    const expected = getDateSunrise(
      16,
      108,
      new Date(zonedDateTime.epochMilliseconds),
      { timezoneId: zonedDateTime.timeZoneId }
    );
    const sunrise = getSunrise(16, 108, zonedDateTime as unknown as TemporalDateInput);

    expect(sunrise!.epochMilliseconds).toBe(expected!.getTime());
  });

  it('returns nested Temporal.Instant values for all sun times', () => {
    const times = getSunTimes(40, -70, new Date('2026-05-03T12:00:00Z'));

    expect(times.sunrise).toBeInstanceOf(MockInstant);
    expect(times.sunset).toBeInstanceOf(MockInstant);
    expect(times.solarNoon).toBeInstanceOf(MockInstant);
    expect(times.twilight!.civilDawn).toBeInstanceOf(MockInstant);
    expect(times.twilight!.goldenHour!.morning.start).toBeInstanceOf(MockInstant);
  });

  it('returns solar noon and twilight during polar night', () => {
    const date = new Date('2026-12-21T12:00:00Z');
    const times = getSunTimes(69.6496, 18.9560, date, { timezone: 0 });

    expect(times.sunrise).toBeNull();
    expect(times.sunset).toBeNull();
    expect(times.solarNoon).toBeInstanceOf(MockInstant);
    expect(times.solarNoon!.epochMilliseconds).toBe(
      getDateSunTimes(69.6496, 18.9560, date, { timezone: 0 }).solarNoon!.getTime()
    );
    expect(times.twilight!.civilDawn).toBeInstanceOf(MockInstant);
    expect(times.twilight!.civilDusk).toBeInstanceOf(MockInstant);
  });

  it('throws when native Temporal is unavailable', () => {
    (globalThis as unknown as { Temporal?: unknown }).Temporal = undefined;

    expect(() => getSunrise(40, -70, new Date('2026-05-03T12:00:00Z'))).toThrow(
      /Temporal is not available/
    );
  });
});

