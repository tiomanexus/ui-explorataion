import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ynvrs/ui", "@ynvrs/toolbar", "@ynvrs/data-client", "@ynvrs/design-tokens"],
};

export default nextConfig;
