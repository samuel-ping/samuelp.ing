const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  future: {
    webpack5: true,
  },
  // fixes broken next export during deployment
  images: {
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
