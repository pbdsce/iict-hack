import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'quadric.io' },
      { protocol: 'https', hostname: 'www.nvidia.com' },
      { protocol: 'https', hostname: 'www.acm.org' },
      { protocol: 'https', hostname: 'isoft.acm.org' },
      { protocol: 'https', hostname: 'pointblank.club' },
      { protocol: 'https', hostname: 'www.pointblank.club' },
      { protocol: 'https', hostname: 'www.pointblank.club' },
    ],
  },
};

export default nextConfig;
