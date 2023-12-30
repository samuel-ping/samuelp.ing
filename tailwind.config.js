const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./app/**/*.js', './components/**/*.js', './public/**/*.html'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      green: {
        10: '#f9fffb',
        50: '#d8f6e4',
        100: '#cef3dd',
        200: '#aae2c0',
        250: '#90dbae',
        300: '#6bc58f',
        400: '#358655',
        500: '#237242',
      },
    },
  },
};
