/* eslint-disable global-require, prefer-arrow-callback, func-names, no-param-reassign */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.js', './public/**/*.html'],
  theme: {
    extend: {
      // tailwind-typography settings (unused at the moment)
      typography: {
        DEFAULT: {
          css: {},
        },
      },
    },
  },
  plugins: [
    // For glass effect on Firefox (https://braydoncoyer.dev/blog/build-a-glassmorphic-navbar-with-tailwindcss-backdrop-filter-and-backdrop-blur)
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`,
          )}`;
        });
      });
    }),
    require('@tailwindcss/typography'),
  ],
};
