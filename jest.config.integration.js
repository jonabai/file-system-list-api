const jestConfig = require('./jest.config');

module.exports = {
  ...jestConfig,
  collectCoverage: false,
  testMatch: ['**/adapters/**/*.test.ts'],
};
