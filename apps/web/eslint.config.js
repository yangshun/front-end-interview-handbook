import { config } from '@gfe/eslint-config/next';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ['src/supabase/database.types.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
