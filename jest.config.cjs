module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@bundled-es-modules|@mswjs|msw)/)',
  ],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.[jt]s?(x)'],
}
