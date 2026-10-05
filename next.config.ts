import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // dashboard uploads: photos are shrunk in the browser first, this is
    // headroom for several at once
    serverActions: { bodySizeLimit: "12mb" },
  },
  async redirects() {
    return [{ source: "/projects", destination: "/startups", permanent: true }];
  },
};

export default nextConfig;
