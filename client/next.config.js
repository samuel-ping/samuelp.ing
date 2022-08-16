const { withPlaiceholder } = require('@plaiceholder/next');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

module.exports = withPlugins(
  [
    [withPlaiceholder],
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          disable: process.env.NODE_ENV === 'development',
        },
      },
    ],
  ],
  {
    future: {
      webpack5: true,
    },
    // Fixes broken next export for next/image: https://github.com/vercel/next.js/issues/21079
    images: {
      domains: ['avatars.githubusercontent.com'],
      loader: 'imgix',
      path: '',
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      });
      return config;
    },
  },
);
