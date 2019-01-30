import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    name: 'SunriseSunsetJS',
    file: 'dist/sunrise-sunset.js',
    format: 'iife',
  },
  plugins: [
    babel(),
    terser()
  ],
};