export default async (): Promise<any> => ({
  preset: 'ts-jest',
  displayName: {
    name: '@phuture/sdk',
    color: 'greenBright',
  },
  verbose: true,
  setupFiles: ['dotenv/config'],
  testMatch: ['**/**/*.test.ts'],
  testEnvironment: 'node',
  detectOpenHandles: true,
  collectCoverage: true,
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  globalTeardown: '<rootDir>/src/tests/jest-globals-teardown.ts',
  forceExit: true,
  //   transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  transformIgnorePatterns: ['node_modules/(?!(@layerzerolabs/scan-client)/)'],
})
