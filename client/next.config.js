const withPWA = require("next-pwa");

const debug = process.env.NODE_ENV !== "production";

module.exports = withPWA({
  basePath: !debug ? "/personal-website-v3" : "",
  assetPrefix: !debug ? "/personal-website-v3" : "",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/about",
  //       permanent: true,
  //     },
  //   ];
  // },
  target: "serverless",
  pwa: {
    dest: "public",
    disable: debug,
  },
  webpack: function (config) {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: "raw-loader",
      },
      {
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ["@svgr/webpack"],
      }
    );
    return config;
  },
});
