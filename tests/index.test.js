const { getSunrise, getSunset } = require('../dist/index.js');

describe('SunriseSunsetJS library', () => {
  it('should have getSunrise, getSunset exported methods', () => {
    expect(typeof getSunrise).toBe('function');
    expect(typeof getSunset).toBe('function');
  });

  it('should return correct sunrise time for GMT', () => {
    expect(getSunrise(51.1788, -1.8262, new Date("2000-01-21 12:00:00 GMT")))
        .toEqual(new Date("Fri, 21 Jan 2000 07:59:37.362 GMT"))
  });

  it('should return correct sunrise time in Reine, Norway (High Latitude)', () => {
    // https://sunrise.maplogs.com/reine_norway.7078.html
    expect(getSunrise(67.9323866, 13.0887329, new Date("2022-06-01T22:53:26.363Z")))
        .toEqual(new Date("Mon, 17 Jul 2022 23:44:00.000 GMT"))
  });

  it('should return correct sunset time for GMT', () => {
    expect(getSunset(51.1788, -1.8262, new Date("2000-01-21 12:00:00 GMT")))
        .toEqual(new Date("Fri, 21 Jan 2000 16:38:21.883 GMT"))
  });

  it('should return correct sunrise time for CEST', () => {
      expect(getSunrise(46.0207, 7.7491, new Date('Sat Apr 13 2019 21:51:00 GMT+0200 (Central European Summer Time)'))
          ).toEqual(new Date('Sat Apr 13 2019 06:47:17.878 GMT+0200 (Central European Summer Time)'))
  });
})

