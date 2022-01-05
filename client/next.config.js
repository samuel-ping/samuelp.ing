const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  future: {
    webpack5: true,
  },
  // Fixes broken next export for next/image: https://github.com/vercel/next.js/issues/21079#issuecomment-898732036
  // images: {
  //   loader: 'imgix',
  //   path: 'https://noop/',
  // },
  // images: {
  //   domains: ['assets.vercel.com'],
  //   formats: ['image/avif', 'image/webp'],
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
});
