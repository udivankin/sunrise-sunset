import { getSunrise, getSunset } from '../src/index';

describe('SunriseSunsetJS library', () => {
  it('should have getSunrise, getSunset exported methods', () => {
    expect(typeof getSunrise).toBe('function');
    expect(typeof getSunset).toBe('function');
  })

  it('should return correct sunrise time', () => {
    expect(getSunrise(51.1788, -1.8262, new Date("2000-06-21")).getTime()).toEqual(961548706140)
  })

  it('should return correct sunset time', () => {
    expect(getSunset(51.1788, -1.8262, new Date("2000-06-21")).getTime()).toEqual(961608396293)
  })
})