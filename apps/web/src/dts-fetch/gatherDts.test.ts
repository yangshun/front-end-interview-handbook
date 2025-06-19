import { describe, expect, test } from '@jest/globals';

import { gatherDts } from './gatherDts';

describe('gatherDts', () => {
  test('types', () => {
    expect(
      gatherDts({
        name: '@types/jest',
        types: 'index.d.ts',
        version: '29.5.4',
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
        typings: './index.d.ts',
        version: '16.2.4',
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
          exports: {
            '.': {
              default: './fesm2022/core.mjs',
              esm: './esm2022/core.mjs',
              esm2022: './esm2022/core.mjs',
              types: './index.d.ts',
            },
            './package.json': {
              default: './package.json',
            },
            './rxjs-interop': {
              default: './fesm2022/rxjs-interop.mjs',
              esm: './esm2022/rxjs-interop/rxjs-interop.mjs',
              esm2022: './esm2022/rxjs-interop/rxjs-interop.mjs',
              types: './rxjs-interop/index.d.ts',
            },
            './schematics/*': {
              default: './schematics/*.js',
            },
            './testing': {
              default: './fesm2022/testing.mjs',
              esm: './esm2022/testing/testing.mjs',
              esm2022: './esm2022/testing/testing.mjs',
              types: './testing/index.d.ts',
            },
          },
          name: '@angular/core',
          typings: './index.d.ts',
          version: '16.2.4',
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
          exports: {
            '.': {
              types: './index.d.ts',
            },
            './package.json': './package.json',
          },
          name: '@types/jest',
          types: 'index.d.ts',
          version: '29.5.4',
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
          exports: {
            '.': {
              types: {
                default: './index.d.ts',
              },
            },
            './canary': {
              types: {
                default: './canary.d.ts',
              },
            },
            './client': {
              types: {
                default: './client.d.ts',
              },
            },
            './experimental': {
              types: {
                default: './experimental.d.ts',
              },
            },
            './package.json': './package.json',
            './server': {
              types: {
                default: './server.d.ts',
              },
            },
            './test-utils': {
              types: {
                default: './test-utils/index.d.ts',
              },
            },
          },
          name: '@types/react-dom',
          types: 'index.d.ts',
          version: '18.2.7',
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
          exports: {
            '.': {
              types: {
                default: './index.d.ts',
              },
              'types@<=5.0': {
                default: './ts5.0/index.d.ts',
              },
            },
            './canary': {
              types: {
                default: './canary.d.ts',
              },
              'types@<=5.0': {
                default: './ts5.0/canary.d.ts',
              },
            },
            './experimental': {
              types: {
                default: './experimental.d.ts',
              },
              'types@<=5.0': {
                default: './ts5.0/experimental.d.ts',
              },
            },
            './jsx-dev-runtime': {
              types: {
                default: './jsx-dev-runtime.d.ts',
              },
              'types@<=5.0': {
                default: './ts5.0/jsx-dev-runtime.d.ts',
              },
            },
            './jsx-runtime': {
              types: {
                default: './jsx-runtime.d.ts',
              },
              'types@<=5.0': {
                default: './ts5.0/jsx-runtime.d.ts',
              },
            },
            './package.json': './package.json',
          },
          name: '@types/jest',
          types: 'index.d.ts',
          version: '29.5.4',
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
          exports: {
            '.': {
              default: './dist/esm5/index.js',
              es2015: './dist/esm/index.js',
              node: './dist/cjs/index.js',
              require: './dist/cjs/index.js',
              types: './dist/types/index.d.ts',
            },
            './ajax': {
              default: './dist/esm5/ajax/index.js',
              es2015: './dist/esm/ajax/index.js',
              node: './dist/cjs/ajax/index.js',
              require: './dist/cjs/ajax/index.js',
              types: './dist/types/ajax/index.d.ts',
            },
            './fetch': {
              default: './dist/esm5/fetch/index.js',
              es2015: './dist/esm/fetch/index.js',
              node: './dist/cjs/fetch/index.js',
              require: './dist/cjs/fetch/index.js',
              types: './dist/types/fetch/index.d.ts',
            },
            './internal/*': {
              default: './dist/esm5/internal/*.js',
              es2015: './dist/esm/internal/*.js',
              node: './dist/cjs/internal/*.js',
              require: './dist/cjs/internal/*.js',
              types: './dist/types/internal/*.d.ts',
            },
            './operators': {
              default: './dist/esm5/operators/index.js',
              es2015: './dist/esm/operators/index.js',
              node: './dist/cjs/operators/index.js',
              require: './dist/cjs/operators/index.js',
              types: './dist/types/operators/index.d.ts',
            },
            './package.json': './package.json',
            './testing': {
              default: './dist/esm5/testing/index.js',
              es2015: './dist/esm/testing/index.js',
              node: './dist/cjs/testing/index.js',
              require: './dist/cjs/testing/index.js',
              types: './dist/types/testing/index.d.ts',
            },
            './webSocket': {
              default: './dist/esm5/webSocket/index.js',
              es2015: './dist/esm/webSocket/index.js',
              node: './dist/cjs/webSocket/index.js',
              require: './dist/cjs/webSocket/index.js',
              types: './dist/types/webSocket/index.d.ts',
            },
          },
          name: 'rxjs',
          types: 'index.d.ts',
          version: '7.8.1',
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
