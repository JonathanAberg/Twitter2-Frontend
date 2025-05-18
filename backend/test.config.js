process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret";

module.exports = {
  testEnvironment: "node",
  testMatch: ["**/_tests_/**/*.js", "**/?(*.)+(spec|test).js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testTimeout: 30000,
};
