module.exports = {
  extends: ['@gfe/eslint-config-gfe-core'],
  plugins: ['formatjs'],
  rules: {
    // Format.js.
    'formatjs/enforce-description': ['error', 'literal'],
    'formatjs/enforce-id': [
      'error',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
      },
    ],
    'formatjs/enforce-default-message': ['error', 'literal'],

    // Next.js
    '@next/next/no-img-element': 'off',

    // React.
    'react/button-has-type': 'error',
    'react/display-name': 'off',
    'react/destructuring-assignment': ['error', 'always'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
      },
    ],
    'react/hook-use-state': 'error',
    'react/no-array-index-key': 'error',
    'react/no-unescaped-entities': 'off',
    'react/void-dom-elements-no-children': 'error',

    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'ignore',
        reservedFirst: true,
      },
    ],
  },
};
