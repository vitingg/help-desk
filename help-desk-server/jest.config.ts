import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  bail: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.spec.ts"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@repository/(.*)$": "<rootDir>/src/repository/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
  },
  roots: ["<rootDir>/src"],
};

export default config;
