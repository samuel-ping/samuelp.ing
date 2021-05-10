module.exports = {
  future: {
    webpack5: true,
  },
  // fixes broken next export during deployment
  images: {
    loader: 'imgix',
    path: '',
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};
