module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
  },
};
