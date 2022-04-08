module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: false,
      jsx: true, // 启用 jsx
      impliedStrict: false,
      experimentalObjectRestSpread: false,
    },
  },
  plugins: ["react", "@typescript-eslint", "simple-import-sort"],
  rules: {
    "no-empty": 1,
    "comma-spacing": 1,
    "arrow-spacing": 1,
    "no-extra-boolean-cast": 1,
    "no-unreachable": 1,
    "no-unused-vars": 1,
    eqeqeq: 1,
    "no-multi-spaces": 1,
    "no-useless-return": 1,
    "no-duplicate-imports": 1,
    "no-var": 1,
    "prefer-const": 1,
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
