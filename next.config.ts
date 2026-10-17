import type { NextConfig } from "next";

const previewHosts = ["**.preview.emergentagent.com", "**.emergentagent.com", "**.preview.emergentcf.cloud"];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: previewHosts,
  experimental: {
    serverActions: {
      allowedOrigins: previewHosts,
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
