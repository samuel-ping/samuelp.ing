/* eslint-disable global-require */
module.exports = {
  purge: {
    enabled: true, // without this, it purges all of my CSS D:
    layers: ['components', 'pages'],
    content: ['./pages/**/*.js', './components/**/*.js'],
    options: {
      safelist: {
        deep: [/prose$/],
      },
    },
  },
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
  plugins: [require('@tailwindcss/typography')],
};
