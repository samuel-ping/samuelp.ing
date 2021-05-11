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
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
