module.exports = {
  testEnvironment: "jsdom",
  transform: { "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest" },
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.tsx",
    "!src/reportWebVitals.ts",
    "!src/setupTests.ts",
    "!**/*-app-env.d.ts",
    "!**/node_modules/**",
    "!src/reduxStore/**/*.{js,jsx,ts,tsx}",
    "!src/common/types/*.{js,jsx,ts,tsx}"
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
