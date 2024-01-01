const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./app/**/*.js', './components/**/*.js', './public/**/*.html'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      beige: {
        100: '#FFF8EB',
        200: '#EEE7DA',
        300: '#d4d6c6',
        400: '#D6C39A',
      },
      green: {
        50: '#D1FFD1',
        100: '#9aaa68',
        200: '#AEC8AC',
        300: '#709974',
        400: '#577A5D',
        500: '#375954',
        600: '#28413d',
        700: '#233835',
      },
    },
  },
};
