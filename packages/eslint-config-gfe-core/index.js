/* eslint-disable sort-keys-fix/sort-keys-fix */

const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'capitalized-comments': [
      WARN,
      'always',
      { ignoreConsecutiveComments: true },
    ],
    'consistent-this': ERROR,
    curly: ERROR,
    'dot-notation': ERROR,
    eqeqeq: [ERROR, 'smart'],
    'func-name-matching': ERROR,
    'func-names': [ERROR, 'as-needed'],
    'func-style': [ERROR, 'declaration', { allowArrowFunctions: true }],
    'guard-for-in': ERROR,
    'init-declarations': ERROR,
    'no-console': [ERROR, { allow: ['warn', 'error', 'info'] }],
    'no-else-return': [ERROR, { allowElseIf: false }],
    'no-extra-boolean-cast': ERROR,
    'no-lonely-if': ERROR,
    'no-shadow': ERROR,
    'no-unused-vars': OFF, // Use @typescript-eslint/no-unused-vars instead.
    'object-shorthand': ERROR,
    'one-var': [ERROR, 'never'],
    'operator-assignment': ERROR,
    'padding-line-between-statements': [
      WARN,
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
    'prefer-arrow-callback': ERROR,
    'prefer-const': ERROR,
    'prefer-destructuring': [
      ERROR,
      {
        object: true,
      },
    ],
    radix: ERROR,
    'spaced-comment': ERROR,

    // TypeScript.
    '@typescript-eslint/array-type': [
      ERROR,
      { default: 'generic', readonly: 'generic' },
    ],
    '@typescript-eslint/consistent-generic-constructors': [
      ERROR,
      'constructor',
    ],
    '@typescript-eslint/consistent-indexed-object-style': [ERROR, 'record'],
    '@typescript-eslint/consistent-type-definitions': [ERROR, 'type'],
    '@typescript-eslint/consistent-type-imports': ERROR,
    '@typescript-eslint/no-duplicate-enum-values': ERROR,
    '@typescript-eslint/no-for-in-array': ERROR,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,
    '@typescript-eslint/no-unused-vars': [WARN, { argsIgnorePattern: '^_' }],
    '@typescript-eslint/prefer-optional-chain': ERROR,
    '@typescript-eslint/require-array-sort-compare': ERROR,
    '@typescript-eslint/restrict-plus-operands': ERROR,
    '@typescript-eslint/sort-type-union-intersection-members': WARN,

    // Sorting
    'typescript-sort-keys/interface': WARN,
    'typescript-sort-keys/string-enum': WARN,
    'sort-keys-fix/sort-keys-fix': WARN,
    'simple-import-sort/exports': WARN,
    'simple-import-sort/imports': [
      WARN,
      {
        groups: [
          ['server-only'],
          // Ext library & side effect imports.
          ['^~?\\w', '^\\u0000'],
          // Lib and hooks.
          ['^~/lib', '^~/hooks'],
          // Static data.
          ['^~/data'],
          // Components.
          ['^~/components'],
          // Other imports.
          ['^~/'],
          // Relative paths up until 3 level.
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^~/types'],
          // {s}css files
          ['^.+\\.s?css$'],
          // Others that don't fit in.
          ['^'],
        ],
      },
    ],
  },
  globals: {
    React: true,
    JSX: true,
  },
};
