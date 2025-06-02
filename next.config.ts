import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        "hostname": "zic60k00s7.ufs.sh"
      }
    ]
  }

};

export default nextConfig;
