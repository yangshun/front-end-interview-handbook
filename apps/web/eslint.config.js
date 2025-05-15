import { config } from '@gfe/eslint-config/next';
import formatjs from 'eslint-plugin-formatjs';

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
  {
    plugins: {
      formatjs,
    },
    rules: {
      'formatjs/enforce-description': ['error', 'literal'],
      'formatjs/enforce-id': [
        'error',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
        },
      ],
      'formatjs/enforce-default-message': ['error', 'literal'],
    },
  },
];
