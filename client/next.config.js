module.exports = {
  basePath: "/personal-website-v3",
  assetPrefix: "/personal-website-v3/",
  target: "serverless",
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};
