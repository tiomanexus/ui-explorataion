import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mnx/ui", "@mnx/toolbar", "@mnx/data-client", "@mnx/design-tokens"],
};

export default nextConfig;
