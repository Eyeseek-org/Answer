/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  silent: true, 
}

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  sentry: {
    hideSourceMaps: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wgdujpk9pprx.grandmoralis.com',
        port: '2053',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '2053',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '2053',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);



