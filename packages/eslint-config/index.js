import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  js.configs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommended,
  {
    rules: {
      // TypeScript.
      '@typescript-eslint/array-type': [
        'error',
        { default: 'generic', readonly: 'generic' },
      ],
      '@typescript-eslint/consistent-generic-constructors': [
        'error',
        'constructor',
      ],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'warn',
        { allowTernary: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/sort-type-constituents': 'warn',
      '@typescript-eslint/require-await': 'off',
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'off', // TODO: Turn on in future when Turbo env var strict mode is used
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-interfaces': 'warn',
      'perfectionist/sort-enums': 'warn',
      'perfectionist/sort-exports': 'warn',
      'perfectionist/sort-imports': [
        'warn',
        {
          groups: [
            'server-only',
            'side-effect',
            'external',
            ['internal', 'tsconfig-path'],
            'internal-lib',
            'internal-hooks',
            'internal-data',
            'internal-components',
            'internal-general-alias',
            ['index', 'sibling', 'parent'],
            'internal-types-alias',
            'style',
            'unknown',
          ],
          customGroups: [
            {
              groupName: 'server-only',
              elementNamePattern: ['^server-only$'],
            },
            {
              groupName: 'internal-lib',
              elementNamePattern: ['^~/lib'],
            },
            {
              groupName: 'internal-hooks',
              elementNamePattern: ['^~/hooks'],
            },
            {
              groupName: 'internal-data',
              elementNamePattern: ['^~/data'],
            },
            {
              groupName: 'internal-components',
              elementNamePattern: ['^~/components'],
            },
            {
              groupName: 'internal-general-alias',
              elementNamePattern: ['^~/'],
            },
            {
              groupName: 'internal-types-alias',
              elementNamePattern: ['^~/types'],
            },
          ],
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
        },
      ],
    },
  },
  {
    rules: {
      'capitalized-comments': [
        'warn',
        'always',
        { ignoreConsecutiveComments: true },
      ],
      'consistent-this': 'error',
      curly: 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'func-name-matching': 'error',
      'func-names': ['error', 'as-needed'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'guard-for-in': 'error',
      'init-declarations': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-extra-boolean-cast': 'error',
      'no-lonely-if': 'error',
      'no-shadow': 'error',
      'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead.
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'operator-assignment': 'error',
      'padding-line-between-statements': [
        'warn',
        // Blank line after import.
        { blankLine: 'always', prev: '*', next: 'function' },
        // Blank line before function.
        { blankLine: 'always', prev: '*', next: 'function' },
        // Blank line before export.
        { blankLine: 'always', prev: '*', next: 'export' },
        // Any spacing between exports.
        { blankLine: 'any', prev: 'export', next: 'export' },
        // Blank line before return.
        { blankLine: 'always', prev: '*', next: 'return' },
        // Blank lines around variable declarations.
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        // Blank lines around directives.
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
      ],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': [
        'error',
        {
          object: true,
        },
      ],
      radix: 'error',
      'spaced-comment': 'error',
    },
  },
  {
    ignores: ['dist/**'],
  },
);
