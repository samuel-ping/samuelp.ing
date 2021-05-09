const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  basePath: !debug ? '/personal-website-v3' : '',
  assetPrefix: !debug ? '/personal-website-v3' : '',
};
