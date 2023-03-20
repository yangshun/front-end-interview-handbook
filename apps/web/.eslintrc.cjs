module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    // Put gfe-core behind so that it can reset
    // some of the eslint-plugin-react configs
    // set by eslint-config-next which we don't want.
    '@gfe/eslint-config-gfe-apps',
  ],
  ignorePatterns: ['src/supabase/database.types.ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
