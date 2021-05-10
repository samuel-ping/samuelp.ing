module.exports = {
  purge: {
    enabled: true, // without this, it purges all of my CSS D:
    layers: ['components', 'pages'],
    content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
