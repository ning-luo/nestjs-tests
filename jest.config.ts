module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  projects: ['<rootDir>/test/jest-unit.json', '<rootDir>/test/jest-e2e.json'],
  setupFilesAfterEnv: ['<rootDir>/../test/setup-tests.ts'],
};
