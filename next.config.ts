import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      { source: "/Apply", destination: "/apply", permanent: true },
      { source: "/application", destination: "/apply", permanent: true },
      { source: "/Application", destination: "/apply", permanent: true },
    ];
  },
};

export default nextConfig;
