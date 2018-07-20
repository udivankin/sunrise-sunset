import babel from 'rollup-plugin-babel';
import {
  uglify
} from 'rollup-plugin-uglify';

export default {
  moduleName: 'sunrise-sunset-js',
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'umd',
  plugins: [
    babel(),
    uglify()
  ],
};