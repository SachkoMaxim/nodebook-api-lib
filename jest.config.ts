import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
}

export default config
