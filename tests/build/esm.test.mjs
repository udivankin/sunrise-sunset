import { test } from 'node:test';
import assert from 'node:assert';
import {
  getSunrise,
  getSunset,
  getSolarNoon,
  getSolarPosition,
  getTwilight,
  getSunTimes
} from '../../dist/index.js';

test('SunriseSunsetJS library (ESM) should have all exported methods', () => {
  assert.strictEqual(typeof getSunrise, 'function');
  assert.strictEqual(typeof getSunset, 'function');
  assert.strictEqual(typeof getSolarNoon, 'function');
  assert.strictEqual(typeof getSolarPosition, 'function');
  assert.strictEqual(typeof getTwilight, 'function');
  assert.strictEqual(typeof getSunTimes, 'function');
});