import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net", // Domain gambar dari Jikan API
      },
    ],
  },
};

export default nextConfig;
