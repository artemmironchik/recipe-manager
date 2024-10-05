module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'tsc',
    'import',
    'eslint-plugin-prettier'
  ],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'prettier',
    'airbnb',
    'airbnb-typescript',
  ],
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'tsc/config': [2, {
      configFile: 'tsconfig.json'
    }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/require-default-props': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': 'error',
    'semi': ['warn', 'always'],
    'max-len': ['warn', {
      code: 100,
      ignoreStrings: true,
      ignoreUrls: true,
    }],
    'no-restricted-imports': ['error', {
      name: 'lodash',
      message: 'Import individual methods from the Lodash module',
    }],
    'function-paren-newline': 1,
    'implicit-arrow-linebreak': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        paths: [
          'src',
          'node_modules',
        ],
      },
    },
  },
};
