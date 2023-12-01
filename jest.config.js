/**
 * transformが必要なPure ESMのパッケージ。
 * @type {string[]}
 */
const ignorePackages = [
  "@masatomakino/tween.js-ticker",
  "@masatomakino/threejs-spherical-controls",
  "@masatomakino/threejs-drag-watcher",
];

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
  transformIgnorePatterns: [`node_modules/(?!(${ignorePackages.join("|")})/)`],
};

export default jestConfig;