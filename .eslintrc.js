module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'no-array-constructor': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-eval': 'error',
    'no-useless-escape': 'error',
    'prefer-template': 'error',
    'no-param-reassign': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'no-duplicate-imports': 'error',
    'prefer-arrow-callback': 'error',
    'no-iterator': 'error',
    'no-undef': 'error',
    'no-multi-assign': 'error',
    'eqeqeq': 'error',
    'no-unneeded-ternary': 'error',
    'no-mixed-operators': 'error',
    'brace-style': 'warn',
    'space-before-blocks': 'warn',
    'object-curly-newline': 'error',
    'no-console': 'error',
    'eol-last': 'error',
    'array-bracket-spacing': 'warn',
    'comma-style': 'warn',
    'no-new-wrappers': 'error',
    'radix': 'warn',
    'id-length': 'error',
    'camelcase': 'error',
    'no-underscore-dangle': 'error',
    'quotes': [
      'error',
      'single',
      { 'avoidEscape': true, 'allowTemplateLiterals': true },
    ],
    'semi': ['error', 'always'],
    'no-var': 'error',
    'no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': 'next',
      },
    ],
  },
};
