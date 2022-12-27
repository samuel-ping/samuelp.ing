// const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.js', './public/**/*.html'],
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
      // Custom Colors
      // Taken from Valspar and Coolors.co and mixed them around
      // Greens
      'vegas-green': '#407148',
      wilderness: '#476151',
      'dark-wilderness': '#2b4f39',
      'dark-spring-green': '#157145',
      'forest-green-crayola': '#57A773',
      'prickly-pear': '#798B74',
      'pistachio-ice-green': '#abc6a7',
      'ballroom-dancing': '#A9B4A5',
      'lazy-days': '#D0E4D8',
      'mint-hint': '#DFF2E1',
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
      // Yellows
      beehive: '#F9CC7F',
      corn: '#f4e666',
      'slaer-lemon': '#f7fe72',
      'pistachio-ice-yellow': '#C6C2A7',
      // Blues
      'quarry-pond': '#436379',
      'carolina-skies': '#B2CAD4',
      // Purples
      'pistachio-ice-purple': '#A7ABC6',
      // Pinks
      'pink-lace': '#F7D8E3',
      'pistachio-ice-pink': '#C2A7C6',
    },
    extend: {
      // tailwind-typography settings (unused at the moment)
      typography: {
        DEFAULT: {
          css: {},
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
});
