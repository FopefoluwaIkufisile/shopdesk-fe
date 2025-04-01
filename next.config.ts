import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        pathname: "/**",
        hostname: "api.timbu.cloud",
      },
    ],
  },
};

export default nextConfig;
