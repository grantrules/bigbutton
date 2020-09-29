// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'node',
};
