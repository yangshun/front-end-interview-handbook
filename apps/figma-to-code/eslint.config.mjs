import config from '@gfe/eslint-config';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ['src/styles/*.css.d.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
