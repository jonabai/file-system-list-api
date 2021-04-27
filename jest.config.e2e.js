const jestConfig = require('./jest.config');

module.exports = {
  ...jestConfig,
  collectCoverage: false,
  testMatch: ['**/*.e2e.ts'],
  roots: ['<rootDir>/tests'],
  testTimeout: 20000,
};
