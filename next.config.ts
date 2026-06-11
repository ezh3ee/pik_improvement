import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true,
  experimental: {
    serverSourceMaps: true,
  },
  images: {
    remotePatterns: [new URL("http://localhost/**")],
  },
};

export default nextConfig;
