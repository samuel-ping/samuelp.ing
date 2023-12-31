const colors = require('tailwindcss/colors');

// https://colorhunt.co/palette/88ab8eafc8adeee7daf2f1eb
module.exports = {
  content: ['./app/**/*.js', './components/**/*.js', './public/**/*.html'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,

      primaryBg: '#FFF8EB',
      secondaryBg: '#EEE7DA',
      text: colors.black,
      primarySmallTextBg: '#577A5D', // #577A5D
      primaryLargeText: '#709974',
      primary: '#88AA8D', // #88AA8D
      secondary: '#AEC8AC', // #AEC8AC
      accent: '#6FB7C6',
      accent2: '#FCBFB7',
    },
  },
};
