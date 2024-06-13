module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./tests"],
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
