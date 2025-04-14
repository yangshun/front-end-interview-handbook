import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['./src/index.ts'],
  format: ['esm'],
  dts: true,
  target: ['node18'],
});
