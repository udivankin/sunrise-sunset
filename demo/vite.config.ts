import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            'sunrise-sunset-js': resolve(__dirname, '../src/index.ts'),
        },
    },
});
