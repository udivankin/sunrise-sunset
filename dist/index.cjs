
//#region src/constants.ts
/**
* Solar Position Algorithm Constants
* Based on NREL's Solar Position Algorithm for Solar Radiation Applications
*/
const PI = Math.PI;
const SUN_RADIUS = .26667;
const REFRACTION_CORRECTION = .5667;
const L_COUNT = 6;
const B_COUNT = 2;
const R_COUNT = 5;
const Y_COUNT = 63;
const L_SUBCOUNT = [
	64,
	34,
	20,
	7,
	3,
	1
];
const B_SUBCOUNT = [5, 2];
const R_SUBCOUNT = [
	40,
	10,
	6,
	2,
	1
];
const TERM_A = 0;
const TERM_B = 1;
const TERM_C = 2;
const TERM_X_COUNT = 5;
const TERM_PSI_A = 0;
const TERM_PSI_B = 1;
const TERM_EPS_C = 2;
const TERM_EPS_D = 3;
const ZENITH_CIVIL_TWILIGHT = 96;
const ZENITH_NAUTICAL_TWILIGHT = 102;
const ZENITH_ASTRONOMICAL_TWILIGHT = 108;
const INVALID_VALUE = -99999;
/**
* Earth Heliocentric Longitude Periodic Terms (L)
* Each series contains [A, B, C] coefficients
*/
const L_TERMS = [
	[
		[
			175347046,
			0,
			0
		],
		[
			3341656,
			4.6692568,
			6283.07585
		],
		[
			34894,
			4.6261,
			12566.1517
		],
		[
			3497,
			2.7441,
			5753.3849
		],
		[
			3418,
			2.8289,
			3.5231
		],
		[
			3136,
			3.6277,
			77713.7715
		],
		[
			2676,
			4.4181,
			7860.4194
		],
		[
			2343,
			6.1352,
			3930.2097
		],
		[
			1324,
			.7425,
			11506.7698
		],
		[
			1273,
			2.0371,
			529.691
		],
		[
			1199,
			1.1096,
			1577.3435
		],
		[
			990,
			5.233,
			5884.927
		],
		[
			902,
			2.045,
			26.298
		],
		[
			857,
			3.508,
			398.149
		],
		[
			780,
			1.179,
			5223.694
		],
		[
			753,
			2.533,
			5507.553
		],
		[
			505,
			4.583,
			18849.228
		],
		[
			492,
			4.205,
			775.523
		],
		[
			357,
			2.92,
			.067
		],
		[
			317,
			5.849,
			11790.629
		],
		[
			284,
			1.899,
			796.298
		],
		[
			271,
			.315,
			10977.079
		],
		[
			243,
			.345,
			5486.778
		],
		[
			206,
			4.806,
			2544.314
		],
		[
			205,
			1.869,
			5573.143
		],
		[
			202,
			2.458,
			6069.777
		],
		[
			156,
			.833,
			213.299
		],
		[
			132,
			3.411,
			2942.463
		],
		[
			126,
			1.083,
			20.775
		],
		[
			115,
			.645,
			.98
		],
		[
			103,
			.636,
			4694.003
		],
		[
			102,
			.976,
			15720.839
		],
		[
			102,
			4.267,
			7.114
		],
		[
			99,
			6.21,
			2146.17
		],
		[
			98,
			.68,
			155.42
		],
		[
			86,
			5.98,
			161000.69
		],
		[
			85,
			1.3,
			6275.96
		],
		[
			85,
			3.67,
			71430.7
		],
		[
			80,
			1.81,
			17260.15
		],
		[
			79,
			3.04,
			12036.46
		],
		[
			75,
			1.76,
			5088.63
		],
		[
			74,
			3.5,
			3154.69
		],
		[
			74,
			4.68,
			801.82
		],
		[
			70,
			.83,
			9437.76
		],
		[
			62,
			3.98,
			8827.39
		],
		[
			61,
			1.82,
			7084.9
		],
		[
			57,
			2.78,
			6286.6
		],
		[
			56,
			4.39,
			14143.5
		],
		[
			56,
			3.47,
			6279.55
		],
		[
			52,
			.19,
			12139.55
		],
		[
			52,
			1.33,
			1748.02
		],
		[
			51,
			.28,
			5856.48
		],
		[
			49,
			.49,
			1194.45
		],
		[
			41,
			5.37,
			8429.24
		],
		[
			41,
			2.4,
			19651.05
		],
		[
			39,
			6.17,
			10447.39
		],
		[
			37,
			6.04,
			10213.29
		],
		[
			37,
			2.57,
			1059.38
		],
		[
			36,
			1.71,
			2352.87
		],
		[
			36,
			1.78,
			6812.77
		],
		[
			33,
			.59,
			17789.85
		],
		[
			30,
			.44,
			83996.85
		],
		[
			30,
			2.74,
			1349.87
		],
		[
			25,
			3.16,
			4690.48
		]
	],
	[
		[
			628331966747,
			0,
			0
		],
		[
			206059,
			2.678235,
			6283.07585
		],
		[
			4303,
			2.6351,
			12566.1517
		],
		[
			425,
			1.59,
			3.523
		],
		[
			119,
			5.796,
			26.298
		],
		[
			109,
			2.966,
			1577.344
		],
		[
			93,
			2.59,
			18849.23
		],
		[
			72,
			1.14,
			529.69
		],
		[
			68,
			1.87,
			398.15
		],
		[
			67,
			4.41,
			5507.55
		],
		[
			59,
			2.89,
			5223.69
		],
		[
			56,
			2.17,
			155.42
		],
		[
			45,
			.4,
			796.3
		],
		[
			36,
			.47,
			775.52
		],
		[
			29,
			2.65,
			7.11
		],
		[
			21,
			5.34,
			.98
		],
		[
			19,
			1.85,
			5486.78
		],
		[
			19,
			4.97,
			213.3
		],
		[
			17,
			2.99,
			6275.96
		],
		[
			16,
			.03,
			2544.31
		],
		[
			16,
			1.43,
			2146.17
		],
		[
			15,
			1.21,
			10977.08
		],
		[
			12,
			2.83,
			1748.02
		],
		[
			12,
			3.26,
			5088.63
		],
		[
			12,
			5.27,
			1194.45
		],
		[
			12,
			2.08,
			4694
		],
		[
			11,
			.77,
			553.57
		],
		[
			10,
			1.3,
			6286.6
		],
		[
			10,
			4.24,
			1349.87
		],
		[
			9,
			2.7,
			242.73
		],
		[
			9,
			5.64,
			951.72
		],
		[
			8,
			5.3,
			2352.87
		],
		[
			6,
			2.65,
			9437.76
		],
		[
			6,
			4.67,
			4690.48
		]
	],
	[
		[
			52919,
			0,
			0
		],
		[
			8720,
			1.0721,
			6283.0758
		],
		[
			309,
			.867,
			12566.152
		],
		[
			27,
			.05,
			3.52
		],
		[
			16,
			5.19,
			26.3
		],
		[
			16,
			3.68,
			155.42
		],
		[
			10,
			.76,
			18849.23
		],
		[
			9,
			2.06,
			77713.77
		],
		[
			7,
			.83,
			775.52
		],
		[
			5,
			4.66,
			1577.34
		],
		[
			4,
			1.03,
			7.11
		],
		[
			4,
			3.44,
			5573.14
		],
		[
			3,
			5.14,
			796.3
		],
		[
			3,
			6.05,
			5507.55
		],
		[
			3,
			1.19,
			242.73
		],
		[
			3,
			6.12,
			529.69
		],
		[
			3,
			.31,
			398.15
		],
		[
			3,
			2.28,
			553.57
		],
		[
			2,
			4.38,
			5223.69
		],
		[
			2,
			3.75,
			.98
		]
	],
	[
		[
			289,
			5.844,
			6283.076
		],
		[
			35,
			0,
			0
		],
		[
			17,
			5.49,
			12566.15
		],
		[
			3,
			5.2,
			155.42
		],
		[
			1,
			4.72,
			3.52
		],
		[
			1,
			5.3,
			18849.23
		],
		[
			1,
			5.97,
			242.73
		]
	],
	[
		[
			114,
			3.142,
			0
		],
		[
			8,
			4.13,
			6283.08
		],
		[
			1,
			3.84,
			12566.15
		]
	],
	[[
		1,
		3.14,
		0
	]]
];
/**
* Earth Heliocentric Latitude Periodic Terms (B)
*/
const B_TERMS = [[
	[
		280,
		3.199,
		84334.662
	],
	[
		102,
		5.422,
		5507.553
	],
	[
		80,
		3.88,
		5223.69
	],
	[
		44,
		3.7,
		2352.87
	],
	[
		32,
		4,
		1577.34
	]
], [[
	9,
	3.9,
	5507.55
], [
	6,
	1.73,
	5223.69
]]];
/**
* Earth Radius Vector Periodic Terms (R)
*/
const R_TERMS = [
	[
		[
			100013989,
			0,
			0
		],
		[
			1670700,
			3.0984635,
			6283.07585
		],
		[
			13956,
			3.05525,
			12566.1517
		],
		[
			3084,
			5.1985,
			77713.7715
		],
		[
			1628,
			1.1739,
			5753.3849
		],
		[
			1576,
			2.8469,
			7860.4194
		],
		[
			925,
			5.453,
			11506.77
		],
		[
			542,
			4.564,
			3930.21
		],
		[
			472,
			3.661,
			5884.927
		],
		[
			346,
			.964,
			5507.553
		],
		[
			329,
			5.9,
			5223.694
		],
		[
			307,
			.299,
			5573.143
		],
		[
			243,
			4.273,
			11790.629
		],
		[
			212,
			5.847,
			1577.344
		],
		[
			186,
			5.022,
			10977.079
		],
		[
			175,
			3.012,
			18849.228
		],
		[
			110,
			5.055,
			5486.778
		],
		[
			98,
			.89,
			6069.78
		],
		[
			86,
			5.69,
			15720.84
		],
		[
			86,
			1.27,
			161000.69
		],
		[
			65,
			.27,
			17260.15
		],
		[
			63,
			.92,
			529.69
		],
		[
			57,
			2.01,
			83996.85
		],
		[
			56,
			5.24,
			71430.7
		],
		[
			49,
			3.25,
			2544.31
		],
		[
			47,
			2.58,
			775.52
		],
		[
			45,
			5.54,
			9437.76
		],
		[
			43,
			6.01,
			6275.96
		],
		[
			39,
			5.36,
			4694
		],
		[
			38,
			2.39,
			8827.39
		],
		[
			37,
			.83,
			19651.05
		],
		[
			37,
			4.9,
			12139.55
		],
		[
			36,
			1.67,
			12036.46
		],
		[
			35,
			1.84,
			2942.46
		],
		[
			33,
			.24,
			7084.9
		],
		[
			32,
			.18,
			5088.63
		],
		[
			32,
			1.78,
			398.15
		],
		[
			28,
			1.21,
			6286.6
		],
		[
			28,
			1.9,
			6279.55
		],
		[
			26,
			4.59,
			10447.39
		]
	],
	[
		[
			103019,
			1.10749,
			6283.07585
		],
		[
			1721,
			1.0644,
			12566.1517
		],
		[
			702,
			3.142,
			0
		],
		[
			32,
			1.02,
			18849.23
		],
		[
			31,
			2.84,
			5507.55
		],
		[
			25,
			1.32,
			5223.69
		],
		[
			18,
			1.42,
			1577.34
		],
		[
			10,
			5.91,
			10977.08
		],
		[
			9,
			1.42,
			6275.96
		],
		[
			9,
			.27,
			5486.78
		]
	],
	[
		[
			4359,
			5.7846,
			6283.0758
		],
		[
			124,
			5.579,
			12566.152
		],
		[
			12,
			3.14,
			0
		],
		[
			9,
			3.63,
			77713.77
		],
		[
			6,
			1.87,
			5573.14
		],
		[
			3,
			5.47,
			18849.23
		]
	],
	[[
		145,
		4.273,
		6283.076
	], [
		7,
		3.92,
		12566.15
	]],
	[[
		4,
		2.56,
		6283.08
	]]
];
/**
* Nutation Y Terms - coefficients for calculating nutation in longitude and obliquity
*/
const Y_TERMS = [
	[
		0,
		0,
		0,
		0,
		1
	],
	[
		-2,
		0,
		0,
		2,
		2
	],
	[
		0,
		0,
		0,
		2,
		2
	],
	[
		0,
		0,
		0,
		0,
		2
	],
	[
		0,
		1,
		0,
		0,
		0
	],
	[
		0,
		0,
		1,
		0,
		0
	],
	[
		-2,
		1,
		0,
		2,
		2
	],
	[
		0,
		0,
		0,
		2,
		1
	],
	[
		0,
		0,
		1,
		2,
		2
	],
	[
		-2,
		-1,
		0,
		2,
		2
	],
	[
		-2,
		0,
		1,
		0,
		0
	],
	[
		-2,
		0,
		0,
		2,
		1
	],
	[
		0,
		0,
		-1,
		2,
		2
	],
	[
		2,
		0,
		0,
		0,
		0
	],
	[
		0,
		0,
		1,
		0,
		1
	],
	[
		2,
		0,
		-1,
		2,
		2
	],
	[
		0,
		0,
		-1,
		0,
		1
	],
	[
		0,
		0,
		1,
		2,
		1
	],
	[
		-2,
		0,
		2,
		0,
		0
	],
	[
		0,
		0,
		-2,
		2,
		1
	],
	[
		2,
		0,
		0,
		2,
		2
	],
	[
		0,
		0,
		2,
		2,
		2
	],
	[
		0,
		0,
		2,
		0,
		0
	],
	[
		-2,
		0,
		1,
		2,
		2
	],
	[
		0,
		0,
		0,
		2,
		0
	],
	[
		-2,
		0,
		0,
		2,
		0
	],
	[
		0,
		0,
		-1,
		2,
		1
	],
	[
		0,
		2,
		0,
		0,
		0
	],
	[
		2,
		0,
		-1,
		0,
		1
	],
	[
		-2,
		2,
		0,
		2,
		2
	],
	[
		0,
		1,
		0,
		0,
		1
	],
	[
		-2,
		0,
		1,
		0,
		1
	],
	[
		0,
		-1,
		0,
		0,
		1
	],
	[
		0,
		0,
		2,
		-2,
		0
	],
	[
		2,
		0,
		-1,
		2,
		1
	],
	[
		2,
		0,
		1,
		2,
		2
	],
	[
		0,
		1,
		0,
		2,
		2
	],
	[
		-2,
		1,
		1,
		0,
		0
	],
	[
		0,
		-1,
		0,
		2,
		2
	],
	[
		2,
		0,
		0,
		2,
		1
	],
	[
		2,
		0,
		1,
		0,
		0
	],
	[
		-2,
		0,
		2,
		2,
		2
	],
	[
		-2,
		0,
		1,
		2,
		1
	],
	[
		2,
		0,
		-2,
		0,
		1
	],
	[
		2,
		0,
		0,
		0,
		1
	],
	[
		0,
		-1,
		1,
		0,
		0
	],
	[
		-2,
		-1,
		0,
		2,
		1
	],
	[
		-2,
		0,
		0,
		0,
		1
	],
	[
		0,
		0,
		2,
		2,
		1
	],
	[
		-2,
		0,
		2,
		0,
		1
	],
	[
		-2,
		1,
		0,
		2,
		1
	],
	[
		0,
		0,
		1,
		-2,
		0
	],
	[
		-1,
		0,
		1,
		0,
		0
	],
	[
		-2,
		1,
		0,
		0,
		0
	],
	[
		1,
		0,
		0,
		0,
		0
	],
	[
		0,
		0,
		1,
		2,
		0
	],
	[
		0,
		0,
		-2,
		2,
		2
	],
	[
		-1,
		-1,
		1,
		0,
		0
	],
	[
		0,
		1,
		1,
		0,
		0
	],
	[
		0,
		-1,
		1,
		2,
		2
	],
	[
		2,
		-1,
		-1,
		2,
		2
	],
	[
		0,
		0,
		3,
		2,
		2
	],
	[
		2,
		-1,
		0,
		2,
		2
	]
];
/**
* Periodic Terms for Nutation in Longitude and Obliquity (PE)
* [PSI_A, PSI_B, EPS_C, EPS_D]
*/
const PE_TERMS = [
	[
		-171996,
		-174.2,
		92025,
		8.9
	],
	[
		-13187,
		-1.6,
		5736,
		-3.1
	],
	[
		-2274,
		-.2,
		977,
		-.5
	],
	[
		2062,
		.2,
		-895,
		.5
	],
	[
		1426,
		-3.4,
		54,
		-.1
	],
	[
		712,
		.1,
		-7,
		0
	],
	[
		-517,
		1.2,
		224,
		-.6
	],
	[
		-386,
		-.4,
		200,
		0
	],
	[
		-301,
		0,
		129,
		-.1
	],
	[
		217,
		-.5,
		-95,
		.3
	],
	[
		-158,
		0,
		0,
		0
	],
	[
		129,
		.1,
		-70,
		0
	],
	[
		123,
		0,
		-53,
		0
	],
	[
		63,
		0,
		0,
		0
	],
	[
		63,
		.1,
		-33,
		0
	],
	[
		-59,
		0,
		26,
		0
	],
	[
		-58,
		-.1,
		32,
		0
	],
	[
		-51,
		0,
		27,
		0
	],
	[
		48,
		0,
		0,
		0
	],
	[
		46,
		0,
		-24,
		0
	],
	[
		-38,
		0,
		16,
		0
	],
	[
		-31,
		0,
		13,
		0
	],
	[
		29,
		0,
		0,
		0
	],
	[
		29,
		0,
		-12,
		0
	],
	[
		26,
		0,
		0,
		0
	],
	[
		-22,
		0,
		0,
		0
	],
	[
		21,
		0,
		-10,
		0
	],
	[
		17,
		-.1,
		0,
		0
	],
	[
		16,
		0,
		-8,
		0
	],
	[
		-16,
		.1,
		7,
		0
	],
	[
		-15,
		0,
		9,
		0
	],
	[
		-13,
		0,
		7,
		0
	],
	[
		-12,
		0,
		6,
		0
	],
	[
		11,
		0,
		0,
		0
	],
	[
		-10,
		0,
		5,
		0
	],
	[
		-8,
		0,
		3,
		0
	],
	[
		7,
		0,
		-3,
		0
	],
	[
		-7,
		0,
		0,
		0
	],
	[
		-7,
		0,
		3,
		0
	],
	[
		-7,
		0,
		3,
		0
	],
	[
		6,
		0,
		0,
		0
	],
	[
		6,
		0,
		-3,
		0
	],
	[
		6,
		0,
		-3,
		0
	],
	[
		-6,
		0,
		3,
		0
	],
	[
		-6,
		0,
		3,
		0
	],
	[
		5,
		0,
		0,
		0
	],
	[
		-5,
		0,
		3,
		0
	],
	[
		-5,
		0,
		3,
		0
	],
	[
		-5,
		0,
		3,
		0
	],
	[
		4,
		0,
		0,
		0
	],
	[
		4,
		0,
		0,
		0
	],
	[
		4,
		0,
		0,
		0
	],
	[
		-4,
		0,
		0,
		0
	],
	[
		-4,
		0,
		0,
		0
	],
	[
		-4,
		0,
		0,
		0
	],
	[
		3,
		0,
		0,
		0
	],
	[
		-3,
		0,
		0,
		0
	],
	[
		-3,
		0,
		0,
		0
	],
	[
		-3,
		0,
		0,
		0
	],
	[
		-3,
		0,
		0,
		0
	],
	[
		-3,
		0,
		0,
		0
	],
	[
		-3,
		0,
		0,
		0
	],
	[
		-3,
		0,
		0,
		0
	]
];

//#endregion
//#region src/utils/math.ts
/**
* Mathematical utility functions for Solar Position Algorithm
*/
/**
* Convert degrees to radians
*/
function deg2rad(degrees) {
	return PI / 180 * degrees;
}
/**
* Convert radians to degrees
*/
function rad2deg(radians) {
	return 180 / PI * radians;
}
/**
* Limit degrees to 0-360 range
*/
function limitDegrees(degrees) {
	let limited = degrees / 360;
	limited = 360 * (limited - Math.floor(limited));
	if (limited < 0) limited += 360;
	return limited;
}
/**
* Limit degrees to 0-180 range
*/
function limitDegrees180(degrees) {
	let limited = degrees / 180;
	limited = 180 * (limited - Math.floor(limited));
	if (limited < 0) limited += 180;
	return limited;
}
/**
* Limit degrees to -180 to +180 range
*/
function limitDegrees180pm(degrees) {
	let limited = degrees / 360;
	limited = 360 * (limited - Math.floor(limited));
	if (limited < -180) limited += 360;
	else if (limited > 180) limited -= 360;
	return limited;
}
/**
* Limit value to 0-1 range (fractional day)
*/
function limitZero2one(value) {
	let limited = value - Math.floor(value);
	if (limited < 0) limited += 1;
	return limited;
}
/**
* Calculate third-order polynomial: ((a*x + b)*x + c)*x + d
*/
function thirdOrderPolynomial(a, b, c, d, x) {
	return ((a * x + b) * x + c) * x + d;
}
/**
* Limit minutes to -20 to 20 range (for equation of time)
*/
function limitMinutes(minutes) {
	let limited = minutes;
	if (limited < -20) limited += 1440;
	else if (limited > 20) limited -= 1440;
	return limited;
}

//#endregion
//#region src/utils/time.ts
/**
* Time conversion utilities for Solar Position Algorithm
*/
/**
* Convert day fraction to local hour
* @param dayfrac - Day fraction (0-1)
* @param timezone - Timezone offset in hours
* @returns Local hour (0-24)
*/
function dayfracToLocalHr(dayfrac, timezone) {
	return 24 * limitZero2one(dayfrac + timezone / 24);
}
/**
* Convert fractional hours to Date object
* @param date - Base date (used for year, month, day)
* @param fractionalHour - Hour as fractional value (0-24)
* @param timezone - Timezone offset in hours (negative west of Greenwich)
* @returns Date object representing the time
*/
function fractionalHourToDate(date, fractionalHour, timezone) {
	if (fractionalHour < 0 || !isFinite(fractionalHour)) return /* @__PURE__ */ new Date(NaN);
	const hours = Math.floor(fractionalHour);
	const minutesDecimal = (fractionalHour - hours) * 60;
	const minutes = Math.floor(minutesDecimal);
	const secondsDecimal = (minutesDecimal - minutes) * 60;
	const seconds = Math.floor(secondsDecimal);
	const milliseconds = Math.round((secondsDecimal - seconds) * 1e3);
	const result = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
	const utcHours = hours - timezone;
	result.setUTCHours(utcHours, minutes, seconds, milliseconds);
	return result;
}

//#endregion
//#region src/types.ts
/**
* Solar Position Algorithm (SPA) Type Definitions
* Based on NREL's Solar Position Algorithm for Solar Radiation Applications
*/
/**
* Output calculation modes
*/
let SpaFunction = /* @__PURE__ */ function(SpaFunction$1) {
	/** Calculate only zenith and azimuth */
	SpaFunction$1[SpaFunction$1["SPA_ZA"] = 0] = "SPA_ZA";
	/** Calculate zenith, azimuth, and incidence angle */
	SpaFunction$1[SpaFunction$1["SPA_ZA_INC"] = 1] = "SPA_ZA_INC";
	/** Calculate zenith, azimuth, and rise/transit/set */
	SpaFunction$1[SpaFunction$1["SPA_ZA_RTS"] = 2] = "SPA_ZA_RTS";
	/** Calculate all output values */
	SpaFunction$1[SpaFunction$1["SPA_ALL"] = 3] = "SPA_ALL";
	return SpaFunction$1;
}({});
/**
* Julian Day offset enumeration for RTS calculations
*/
let JDSign = /* @__PURE__ */ function(JDSign$1) {
	JDSign$1[JDSign$1["JD_MINUS"] = 0] = "JD_MINUS";
	JDSign$1[JDSign$1["JD_ZERO"] = 1] = "JD_ZERO";
	JDSign$1[JDSign$1["JD_PLUS"] = 2] = "JD_PLUS";
	JDSign$1[JDSign$1["JD_COUNT"] = 3] = "JD_COUNT";
	return JDSign$1;
}({});
/**
* Sun state enumeration for RTS calculations
*/
let SunState = /* @__PURE__ */ function(SunState$1) {
	SunState$1[SunState$1["SUN_TRANSIT"] = 0] = "SUN_TRANSIT";
	SunState$1[SunState$1["SUN_RISE"] = 1] = "SUN_RISE";
	SunState$1[SunState$1["SUN_SET"] = 2] = "SUN_SET";
	SunState$1[SunState$1["SUN_COUNT"] = 3] = "SUN_COUNT";
	return SunState$1;
}({});

//#endregion
//#region src/utils/date.ts
/**
* Date and Julian day calculation utilities for Solar Position Algorithm
*/
/**
* Calculate Julian Day from calendar date and time
* @param year - 4-digit year
* @param month - Month (1-12)
* @param day - Day of month (1-31)
* @param hour - Hour (0-24)
* @param minute - Minute (0-59)
* @param second - Second (0-59.999...)
* @param deltaUt1 - Fractional second difference between UTC and UT
* @param timezone - Timezone offset in hours (negative west of Greenwich)
* @returns Julian Day number
*/
function julianDay(year, month, day, hour, minute, second, deltaUt1, timezone) {
	let y = year;
	let m = month;
	const dayDecimal = day + (hour - timezone + (minute + (second + deltaUt1) / 60) / 60) / 24;
	if (m < 3) {
		m += 12;
		y--;
	}
	let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayDecimal - 1524.5;
	if (jd > 2299160) {
		const a = Math.floor(y / 100);
		jd += 2 - a + Math.floor(a / 4);
	}
	return jd;
}
/**
* Calculate Julian Century from Julian Day
* @param jd - Julian Day
* @returns Julian Century
*/
function julianCentury(jd) {
	return (jd - 2451545) / 36525;
}
/**
* Calculate Julian Ephemeris Day
* @param jd - Julian Day
* @param deltaT - Difference between earth rotation time and terrestrial time (seconds)
* @returns Julian Ephemeris Day
*/
function julianEphemerisDay(jd, deltaT) {
	return jd + deltaT / 86400;
}
/**
* Calculate Julian Ephemeris Century
* @param jde - Julian Ephemeris Day
* @returns Julian Ephemeris Century
*/
function julianEphemerisCentury(jde) {
	return (jde - 2451545) / 36525;
}
/**
* Calculate Julian Ephemeris Millennium
* @param jce - Julian Ephemeris Century
* @returns Julian Ephemeris Millennium
*/
function julianEphemerisMillennium(jce) {
	return jce / 10;
}

//#endregion
//#region src/calculations/earth.ts
/**
* Earth position calculations for Solar Position Algorithm
* Calculates heliocentric longitude, latitude, and radius vector
*/
/**
* Calculate the sum of periodic terms for a given series
* @param terms - Array of [A, B, C] coefficients
* @param count - Number of terms to sum
* @param jme - Julian Ephemeris Millennium
* @returns Sum of periodic terms
*/
function earthPeriodicTermSummation(terms, count, jme) {
	let sum = 0;
	for (let i = 0; i < count; i++) sum += terms[i][TERM_A] * Math.cos(terms[i][TERM_B] + terms[i][TERM_C] * jme);
	return sum;
}
/**
* Calculate the value from periodic term sums
* @param termSum - Array of periodic term sums
* @param count - Number of series
* @param jme - Julian Ephemeris Millennium
* @returns Combined value
*/
function earthValues(termSum, count, jme) {
	let sum = 0;
	for (let i = 0; i < count; i++) sum += termSum[i] * Math.pow(jme, i);
	sum /= 1e8;
	return sum;
}
/**
* Calculate Earth's heliocentric longitude
* @param jme - Julian Ephemeris Millennium
* @returns Heliocentric longitude in degrees (0-360)
*/
function earthHeliocentricLongitude(jme) {
	const sum = [];
	for (let i = 0; i < L_COUNT; i++) sum[i] = earthPeriodicTermSummation(L_TERMS[i], L_SUBCOUNT[i], jme);
	return limitDegrees(rad2deg(earthValues(sum, L_COUNT, jme)));
}
/**
* Calculate Earth's heliocentric latitude
* @param jme - Julian Ephemeris Millennium
* @returns Heliocentric latitude in degrees
*/
function earthHeliocentricLatitude(jme) {
	const sum = [];
	for (let i = 0; i < B_COUNT; i++) sum[i] = earthPeriodicTermSummation(B_TERMS[i], B_SUBCOUNT[i], jme);
	return rad2deg(earthValues(sum, B_COUNT, jme));
}
/**
* Calculate Earth's radius vector (distance from Sun)
* @param jme - Julian Ephemeris Millennium
* @returns Radius vector in Astronomical Units (AU)
*/
function earthRadiusVector(jme) {
	const sum = [];
	for (let i = 0; i < R_COUNT; i++) sum[i] = earthPeriodicTermSummation(R_TERMS[i], R_SUBCOUNT[i], jme);
	return earthValues(sum, R_COUNT, jme);
}

//#endregion
//#region src/calculations/sun.ts
/**
* Sun position calculations for Solar Position Algorithm
* Calculates geocentric position, right ascension, declination
*/
/**
* Calculate geocentric longitude from heliocentric longitude
* @param l - Heliocentric longitude in degrees
* @returns Geocentric longitude in degrees
*/
function geocentricLongitude(l) {
	let theta = l + 180;
	if (theta >= 360) theta -= 360;
	return theta;
}
/**
* Calculate geocentric latitude from heliocentric latitude
* @param b - Heliocentric latitude in degrees
* @returns Geocentric latitude in degrees
*/
function geocentricLatitude(b) {
	return -b;
}
/**
* Calculate the aberration correction
* @param r - Earth radius vector in AU
* @returns Aberration correction in degrees
*/
function aberrationCorrection(r) {
	return -20.4898 / (3600 * r);
}
/**
* Calculate the apparent sun longitude
* @param theta - Geocentric longitude in degrees
* @param deltaPsi - Nutation in longitude in degrees
* @param deltaTau - Aberration correction in degrees
* @returns Apparent sun longitude in degrees
*/
function apparentSunLongitude(theta, deltaPsi, deltaTau) {
	return theta + deltaPsi + deltaTau;
}
/**
* Calculate geocentric sun right ascension
* @param lamda - Apparent sun longitude in degrees
* @param epsilon - True obliquity of ecliptic in degrees
* @param beta - Geocentric latitude in degrees
* @returns Right ascension in degrees (0-360)
*/
function geocentricRightAscension(lamda, epsilon, beta) {
	const lamdaRad = deg2rad(lamda);
	const epsilonRad = deg2rad(epsilon);
	return limitDegrees(rad2deg(Math.atan2(Math.sin(lamdaRad) * Math.cos(epsilonRad) - Math.tan(deg2rad(beta)) * Math.sin(epsilonRad), Math.cos(lamdaRad))));
}
/**
* Calculate geocentric sun declination
* @param beta - Geocentric latitude in degrees
* @param epsilon - True obliquity of ecliptic in degrees
* @param lamda - Apparent sun longitude in degrees
* @returns Declination in degrees
*/
function geocentricDeclination(beta, epsilon, lamda) {
	const betaRad = deg2rad(beta);
	const epsilonRad = deg2rad(epsilon);
	return rad2deg(Math.asin(Math.sin(betaRad) * Math.cos(epsilonRad) + Math.cos(betaRad) * Math.sin(epsilonRad) * Math.sin(deg2rad(lamda))));
}
/**
* Calculate sun mean longitude
* @param jme - Julian Ephemeris Millennium
* @returns Mean longitude in degrees
*/
function sunMeanLongitude(jme) {
	return limitDegrees(280.4664567 + jme * (360007.6982779 + jme * (.03032028 + jme * (1 / 49931 + jme * (-1 / 15300 + jme * (-1 / 2e6))))));
}
/**
* Calculate sun equatorial horizontal parallax
* @param r - Earth radius vector in AU
* @returns Parallax in degrees
*/
function sunEquatorialHorizontalParallax(r) {
	return 8.794 / (3600 * r);
}

//#endregion
//#region src/calculations/nutation.ts
/**
* Nutation and obliquity calculations for Solar Position Algorithm
*/
/**
* Calculate mean elongation of the Moon from the Sun
* @param jce - Julian Ephemeris Century
* @returns Mean elongation in degrees
*/
function meanElongationMoonSun(jce) {
	return thirdOrderPolynomial(1 / 189474, -.0019142, 445267.11148, 297.85036, jce);
}
/**
* Calculate mean anomaly of the Sun
* @param jce - Julian Ephemeris Century
* @returns Mean anomaly in degrees
*/
function meanAnomalySun(jce) {
	return thirdOrderPolynomial(-1 / 3e5, -1603e-7, 35999.05034, 357.52772, jce);
}
/**
* Calculate mean anomaly of the Moon
* @param jce - Julian Ephemeris Century
* @returns Mean anomaly in degrees
*/
function meanAnomalyMoon(jce) {
	return thirdOrderPolynomial(1 / 56250, .0086972, 477198.867398, 134.96298, jce);
}
/**
* Calculate argument of latitude of the Moon
* @param jce - Julian Ephemeris Century
* @returns Argument of latitude in degrees
*/
function argumentLatitudeMoon(jce) {
	return thirdOrderPolynomial(1 / 327270, -.0036825, 483202.017538, 93.27191, jce);
}
/**
* Calculate ascending node longitude of the Moon
* @param jce - Julian Ephemeris Century
* @returns Ascending longitude in degrees
*/
function ascendingLongitudeMoon(jce) {
	return thirdOrderPolynomial(1 / 45e4, .0020708, -1934.136261, 125.04452, jce);
}
/**
* Calculate XY term summation for nutation
*/
function xyTermSummation(i, x) {
	let sum = 0;
	for (let j = 0; j < TERM_X_COUNT; j++) sum += x[j] * Y_TERMS[i][j];
	return sum;
}
/**
* Calculate nutation in longitude and obliquity
* @param jce - Julian Ephemeris Century
* @param x - Array of X terms [x0, x1, x2, x3, x4]
* @returns Nutation in longitude and obliquity (degrees)
*/
function nutationLongitudeAndObliquity(jce, x) {
	let sumPsi = 0;
	let sumEpsilon = 0;
	for (let i = 0; i < Y_COUNT; i++) {
		const xyTermSum = deg2rad(xyTermSummation(i, x));
		sumPsi += (PE_TERMS[i][TERM_PSI_A] + jce * PE_TERMS[i][TERM_PSI_B]) * Math.sin(xyTermSum);
		sumEpsilon += (PE_TERMS[i][TERM_EPS_C] + jce * PE_TERMS[i][TERM_EPS_D]) * Math.cos(xyTermSum);
	}
	return {
		delPsi: sumPsi / 36e6,
		delEpsilon: sumEpsilon / 36e6
	};
}
/**
* Calculate ecliptic mean obliquity
* @param jme - Julian Ephemeris Millennium
* @returns Mean obliquity in arc seconds
*/
function eclipticMeanObliquity(jme) {
	const u = jme / 10;
	return 84381.448 + u * (-4680.93 + u * (-1.55 + u * (1999.25 + u * (-51.38 + u * (-249.67 + u * (-39.05 + u * (7.12 + u * (27.87 + u * (5.79 + u * 2.45)))))))));
}
/**
* Calculate ecliptic true obliquity
* @param deltaEpsilon - Nutation in obliquity (degrees)
* @param epsilon0 - Mean obliquity (arc seconds)
* @returns True obliquity in degrees
*/
function eclipticTrueObliquity(deltaEpsilon, epsilon0) {
	return deltaEpsilon + epsilon0 / 3600;
}

//#endregion
//#region src/calculations/observer.ts
/**
* Observer position and topocentric calculations for Solar Position Algorithm
*/
/**
* Calculate Greenwich mean sidereal time
* @param jd - Julian Day
* @param jc - Julian Century
* @returns Greenwich mean sidereal time in degrees
*/
function greenwichMeanSiderealTime(jd, jc) {
	return limitDegrees(280.46061837 + 360.98564736629 * (jd - 2451545) + jc * jc * (387933e-9 - jc / 3871e4));
}
/**
* Calculate Greenwich sidereal time
* @param nu0 - Greenwich mean sidereal time in degrees
* @param deltaPsi - Nutation in longitude in degrees
* @param epsilon - True obliquity in degrees
* @returns Greenwich sidereal time in degrees
*/
function greenwichSiderealTime(nu0, deltaPsi, epsilon) {
	return nu0 + deltaPsi * Math.cos(deg2rad(epsilon));
}
/**
* Calculate observer hour angle
* @param nu - Greenwich sidereal time in degrees
* @param longitude - Observer longitude in degrees
* @param alphaDeg - Geocentric right ascension in degrees
* @returns Observer hour angle in degrees
*/
function observerHourAngle(nu, longitude, alphaDeg) {
	return limitDegrees(nu + longitude - alphaDeg);
}
/**
* Calculate right ascension parallax and topocentric declination
* @param latitude - Observer latitude in degrees
* @param elevation - Observer elevation in meters
* @param xi - Sun equatorial horizontal parallax in degrees
* @param h - Observer hour angle in degrees
* @param delta - Geocentric declination in degrees
* @returns Parallax result with deltaAlpha and deltaPrime
*/
function rightAscensionParallaxAndTopocentricDec(latitude, elevation, xi, h, delta) {
	const latRad = deg2rad(latitude);
	const xiRad = deg2rad(xi);
	const hRad = deg2rad(h);
	const deltaRad = deg2rad(delta);
	const u = Math.atan(.99664719 * Math.tan(latRad));
	const y = .99664719 * Math.sin(u) + elevation * Math.sin(latRad) / 6378140;
	const x = Math.cos(u) + elevation * Math.cos(latRad) / 6378140;
	const deltaAlphaRad = Math.atan2(-x * Math.sin(xiRad) * Math.sin(hRad), Math.cos(deltaRad) - x * Math.sin(xiRad) * Math.cos(hRad));
	const deltaPrime = rad2deg(Math.atan2((Math.sin(deltaRad) - y * Math.sin(xiRad)) * Math.cos(deltaAlphaRad), Math.cos(deltaRad) - x * Math.sin(xiRad) * Math.cos(hRad)));
	return {
		deltaAlpha: rad2deg(deltaAlphaRad),
		deltaPrime
	};
}
/**
* Calculate topocentric right ascension
* @param alphaDeg - Geocentric right ascension in degrees
* @param deltaAlpha - Right ascension parallax in degrees
* @returns Topocentric right ascension in degrees
*/
function topocentricRightAscension(alphaDeg, deltaAlpha) {
	return alphaDeg + deltaAlpha;
}
/**
* Calculate topocentric local hour angle
* @param h - Observer hour angle in degrees
* @param deltaAlpha - Right ascension parallax in degrees
* @returns Topocentric local hour angle in degrees
*/
function topocentricLocalHourAngle(h, deltaAlpha) {
	return h - deltaAlpha;
}
/**
* Calculate topocentric elevation angle (uncorrected)
* @param latitude - Observer latitude in degrees
* @param deltaPrime - Topocentric declination in degrees
* @param hPrime - Topocentric local hour angle in degrees
* @returns Topocentric elevation angle in degrees
*/
function topocentricElevationAngle(latitude, deltaPrime, hPrime) {
	const latRad = deg2rad(latitude);
	const deltaPrimeRad = deg2rad(deltaPrime);
	return rad2deg(Math.asin(Math.sin(latRad) * Math.sin(deltaPrimeRad) + Math.cos(latRad) * Math.cos(deltaPrimeRad) * Math.cos(deg2rad(hPrime))));
}
/**
* Calculate atmospheric refraction correction
* @param pressure - Atmospheric pressure in millibars
* @param temperature - Temperature in Celsius
* @param atmosphericRefraction - Atmospheric refraction at sunrise/sunset in degrees
* @param e0 - Uncorrected elevation angle in degrees
* @returns Refraction correction in degrees
*/
function atmosphericRefractionCorrection(pressure, temperature, atmosphericRefraction, e0) {
	let delE = 0;
	if (e0 >= -1 * (SUN_RADIUS + atmosphericRefraction)) delE = pressure / 1010 * (283 / (273 + temperature)) * (1.02 / (60 * Math.tan(deg2rad(e0 + 10.3 / (e0 + 5.11)))));
	return delE;
}
/**
* Calculate topocentric elevation angle (corrected for refraction)
* @param e0 - Uncorrected elevation angle in degrees
* @param deltaE - Atmospheric refraction correction in degrees
* @returns Corrected topocentric elevation angle in degrees
*/
function topocentricElevationAngleCorrected(e0, deltaE) {
	return e0 + deltaE;
}
/**
* Calculate topocentric zenith angle
* @param e - Topocentric elevation angle in degrees
* @returns Topocentric zenith angle in degrees
*/
function topocentricZenithAngle(e) {
	return 90 - e;
}
/**
* Calculate topocentric azimuth angle (astronomers' convention - westward from south)
* @param hPrime - Topocentric local hour angle in degrees
* @param latitude - Observer latitude in degrees
* @param deltaPrime - Topocentric declination in degrees
* @returns Azimuth angle in degrees
*/
function topocentricAzimuthAngleAstro(hPrime, latitude, deltaPrime) {
	const hPrimeRad = deg2rad(hPrime);
	const latRad = deg2rad(latitude);
	return limitDegrees(rad2deg(Math.atan2(Math.sin(hPrimeRad), Math.cos(hPrimeRad) * Math.sin(latRad) - Math.tan(deg2rad(deltaPrime)) * Math.cos(latRad))));
}
/**
* Calculate topocentric azimuth angle (navigators' convention - eastward from north)
* @param azimuthAstro - Astronomical azimuth in degrees
* @returns Azimuth angle in degrees
*/
function topocentricAzimuthAngle(azimuthAstro) {
	return limitDegrees(azimuthAstro + 180);
}
/**
* Calculate surface incidence angle
* @param zenith - Topocentric zenith angle in degrees
* @param azimuthAstro - Astronomical azimuth in degrees
* @param azimuthRotation - Surface azimuth rotation in degrees
* @param slope - Surface slope in degrees
* @returns Surface incidence angle in degrees
*/
function surfaceIncidenceAngle(zenith, azimuthAstro, azimuthRotation, slope) {
	const zenithRad = deg2rad(zenith);
	const slopeRad = deg2rad(slope);
	return rad2deg(Math.acos(Math.cos(zenithRad) * Math.cos(slopeRad) + Math.sin(slopeRad) * Math.sin(zenithRad) * Math.cos(deg2rad(azimuthAstro - azimuthRotation))));
}

//#endregion
//#region src/calculations/rts.ts
/**
* Sunrise, Transit, and Sunset (RTS) calculations for Solar Position Algorithm
* Handles high-latitude edge cases (polar day/night)
*/
/**
* Calculate sun hour angle at rise/set for a given zenith
* @param latitude - Observer latitude in degrees
* @param deltaZero - Geocentric declination at noon in degrees
* @param h0Prime - Zenith angle for rise/set (negative of elevation at horizon)
* @returns Hour angle in degrees, or INVALID_VALUE if sun doesn't rise/set (polar day/night)
*/
function sunHourAngleAtRiseSet(latitude, deltaZero, h0Prime) {
	const latitudeRad = deg2rad(latitude);
	const deltaZeroRad = deg2rad(deltaZero);
	const argument = (Math.sin(deg2rad(h0Prime)) - Math.sin(latitudeRad) * Math.sin(deltaZeroRad)) / (Math.cos(latitudeRad) * Math.cos(deltaZeroRad));
	if (Math.abs(argument) <= 1) return limitDegrees180(rad2deg(Math.acos(argument)));
	return INVALID_VALUE;
}
/**
* Calculate approximate sun transit time
* @param alphaZero - Right ascension at noon in degrees
* @param longitude - Observer longitude in degrees
* @param nu - Greenwich sidereal time in degrees
* @returns Approximate transit time as day fraction
*/
function approxSunTransitTime(alphaZero, longitude, nu) {
	return (alphaZero - longitude - nu) / 360;
}
/**
* Calculate approximate sunrise and sunset times
* @param mRts - Array to store [transit, rise, set] day fractions (modified in place)
* @param h0 - Hour angle at rise/set in degrees
*/
function approxSunRiseAndSet(mRts, h0) {
	const h0Dfrac = h0 / 360;
	mRts[SunState.SUN_RISE] = limitZero2one(mRts[SunState.SUN_TRANSIT] - h0Dfrac);
	mRts[SunState.SUN_SET] = limitZero2one(mRts[SunState.SUN_TRANSIT] + h0Dfrac);
	mRts[SunState.SUN_TRANSIT] = limitZero2one(mRts[SunState.SUN_TRANSIT]);
}
/**
* Calculate interpolated alpha or delta for RTS
* @param ad - Array of [yesterday, today, tomorrow] values
* @param n - Interpolation factor
* @returns Interpolated value
*/
function rtsAlphaDeltaPrime(ad, n) {
	let a = ad[JDSign.JD_ZERO] - ad[JDSign.JD_MINUS];
	let b = ad[JDSign.JD_PLUS] - ad[JDSign.JD_ZERO];
	if (Math.abs(a) >= 2) a = limitZero2one(a);
	if (Math.abs(b) >= 2) b = limitZero2one(b);
	return ad[JDSign.JD_ZERO] + n * (a + b + (b - a) * n) / 2;
}
/**
* Calculate sun altitude for RTS
* @param latitude - Observer latitude in degrees
* @param deltaPrime - Topocentric declination in degrees
* @param hPrime - Topocentric hour angle in degrees
* @returns Sun altitude in degrees
*/
function rtsSunAltitude(latitude, deltaPrime, hPrime) {
	const latitudeRad = deg2rad(latitude);
	const deltaPrimeRad = deg2rad(deltaPrime);
	return rad2deg(Math.asin(Math.sin(latitudeRad) * Math.sin(deltaPrimeRad) + Math.cos(latitudeRad) * Math.cos(deltaPrimeRad) * Math.cos(deg2rad(hPrime))));
}
/**
* Calculate refined sunrise or sunset time
* @param mRts - Array of [transit, rise, set] day fractions
* @param hRts - Array of sun altitudes at [transit, rise, set]
* @param deltaPrime - Array of topocentric declinations
* @param latitude - Observer latitude in degrees
* @param hPrime - Array of topocentric hour angles
* @param h0Prime - Target elevation at horizon
* @param sun - SunState indicating which time to calculate
* @returns Refined day fraction for the requested sun state
*/
function sunRiseAndSet(mRts, hRts, deltaPrime, latitude, hPrime, h0Prime, sun) {
	return mRts[sun] + (hRts[sun] - h0Prime) / (360 * Math.cos(deg2rad(deltaPrime[sun])) * Math.cos(deg2rad(latitude)) * Math.sin(deg2rad(hPrime[sun])));
}
/**
* Calculate equation of time
* @param m - Sun mean longitude in degrees
* @param alpha - Geocentric right ascension in degrees
* @param delPsi - Nutation in longitude in degrees
* @param epsilon - True obliquity in degrees
* @returns Equation of time in minutes
*/
function equationOfTime(m, alpha, delPsi, epsilon) {
	return limitMinutes(4 * (m - .0057183 - alpha + delPsi * Math.cos(deg2rad(epsilon))));
}
/**
* Calculate equation of time and sun rise/transit/set times
* This is the main RTS calculation function that handles high-latitude cases
* 
* @param spa - SPA data object with all calculated values
* @param calculateRaDec - Function to calculate RA and Dec for a given Julian Day
* @returns RTS calculation results
*/
function calculateEotAndSunRiseTransitSet(spa, calculateRaDec) {
	const h0Prime = -1 * (SUN_RADIUS + spa.atmosphericRefraction);
	const sunRtsJd = julianDay(spa.year, spa.month, spa.day, 0, 0, 0, 0, 0);
	const nu = calculateRaDec(sunRtsJd, spa.deltaT).nu;
	const eot = equationOfTime(sunMeanLongitude(spa.jme), spa.alpha, spa.delPsi, spa.epsilon);
	const alpha = [];
	const delta = [];
	for (let i = 0; i < JDSign.JD_COUNT; i++) {
		const result = calculateRaDec(sunRtsJd + i - 1, spa.deltaT);
		alpha[i] = result.alpha;
		delta[i] = result.delta;
	}
	const mRts = [];
	mRts[SunState.SUN_TRANSIT] = approxSunTransitTime(alpha[JDSign.JD_ZERO], spa.longitude, nu);
	const h0 = sunHourAngleAtRiseSet(spa.latitude, delta[JDSign.JD_ZERO], h0Prime);
	if (h0 === INVALID_VALUE) return {
		sunrise: INVALID_VALUE,
		suntransit: INVALID_VALUE,
		sunset: INVALID_VALUE,
		srha: INVALID_VALUE,
		ssha: INVALID_VALUE,
		sta: INVALID_VALUE,
		eot
	};
	approxSunRiseAndSet(mRts, h0);
	const nuRts = [];
	const hPrime = [];
	const alphaPrime = [];
	const deltaPrime = [];
	const hRts = [];
	for (let i = 0; i < SunState.SUN_COUNT; i++) {
		nuRts[i] = nu + 360.985647 * mRts[i];
		const n = mRts[i] + spa.deltaT / 86400;
		alphaPrime[i] = rtsAlphaDeltaPrime(alpha, n);
		deltaPrime[i] = rtsAlphaDeltaPrime(delta, n);
		hPrime[i] = limitDegrees180pm(nuRts[i] + spa.longitude - alphaPrime[i]);
		hRts[i] = rtsSunAltitude(spa.latitude, deltaPrime[i], hPrime[i]);
	}
	const srha = hPrime[SunState.SUN_RISE];
	const ssha = hPrime[SunState.SUN_SET];
	const sta = hRts[SunState.SUN_TRANSIT];
	const suntransit = dayfracToLocalHr(mRts[SunState.SUN_TRANSIT] - hPrime[SunState.SUN_TRANSIT] / 360, spa.timezone);
	return {
		sunrise: dayfracToLocalHr(sunRiseAndSet(mRts, hRts, deltaPrime, spa.latitude, hPrime, h0Prime, SunState.SUN_RISE), spa.timezone),
		suntransit,
		sunset: dayfracToLocalHr(sunRiseAndSet(mRts, hRts, deltaPrime, spa.latitude, hPrime, h0Prime, SunState.SUN_SET), spa.timezone),
		srha,
		ssha,
		sta,
		eot
	};
}
/**
* Calculate sunrise/sunset for a custom zenith angle (for twilight calculations)
* @param latitude - Observer latitude in degrees
* @param delta - Sun declination in degrees
* @param suntransit - Solar noon time in fractional hours
* @param zenithAngle - Custom zenith angle in degrees
* @returns Object with sunrise and sunset in fractional hours, or null values for polar cases
*/
function calculateCustomZenithTimes(latitude, delta, suntransit, zenithAngle) {
	const latRad = deg2rad(latitude);
	const deltaRad = deg2rad(delta);
	const zenithRad = deg2rad(zenithAngle);
	const cosH0 = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(deltaRad)) / (Math.cos(latRad) * Math.cos(deltaRad));
	if (cosH0 < -1 || cosH0 > 1) return {
		sunrise: null,
		sunset: null
	};
	const H0h = rad2deg(Math.acos(cosH0)) / 15;
	return {
		sunrise: suntransit - H0h,
		sunset: suntransit + H0h
	};
}

//#endregion
//#region src/spa.ts
/**
* Solar Position Algorithm (SPA) Main Calculator
* Based on NREL's Solar Position Algorithm for Solar Radiation Applications
* 
* This is the core SPA calculation module that orchestrates all sub-calculations
* to determine precise solar position and rise/transit/set times.
*/
/**
* Create a new SpaData object with default values
*/
function createSpaData() {
	return {
		year: 0,
		month: 0,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0,
		deltaUt1: 0,
		deltaT: 67,
		timezone: 0,
		longitude: 0,
		latitude: 0,
		elevation: 0,
		pressure: 1013,
		temperature: 15,
		slope: 0,
		azimuthRotation: 0,
		atmosphericRefraction: REFRACTION_CORRECTION,
		function: SpaFunction.SPA_ALL,
		jd: 0,
		jc: 0,
		jde: 0,
		jce: 0,
		jme: 0,
		l: 0,
		b: 0,
		r: 0,
		theta: 0,
		beta: 0,
		x0: 0,
		x1: 0,
		x2: 0,
		x3: 0,
		x4: 0,
		delPsi: 0,
		delEpsilon: 0,
		epsilon0: 0,
		epsilon: 0,
		delTau: 0,
		lamda: 0,
		nu0: 0,
		nu: 0,
		alpha: 0,
		delta: 0,
		h: 0,
		xi: 0,
		delAlpha: 0,
		deltaPrime: 0,
		alphaPrime: 0,
		hPrime: 0,
		e0: 0,
		delE: 0,
		e: 0,
		eot: 0,
		srha: 0,
		ssha: 0,
		sta: 0,
		zenith: 0,
		azimuthAstro: 0,
		azimuth: 0,
		incidence: 0,
		suntransit: 0,
		sunrise: 0,
		sunset: 0
	};
}
/**
* Validate SPA input values
* @returns 0 if valid, error code otherwise
*/
function validateInputs(spa) {
	if (spa.year < -2e3 || spa.year > 6e3) return 1;
	if (spa.month < 1 || spa.month > 12) return 2;
	if (spa.day < 1 || spa.day > 31) return 3;
	if (spa.hour < 0 || spa.hour > 24) return 4;
	if (spa.minute < 0 || spa.minute > 59) return 5;
	if (spa.second < 0 || spa.second >= 60) return 6;
	if (spa.pressure < 0 || spa.pressure > 5e3) return 12;
	if (spa.temperature <= -273 || spa.temperature > 6e3) return 13;
	if (spa.deltaUt1 <= -1 || spa.deltaUt1 >= 1) return 17;
	if (spa.hour === 24 && spa.minute > 0) return 5;
	if (spa.hour === 24 && spa.second > 0) return 6;
	if (Math.abs(spa.deltaT) > 8e3) return 7;
	if (Math.abs(spa.timezone) > 18) return 8;
	if (Math.abs(spa.longitude) > 180) return 9;
	if (Math.abs(spa.latitude) > 90) return 10;
	if (Math.abs(spa.atmosphericRefraction) > 5) return 16;
	if (spa.elevation < -65e5) return 11;
	return 0;
}
/**
* Calculate geocentric sun right ascension and declination
* This is a core calculation that's reused for RTS calculations
*/
function calculateGeocentricSunRaAndDec(spa) {
	spa.jc = julianCentury(spa.jd);
	spa.jde = julianEphemerisDay(spa.jd, spa.deltaT);
	spa.jce = julianEphemerisCentury(spa.jde);
	spa.jme = julianEphemerisMillennium(spa.jce);
	spa.l = earthHeliocentricLongitude(spa.jme);
	spa.b = earthHeliocentricLatitude(spa.jme);
	spa.r = earthRadiusVector(spa.jme);
	spa.theta = geocentricLongitude(spa.l);
	spa.beta = geocentricLatitude(spa.b);
	spa.x0 = meanElongationMoonSun(spa.jce);
	spa.x1 = meanAnomalySun(spa.jce);
	spa.x2 = meanAnomalyMoon(spa.jce);
	spa.x3 = argumentLatitudeMoon(spa.jce);
	spa.x4 = ascendingLongitudeMoon(spa.jce);
	const x = [
		spa.x0,
		spa.x1,
		spa.x2,
		spa.x3,
		spa.x4
	];
	const nutation = nutationLongitudeAndObliquity(spa.jce, x);
	spa.delPsi = nutation.delPsi;
	spa.delEpsilon = nutation.delEpsilon;
	spa.epsilon0 = eclipticMeanObliquity(spa.jme);
	spa.epsilon = eclipticTrueObliquity(spa.delEpsilon, spa.epsilon0);
	spa.delTau = aberrationCorrection(spa.r);
	spa.lamda = apparentSunLongitude(spa.theta, spa.delPsi, spa.delTau);
	spa.nu0 = greenwichMeanSiderealTime(spa.jd, spa.jc);
	spa.nu = greenwichSiderealTime(spa.nu0, spa.delPsi, spa.epsilon);
	spa.alpha = geocentricRightAscension(spa.lamda, spa.epsilon, spa.beta);
	spa.delta = geocentricDeclination(spa.beta, spa.epsilon, spa.lamda);
}
/**
* Helper function to calculate RA/Dec for a given Julian Day
* Used by RTS calculations
*/
function calculateRaDecForJd(jd, deltaT) {
	const jc = julianCentury(jd);
	const jce = julianEphemerisCentury(julianEphemerisDay(jd, deltaT));
	const jme = julianEphemerisMillennium(jce);
	const l = earthHeliocentricLongitude(jme);
	const b = earthHeliocentricLatitude(jme);
	const r = earthRadiusVector(jme);
	const theta = geocentricLongitude(l);
	const beta = geocentricLatitude(b);
	const nutation = nutationLongitudeAndObliquity(jce, [
		meanElongationMoonSun(jce),
		meanAnomalySun(jce),
		meanAnomalyMoon(jce),
		argumentLatitudeMoon(jce),
		ascendingLongitudeMoon(jce)
	]);
	const epsilon0 = eclipticMeanObliquity(jme);
	const epsilon = eclipticTrueObliquity(nutation.delEpsilon, epsilon0);
	const delTau = aberrationCorrection(r);
	const lamda = apparentSunLongitude(theta, nutation.delPsi, delTau);
	const nu = greenwichSiderealTime(greenwichMeanSiderealTime(jd, jc), nutation.delPsi, epsilon);
	return {
		alpha: geocentricRightAscension(lamda, epsilon, beta),
		delta: geocentricDeclination(beta, epsilon, lamda),
		nu
	};
}
/**
* Main SPA calculation function
* Calculates all solar position values based on input parameters
* 
* @param spa - SPA data object with input values filled in
* @returns 0 if successful, error code otherwise
*/
function spaCalculate(spa) {
	const result = validateInputs(spa);
	if (result !== 0) return result;
	spa.jd = julianDay(spa.year, spa.month, spa.day, spa.hour, spa.minute, spa.second, spa.deltaUt1, spa.timezone);
	calculateGeocentricSunRaAndDec(spa);
	spa.h = observerHourAngle(spa.nu, spa.longitude, spa.alpha);
	spa.xi = sunEquatorialHorizontalParallax(spa.r);
	const parallax = rightAscensionParallaxAndTopocentricDec(spa.latitude, spa.elevation, spa.xi, spa.h, spa.delta);
	spa.delAlpha = parallax.deltaAlpha;
	spa.deltaPrime = parallax.deltaPrime;
	spa.alphaPrime = topocentricRightAscension(spa.alpha, spa.delAlpha);
	spa.hPrime = topocentricLocalHourAngle(spa.h, spa.delAlpha);
	spa.e0 = topocentricElevationAngle(spa.latitude, spa.deltaPrime, spa.hPrime);
	spa.delE = atmosphericRefractionCorrection(spa.pressure, spa.temperature, spa.atmosphericRefraction, spa.e0);
	spa.e = topocentricElevationAngleCorrected(spa.e0, spa.delE);
	spa.zenith = topocentricZenithAngle(spa.e);
	spa.azimuthAstro = topocentricAzimuthAngleAstro(spa.hPrime, spa.latitude, spa.deltaPrime);
	spa.azimuth = topocentricAzimuthAngle(spa.azimuthAstro);
	if (spa.function === SpaFunction.SPA_ZA_INC || spa.function === SpaFunction.SPA_ALL) spa.incidence = surfaceIncidenceAngle(spa.zenith, spa.azimuthAstro, spa.azimuthRotation, spa.slope);
	if (spa.function === SpaFunction.SPA_ZA_RTS || spa.function === SpaFunction.SPA_ALL) {
		const rts = calculateEotAndSunRiseTransitSet(spa, calculateRaDecForJd);
		spa.sunrise = rts.sunrise;
		spa.suntransit = rts.suntransit;
		spa.sunset = rts.sunset;
		spa.srha = rts.srha;
		spa.ssha = rts.ssha;
		spa.sta = rts.sta;
		spa.eot = rts.eot;
	}
	return 0;
}
/**
* Initialize SPA data from a Date object and coordinates
*/
function initSpaFromDate(date, latitude, longitude, options = {}) {
	const spa = createSpaData();
	spa.year = date.getFullYear();
	spa.month = date.getMonth() + 1;
	spa.day = date.getDate();
	spa.hour = date.getHours();
	spa.minute = date.getMinutes();
	spa.second = date.getSeconds() + date.getMilliseconds() / 1e3;
	spa.timezone = -date.getTimezoneOffset() / 60;
	spa.latitude = latitude;
	spa.longitude = longitude;
	spa.elevation = options.elevation ?? 0;
	spa.pressure = options.pressure ?? 1013;
	spa.temperature = options.temperature ?? 15;
	spa.deltaUt1 = options.deltaUt1 ?? 0;
	spa.deltaT = options.deltaT ?? 67;
	spa.slope = options.slope ?? 0;
	spa.azimuthRotation = options.azimuthRotation ?? 0;
	spa.atmosphericRefraction = options.atmosphericRefraction ?? REFRACTION_CORRECTION;
	spa.function = SpaFunction.SPA_ALL;
	return spa;
}
/**
* Check if a sunrise/sunset time is valid (not polar day/night)
*/
function isValidSunTime(time) {
	return time !== INVALID_VALUE && isFinite(time) && time >= 0;
}

//#endregion
//#region src/index.ts
/**
* Get the sunrise time for a given location and date
* 
* @param latitude - Observer latitude in degrees (positive north)
* @param longitude - Observer longitude in degrees (positive east)
* @param date - Date for calculation (defaults to current date/time)
* @param options - Optional SPA calculation options
* @returns Date object representing sunrise time, or null if sun doesn't rise (polar night)
* 
* @example
* ```typescript
* const sunrise = getSunrise(51.5074, -0.1278); // London
* console.log(sunrise?.toLocaleTimeString());
* ```
*/
function getSunrise(latitude, longitude, date = /* @__PURE__ */ new Date(), options) {
	const spa = initSpaFromDate(date, latitude, longitude, options);
	if (spaCalculate(spa) !== 0 || !isValidSunTime(spa.sunrise)) return null;
	return fractionalHourToDate(date, spa.sunrise, spa.timezone);
}
/**
* Get the sunset time for a given location and date
* 
* @param latitude - Observer latitude in degrees (positive north)
* @param longitude - Observer longitude in degrees (positive east)
* @param date - Date for calculation (defaults to current date/time)
* @param options - Optional SPA calculation options
* @returns Date object representing sunset time, or null if sun doesn't set (polar day)
* 
* @example
* ```typescript
* const sunset = getSunset(51.5074, -0.1278); // London
* console.log(sunset?.toLocaleTimeString());
* ```
*/
function getSunset(latitude, longitude, date = /* @__PURE__ */ new Date(), options) {
	const spa = initSpaFromDate(date, latitude, longitude, options);
	if (spaCalculate(spa) !== 0 || !isValidSunTime(spa.sunset)) return null;
	return fractionalHourToDate(date, spa.sunset, spa.timezone);
}
/**
* Get the solar noon (sun transit) time for a given location and date
* 
* @param latitude - Observer latitude in degrees (positive north)
* @param longitude - Observer longitude in degrees (positive east)
* @param date - Date for calculation (defaults to current date/time)
* @param options - Optional SPA calculation options
* @returns Date object representing solar noon time, or null on calculation error
* 
* @example
* ```typescript
* const noon = getSolarNoon(51.5074, -0.1278); // London
* console.log(noon?.toLocaleTimeString());
* ```
*/
function getSolarNoon(latitude, longitude, date = /* @__PURE__ */ new Date(), options) {
	const spa = initSpaFromDate(date, latitude, longitude, options);
	if (spaCalculate(spa) !== 0 || !isValidSunTime(spa.suntransit)) return null;
	return fractionalHourToDate(date, spa.suntransit, spa.timezone);
}
/**
* Get the current solar position (zenith, azimuth, elevation, etc.)
* 
* @param latitude - Observer latitude in degrees (positive north)
* @param longitude - Observer longitude in degrees (positive east)
* @param date - Date for calculation (defaults to current date/time)
* @param options - Optional SPA calculation options
* @returns Solar position object with zenith, azimuth, elevation, etc.
* 
* @example
* ```typescript
* const position = getSolarPosition(51.5074, -0.1278);
* console.log(`Sun is at ${position.elevation}° elevation, ${position.azimuth}° azimuth`);
* ```
*/
function getSolarPosition(latitude, longitude, date = /* @__PURE__ */ new Date(), options) {
	const spa = initSpaFromDate(date, latitude, longitude, options);
	if (spaCalculate(spa) !== 0) return null;
	return {
		zenith: spa.zenith,
		azimuth: spa.azimuth,
		azimuthAstro: spa.azimuthAstro,
		elevation: spa.e,
		rightAscension: spa.alpha,
		declination: spa.delta,
		hourAngle: spa.h
	};
}
/**
* Get civil, nautical, and astronomical twilight times
* 
* Civil twilight: Sun is 6° below the horizon
* Nautical twilight: Sun is 12° below the horizon
* Astronomical twilight: Sun is 18° below the horizon
* 
* @param latitude - Observer latitude in degrees (positive north)
* @param longitude - Observer longitude in degrees (positive east)
* @param date - Date for calculation (defaults to current date/time)
* @param options - Optional SPA calculation options
* @returns Twilight times object, with null values for polar conditions
* 
* @example
* ```typescript
* const twilight = getTwilight(51.5074, -0.1278);
* console.log(`Civil dawn: ${twilight.civilDawn?.toLocaleTimeString()}`);
* console.log(`Civil dusk: ${twilight.civilDusk?.toLocaleTimeString()}`);
* ```
*/
function getTwilight(latitude, longitude, date = /* @__PURE__ */ new Date(), options) {
	const spa = initSpaFromDate(date, latitude, longitude, options);
	if (spaCalculate(spa) !== 0 || !isValidSunTime(spa.suntransit)) return null;
	const civil = calculateCustomZenithTimes(latitude, spa.delta, spa.suntransit, ZENITH_CIVIL_TWILIGHT);
	const nautical = calculateCustomZenithTimes(latitude, spa.delta, spa.suntransit, ZENITH_NAUTICAL_TWILIGHT);
	const astronomical = calculateCustomZenithTimes(latitude, spa.delta, spa.suntransit, ZENITH_ASTRONOMICAL_TWILIGHT);
	const toDate = (hours) => {
		if (hours === null || !isFinite(hours) || hours < 0 || hours > 24) return null;
		return fractionalHourToDate(date, hours, spa.timezone);
	};
	return {
		civilDawn: toDate(civil.sunrise),
		civilDusk: toDate(civil.sunset),
		nauticalDawn: toDate(nautical.sunrise),
		nauticalDusk: toDate(nautical.sunset),
		astronomicalDawn: toDate(astronomical.sunrise),
		astronomicalDusk: toDate(astronomical.sunset)
	};
}
/**
* Get all sun times for a given location and date in a single call
* More efficient than calling individual functions separately
* 
* @param latitude - Observer latitude in degrees (positive north)
* @param longitude - Observer longitude in degrees (positive east)
* @param date - Date for calculation (defaults to current date/time)
* @param options - Optional SPA calculation options
* @returns Object containing sunrise, sunset, solar noon, and twilight times
* 
* @example
* ```typescript
* const times = getSunTimes(51.5074, -0.1278);
* console.log(`Sunrise: ${times.sunrise?.toLocaleTimeString()}`);
* console.log(`Sunset: ${times.sunset?.toLocaleTimeString()}`);
* console.log(`Solar noon: ${times.solarNoon?.toLocaleTimeString()}`);
* ```
*/
function getSunTimes(latitude, longitude, date = /* @__PURE__ */ new Date(), options) {
	const spa = initSpaFromDate(date, latitude, longitude, options);
	if (spaCalculate(spa) !== 0) return {
		sunrise: null,
		sunset: null,
		solarNoon: null,
		twilight: null
	};
	const toDate = (hours) => {
		if (!isValidSunTime(hours)) return null;
		return fractionalHourToDate(date, hours, spa.timezone);
	};
	let twilight = null;
	if (isValidSunTime(spa.suntransit)) {
		const civil = calculateCustomZenithTimes(latitude, spa.delta, spa.suntransit, ZENITH_CIVIL_TWILIGHT);
		const nautical = calculateCustomZenithTimes(latitude, spa.delta, spa.suntransit, ZENITH_NAUTICAL_TWILIGHT);
		const astronomical = calculateCustomZenithTimes(latitude, spa.delta, spa.suntransit, ZENITH_ASTRONOMICAL_TWILIGHT);
		const twilightToDate = (hours) => {
			if (hours === null || !isFinite(hours) || hours < 0 || hours > 24) return null;
			return fractionalHourToDate(date, hours, spa.timezone);
		};
		twilight = {
			civilDawn: twilightToDate(civil.sunrise),
			civilDusk: twilightToDate(civil.sunset),
			nauticalDawn: twilightToDate(nautical.sunrise),
			nauticalDusk: twilightToDate(nautical.sunset),
			astronomicalDawn: twilightToDate(astronomical.sunrise),
			astronomicalDusk: twilightToDate(astronomical.sunset)
		};
	}
	return {
		sunrise: toDate(spa.sunrise),
		sunset: toDate(spa.sunset),
		solarNoon: toDate(spa.suntransit),
		twilight
	};
}

//#endregion
exports.getSolarNoon = getSolarNoon;
exports.getSolarPosition = getSolarPosition;
exports.getSunTimes = getSunTimes;
exports.getSunrise = getSunrise;
exports.getSunset = getSunset;
exports.getTwilight = getTwilight;
//# sourceMappingURL=index.cjs.map