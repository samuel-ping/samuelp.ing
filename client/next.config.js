const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  future: {
    webpack5: true,
  },
  // Fixes broken next export for next/image: https://github.com/vercel/next.js/issues/21079#issuecomment-898732036
  images: {
    domains: ['avatars.githubusercontent.com'],
    // domains: ['firebasestorage.googleapis.com'],
    loader: 'imgix',
    // loader: 'custom',
    // path: 'https://noop/',
    path: '',
    // path: '/',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
});
