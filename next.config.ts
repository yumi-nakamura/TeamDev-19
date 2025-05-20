import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp',
      },
      {
        protocol: 'https',
        hostname: 'aoevtcajtrsagxxbwwwu.supabase.co',
      },
    ],
  },
};

export default nextConfig;
