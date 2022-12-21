module.exports = {
  // plugins: ['react', 'prettier'],
  // parser: 'babel-eslint',
  // extends: ['airbnb', 'plugin:react/recommended', 'prettier'],
  // extends: 'plugin:@next/next/recommended',
  extends: [
    "next/core-web-vitals",
    "prettier"
  ],
  env: {
    // browser: true,
    // es6: true,
    // node: true,
  },
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   ecmaVersion: 12,
  //   sourceType: 'module',
  // },
  // settings: {
  //   react: {
  //     version: 'detect',
  //   },
  //   'import/resolver': {
  //     alias: {
  //       map: [
  //         ['@components', './src/components/'],
  //         ['@config', './src/config/'],
  //         ['@content', './src/content/'],
  //         ['@lib', './src/lib/'],
  //       ],
  //       extensions: ['.js'],
  //     },
  //   },
  // },
  rules: {
  //   'jsx-a11y/anchor-is-valid': [
  //     'error',
  //     {
  //       components: ['Link'],
  //       specialLink: ['hrefLeft', 'hrefRight'],
  //       aspects: ['invalidHref', 'preferButton'],
  //     },
  //   ],
  //   'prettier/prettier': 'warn',
  //   'react/react-in-jsx-scope': 'off',
  //   'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  //   'react/prop-types': 'off',
  //   'no-nested-ternary': 'off',
      '@next/next/no-img-element': 'off'
  },
};
