module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-jest'],
  overrides: [
    {
      rules: {
        'max-len': [
          'error',
          {
            code: 100,
            ignoreUrls: true,
            ignoreStrings: true,
          },
        ],
      },
    },
  ],
};
