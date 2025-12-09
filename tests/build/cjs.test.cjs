const { test } = require('node:test');
const assert = require('node:assert');
const {
  getSunrise,
  getSunset,
  getSolarNoon,
  getSolarPosition,
  getTwilight,
  getSunTimes
} = require('../../dist/index.cjs');

test('SunriseSunsetJS library (CJS) should have all exported methods', () => {
  assert.strictEqual(typeof getSunrise, 'function');
  assert.strictEqual(typeof getSunset, 'function');
  assert.strictEqual(typeof getSolarNoon, 'function');
  assert.strictEqual(typeof getSolarPosition, 'function');
  assert.strictEqual(typeof getTwilight, 'function');
  assert.strictEqual(typeof getSunTimes, 'function');
});