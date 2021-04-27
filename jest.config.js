module.exports = {
  collectCoverage: true,
  coverageThreshold: { global: { branches: 90, functions: 90, lines: 90, statements: 90 } },
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  setupFilesAfterEnv: ['jest-extended'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts', '**/*.e2e.ts'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  testEnvironment: 'node',
};
