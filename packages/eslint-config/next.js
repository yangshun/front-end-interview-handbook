import pluginNext from '@next/eslint-plugin-next';

import reactConfig from './react.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default [
  ...reactConfig,
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off', // TODO: Buggy as of 14.2.15, see if can remove after upgrading to Next 15
      '@next/next/no-img-element': 'off',
    },
  },
];
