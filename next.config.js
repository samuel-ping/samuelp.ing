const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: { unoptimized: true },
  output: 'export',
};

module.exports = nextConfig;
