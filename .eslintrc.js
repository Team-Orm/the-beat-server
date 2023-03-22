module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["google", "plugin:prettier/recommended"],
  overrides: [],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    createDefaultProgram: true,
  },
  rules: {
    "new-cap": "off",
    "require-jsdoc": "off",
  },
  ignorePatterns: ["!.eslintrc.js", "!.prettierrc.json"],
};
