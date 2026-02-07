import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverSourceMaps: true,
  },
  images: {
    remotePatterns: [
      new URL("https://tgjtxnazjau8wvz1.public.blob.vercel-storage.com/**"),
      new URL("http://localhost/**"),
    ],
  },
};

export default nextConfig;
