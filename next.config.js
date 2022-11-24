/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');


const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};


const nextConfig = {
  reactStrictMode: true,
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
  sentry: {
    hideSourceMaps: true,
  },
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);


