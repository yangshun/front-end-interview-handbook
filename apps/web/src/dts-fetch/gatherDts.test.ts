import { describe, expect, test } from '@jest/globals';
import { gatherDts } from './gatherDts';

describe('gatherDts', () => {
  test('types', () => {
    expect(
      gatherDts({
        name: '@types/jest',
        version: '29.5.4',
        types: 'index.d.ts',
      }),
    ).toMatchInlineSnapshot(`
      {
        ".": "index.d.ts",
      }
    `);
  });

  test('typings', () => {
    expect(
      gatherDts({
        name: '@angular/core',
        version: '16.2.4',
        typings: './index.d.ts',
      }),
    ).toMatchInlineSnapshot(`
      {
        ".": "./index.d.ts",
      }
    `);
  });

  describe('exports', () => {
    test('entry object within submodule', () => {
      expect(
        gatherDts({
          name: '@angular/core',
          version: '16.2.4',
          typings: './index.d.ts',
          exports: {
            './schematics/*': {
              default: './schematics/*.js',
            },
            './package.json': {
              default: './package.json',
            },
            '.': {
              types: './index.d.ts',
              esm2022: './esm2022/core.mjs',
              esm: './esm2022/core.mjs',
              default: './fesm2022/core.mjs',
            },
            './rxjs-interop': {
              types: './rxjs-interop/index.d.ts',
              esm2022: './esm2022/rxjs-interop/rxjs-interop.mjs',
              esm: './esm2022/rxjs-interop/rxjs-interop.mjs',
              default: './fesm2022/rxjs-interop.mjs',
            },
            './testing': {
              types: './testing/index.d.ts',
              esm2022: './esm2022/testing/testing.mjs',
              esm: './esm2022/testing/testing.mjs',
              default: './fesm2022/testing.mjs',
            },
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          ".": "./index.d.ts",
          "./rxjs-interop": "./rxjs-interop/index.d.ts",
          "./testing": "./testing/index.d.ts",
        }
      `);
    });

    test('submodule', () => {
      expect(
        gatherDts({
          name: '@types/jest',
          version: '29.5.4',
          types: 'index.d.ts',
          exports: {
            '.': {
              types: './index.d.ts',
            },
            './package.json': './package.json',
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          ".": "./index.d.ts",
        }
      `);
    });

    test('entry object within entry object', () => {
      expect(
        gatherDts({
          name: '@types/react-dom',
          version: '18.2.7',
          types: 'index.d.ts',
          exports: {
            '.': {
              types: {
                default: './index.d.ts',
              },
            },
            './client': {
              types: {
                default: './client.d.ts',
              },
            },
            './canary': {
              types: {
                default: './canary.d.ts',
              },
            },
            './server': {
              types: {
                default: './server.d.ts',
              },
            },
            './experimental': {
              types: {
                default: './experimental.d.ts',
              },
            },
            './test-utils': {
              types: {
                default: './test-utils/index.d.ts',
              },
            },
            './package.json': './package.json',
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          ".": "./index.d.ts",
          "./canary": "./canary.d.ts",
          "./client": "./client.d.ts",
          "./experimental": "./experimental.d.ts",
          "./server": "./server.d.ts",
          "./test-utils": "./test-utils/index.d.ts",
        }
      `);
    });

    test('with TypeScript-specific types', () => {
      expect(
        gatherDts({
          name: '@types/jest',
          version: '29.5.4',
          types: 'index.d.ts',
          exports: {
            '.': {
              'types@<=5.0': {
                default: './ts5.0/index.d.ts',
              },
              types: {
                default: './index.d.ts',
              },
            },
            './canary': {
              'types@<=5.0': {
                default: './ts5.0/canary.d.ts',
              },
              types: {
                default: './canary.d.ts',
              },
            },
            './experimental': {
              'types@<=5.0': {
                default: './ts5.0/experimental.d.ts',
              },
              types: {
                default: './experimental.d.ts',
              },
            },
            './jsx-runtime': {
              'types@<=5.0': {
                default: './ts5.0/jsx-runtime.d.ts',
              },
              types: {
                default: './jsx-runtime.d.ts',
              },
            },
            './jsx-dev-runtime': {
              'types@<=5.0': {
                default: './ts5.0/jsx-dev-runtime.d.ts',
              },
              types: {
                default: './jsx-dev-runtime.d.ts',
              },
            },
            './package.json': './package.json',
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          ".": "./index.d.ts",
          "./canary": "./canary.d.ts",
          "./experimental": "./experimental.d.ts",
          "./jsx-dev-runtime": "./jsx-dev-runtime.d.ts",
          "./jsx-runtime": "./jsx-runtime.d.ts",
        }
      `);
    });

    test('contains wildcard entries', () => {
      expect(
        gatherDts({
          name: 'rxjs',
          version: '7.8.1',
          types: 'index.d.ts',
          exports: {
            '.': {
              types: './dist/types/index.d.ts',
              node: './dist/cjs/index.js',
              require: './dist/cjs/index.js',
              es2015: './dist/esm/index.js',
              default: './dist/esm5/index.js',
            },
            './ajax': {
              types: './dist/types/ajax/index.d.ts',
              node: './dist/cjs/ajax/index.js',
              require: './dist/cjs/ajax/index.js',
              es2015: './dist/esm/ajax/index.js',
              default: './dist/esm5/ajax/index.js',
            },
            './fetch': {
              types: './dist/types/fetch/index.d.ts',
              node: './dist/cjs/fetch/index.js',
              require: './dist/cjs/fetch/index.js',
              es2015: './dist/esm/fetch/index.js',
              default: './dist/esm5/fetch/index.js',
            },
            './operators': {
              types: './dist/types/operators/index.d.ts',
              node: './dist/cjs/operators/index.js',
              require: './dist/cjs/operators/index.js',
              es2015: './dist/esm/operators/index.js',
              default: './dist/esm5/operators/index.js',
            },
            './testing': {
              types: './dist/types/testing/index.d.ts',
              node: './dist/cjs/testing/index.js',
              require: './dist/cjs/testing/index.js',
              es2015: './dist/esm/testing/index.js',
              default: './dist/esm5/testing/index.js',
            },
            './webSocket': {
              types: './dist/types/webSocket/index.d.ts',
              node: './dist/cjs/webSocket/index.js',
              require: './dist/cjs/webSocket/index.js',
              es2015: './dist/esm/webSocket/index.js',
              default: './dist/esm5/webSocket/index.js',
            },
            './internal/*': {
              types: './dist/types/internal/*.d.ts',
              node: './dist/cjs/internal/*.js',
              require: './dist/cjs/internal/*.js',
              es2015: './dist/esm/internal/*.js',
              default: './dist/esm5/internal/*.js',
            },
            './package.json': './package.json',
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          ".": "./dist/types/index.d.ts",
          "./ajax": "./dist/types/ajax/index.d.ts",
          "./fetch": "./dist/types/fetch/index.d.ts",
          "./operators": "./dist/types/operators/index.d.ts",
          "./testing": "./dist/types/testing/index.d.ts",
          "./webSocket": "./dist/types/webSocket/index.d.ts",
        }
      `);
    });
  });
});
