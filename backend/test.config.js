module.exports = {
  testEnvironment: "node",
  testMatch: ["**/_tests_/**/*.js", "**/?(*.)+(spec|test).js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testTimeout: 30000,
};
