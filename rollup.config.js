import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'SunriseSunsetJS',
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: [
      babel({
        babelHelpers: 'runtime',
        presets: [
          [
            '@babel/env',
            {
              targets: {
                node: 8,
              },
            },
          ],
        ],
      }),
      typescript({
        module: 'ES2015',
        lib: ['ES2018'],
        target: 'ES2015',
      }),
      copy({
        targets: [
          { src: 'src/index.d.ts', dest: 'dist/' },
        ]
      }),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'SunriseSunsetJS',
      file: 'dist/sunrise-sunset.js',
      format: 'iife',
      plugins: [
        terser({
          format: {
            comments: false,
          },
        }),
      ],
    },
    plugins: [
      babel({
        babelHelpers: 'builtin',
        presets: [
          [
            '@babel/env',
            {
              targets: {
                ie: 11,
              },
            },
          ],
        ],
      }),
      typescript({
        lib: ['ES2018'],
        target: 'ES5',
      }),
    ],
  }
];