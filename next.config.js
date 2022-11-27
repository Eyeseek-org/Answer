/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wgdujpk9pprx.grandmoralis.com',
        port: '2053',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;


