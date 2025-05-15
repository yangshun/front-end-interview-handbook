import config from '@gfe/eslint-config';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
