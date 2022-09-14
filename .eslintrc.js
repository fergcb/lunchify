module.exports = {
  extends: ['react-app'],
  overrides: [
    {
      files: ['**/*.ts?(x)', '**/*.js?(x)'],
      extends: ['standard-with-typescript'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
      },
    },
  ],
}
