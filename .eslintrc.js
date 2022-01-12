module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/no-inferrable-types": ["off"],
    "max-len": ["off"],
    "semi": ["error"],
    "comma-dangle": ["error", "always-multiline"]
  },
  ignorePatterns: ['.eslintrc.js'],
};