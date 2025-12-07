module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  overrides: [
    {
      files: ["*.json", "*.md"],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off"
      }
    }
  ],
  rules: {
    "prettier/prettier": "error"
  }
};
