const ignoreDirs = ['dist/', 'node_modules/', 'scripts/'];

/** @type {Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: false,
  silent: true,
  transform: {
    '^.+\\.[t]sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ignoreDirs,
  coveragePathIgnorePatterns: ignoreDirs,
  coverageDirectory: '<rootDir>/coverage/',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
