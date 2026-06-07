const nextConfig = require('eslint-config-next/core-web-vitals');
const tailwindcss = require('eslint-plugin-tailwindcss');
const prettier = require('eslint-config-prettier');

module.exports = [
  ...nextConfig,
  ...tailwindcss.configs['flat/recommended'],
  prettier,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
];
