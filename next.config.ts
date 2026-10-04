import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/projects", destination: "/startups", permanent: true }];
  },
};

export default nextConfig;
