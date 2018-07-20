import babel from 'rollup-plugin-babel';
import {
  uglify
} from 'rollup-plugin-uglify';

export default {
  moduleName: 'sunrise-sunset',
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'umd',
  plugins: [
    babel(),
    uglify({
      output: {
        comments: function (node, comment) {
          var text = comment.value;
          var type = comment.type;
          if (type == "comment2") {
            // multiline comment
            return /@preserve|@license|@cc_on/i.test(text);
          }
        }
      }
    })
  ],
};