/* eslint-disable global-require, prefer-arrow-callback, func-names, no-param-reassign */
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.js', './public/**/*.html'],
  // purge: {
  //   enabled: true, // without this, it purges all of my CSS D:
  //   layers: ['components', 'pages'],
  //   content: ['./pages/**/*.js', './components/**/*.js'],
  //   options: {
  //     safelist: {
  //       deep: [/prose$/],
  //     },
  //   },
  // },
  darkMode: false, // or 'media' or 'class'
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
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
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
