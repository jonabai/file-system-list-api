const jestConfig = require('./jest.config');

module.exports = {
  ...jestConfig,
  collectCoverage: false,
  testMatch: ['**/core/**/*.spec.ts'],
};
