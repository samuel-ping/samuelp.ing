const { withPlaiceholder } = require('@plaiceholder/next');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([[withPlaiceholder]], {
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
});
