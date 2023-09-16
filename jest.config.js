/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
  preset: "ts-jest",
  collectCoverageFrom: ["src/**/*.ts"],
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@masatomakino/threejs-spherical-controls)/)",
  ],
};

export default jestConfig;
