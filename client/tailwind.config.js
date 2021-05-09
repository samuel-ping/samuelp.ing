module.exports = {
  purge: {
    enabled: true,
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
  plugins: [],
};
