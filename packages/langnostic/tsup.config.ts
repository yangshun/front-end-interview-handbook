import { defineConfig } from 'tsup';

const isDev = process.env.npm_lifecycle_event === 'dev';

export default defineConfig({
  clean: true,
  entry: ['./src/cli.ts', './src/index.ts'],
  format: ['esm'],
  minify: !isDev,
  target: 'esnext',
  dts: true,
  // onSuccess: isDev ? 'node dist/cli.js' : undefined,
});
