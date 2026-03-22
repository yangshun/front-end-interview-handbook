import { defineConfig } from 'vite-plus';

const generatedIgnores = [
  'website/.docusaurus/**',
  'website/build/**',
  '.langnostic/**',
  'dist/**',
  'coverage/**',
];

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    ignorePatterns: generatedIgnores,
    options: {
      typeAware: false,
      typeCheck: false,
    },
  },
  fmt: {
    bracketSameLine: true,
    printWidth: 80,
    proseWrap: 'never',
    singleQuote: true,
    trailingComma: 'all',
    sortPackageJson: false,
    ignorePatterns: generatedIgnores,
  },
  test: {
    passWithNoTests: true,
  },
  run: {
    tasks: {
      dev: {
        command: 'vp run website#dev',
        cache: false,
      },
      start: {
        command: 'vp run website#start',
        cache: false,
      },
      build: {
        command: 'vp run website#build',
      },
      deploy: {
        command: 'vp run website#deploy',
        dependsOn: ['build'],
        cache: false,
      },
      i18n: {
        command: 'vp exec langnostic translate',
        cache: false,
      },
    },
  },
});
