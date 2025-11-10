export default [
  {
    files: ['**/*.{js,jsx}'], //only check .js files in server directory
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // ✅ enable JSX parsing
        },
      },
    },
    rules: {
      semi: 'error', //force semicolons
      'no-unused-vars': 'warn', //warn if variables are unused
    },
  },
];
