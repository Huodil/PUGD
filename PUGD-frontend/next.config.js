/* eslint-disable no-undef */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  env: {
    MANGO_URI: "http://localhost:9000/graphql",
    SECRET: "egqrdherhdf654d6g453df654sf",
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
