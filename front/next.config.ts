import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/meet',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
