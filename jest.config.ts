import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Explicitly specify the package
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["src/tests/**/*.test.tsx", "src/tests/**/*.test.ts"], // Or your test file pattern
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
