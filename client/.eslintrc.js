module.exports = {
  plugins: ['react', 'prettier'],
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:react/recommended', 'prettier'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['@components', './src/components/'],
          ['@config', './src/config/'],
          ['@content', './src/content/'],
          ['@lib', './src/lib/'],
        ],
        extensions: ['.js'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'no-nested-ternary': 'off',
  },
};
