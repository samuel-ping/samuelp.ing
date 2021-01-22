const withPWA = require("next-pwa");

module.exports = withPWA({
  basePath: "/personal-website-v3",
  assetPrefix: "/personal-website-v3",
  target: "serverless",
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV !== "production",
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
});
