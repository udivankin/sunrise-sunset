import { defineConfig } from 'rolldown';

export default defineConfig([
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      entryFileNames: 'index.js',
      format: 'esm',
      sourcemap: true,
    },
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      entryFileNames: 'index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
  },
]);
