import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Recommended: only allow secure connections
        hostname: "**", // Wildcard to allow any hostname
        // Optional: you can also use a wildcard for the pathname if needed
        // pathname: '**',
      },
    ],
  },
};

export default nextConfig;
