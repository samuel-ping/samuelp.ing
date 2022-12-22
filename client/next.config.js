/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/55605862*',
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
