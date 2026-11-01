import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Pages sent to people directly: a near-miss on the address still lands.
  async redirects() {
    return [
      { source: '/studios', destination: '/studio', permanent: true },
      { source: '/creator', destination: '/creators', permanent: true },
      { source: '/school', destination: '/schools', permanent: true },
      { source: '/colleges', destination: '/schools', permanent: true },
      { source: '/businesses', destination: '/business', permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
