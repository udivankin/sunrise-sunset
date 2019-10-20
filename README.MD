# Sunrise-Sunset-Js

Calculate sunrise and sunset times in Javascript.
Based loosely and indirectly on Kevin Boone's SunTimes Java implementation of the US Naval Observatory's algorithm.
Works on both browser (IE11+) and Node.js, ~1kb minified.

[![Build Status](https://travis-ci.org/udivankin/sunrise-sunset.svg?branch=master)](https://travis-ci.org/udivankin/sunrise-sunset)
[![Coverage Status](https://coveralls.io/repos/github/udivankin/sunrise-sunset/badge.svg?branch=master)](https://coveralls.io/github/udivankin/sunrise-sunset?branch=master)

### Install
Via npm:

```bash
npm install --save sunrise-sunset-js
```

Via script tag:
```html
<script src="sunrise-sunset.js">
```

### Usage

```javascript
import { getSunrise, getSunset } from 'sunrise-sunset-js';
// Or if you use CommonJS imports:
// const { getSunrise, getSunset } = require('sunrise-sunset-js')

/** 
 * Sunset tonight at the Triggertrap office for today
 */
const sunset = getSunset(51.4541, -2.5920);


/** 
 * Sunrise at Stonehenge on midsummer's day 2000
 */
const sunrise = getSunrise(51.1788, -1.8262, new Date("2000-06-21"));

/** 
 * Combined with geolocation. Sunset tonight at your location.
 */
navigator.geolocation.getCurrentPosition(function(position) {
  console.log(getSunset(position.coords.latitude, position.coords.longitude));
});

/** 
 * Get all solar events for given year (sorted by time of occurrence)
 */
function getSolarEventsForYear(latitude, longitude, year) {
  const result = [];
  const start = new Date(year, 0, 1).getTime();
  for (let i = 0; i < 366; i++) {
    const d = new Date(start + (i * 24 * 60 * 60 * 1000));
    if (d.getFullYear() > year) break; // For non-leap year
    result.push(['sunrise', getSunrise(latitude, longitude, d)]);
    result.push(['sunset', getSunset(latitude, longitude, d)]);
  }
  return result.filter(event => Boolean(event[1])).sort((a, b) => a - b);
}
getSolarEventsForYear(51.1788, -1.8262, 2019);
```

For those who still don't use js bundlers, there's global SunriseSunsetJS object,
which exposes the same getSunset and getSunrise methods (must include dist/index.js in your html first)

```javascript
var sunset = SunriseSunsetJS.getSunset(51.4541, -2.5920);
var sunrise = SunriseSunsetJS.getSunrise(51.4541, -2.5920, new Date("2000-06-21"));
```

By Matt Kane (@ascorbic). Copyright © 2012 Triggertrap Ltd. All Rights Reserved.

This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General
Public License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option)
any later version.
This library is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
details.
You should have received a copy of the GNU Lesser General Public License along with this library; if not, write to
the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA,
or connect to: http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
```