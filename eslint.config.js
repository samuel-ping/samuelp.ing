const nextConfig = require('eslint-config-next/core-web-vitals');
const tailwindcss = require('eslint-plugin-tailwindcss');
const prettier = require('eslint-config-prettier');

module.exports = [
  ...nextConfig,
  tailwindcss.configs.recommended,
  prettier,
  {
    settings: {
      tailwindcss: {
        cssConfigPath: 'app/styles/globals.css',
      },
    },
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
];
