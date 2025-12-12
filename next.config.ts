import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: isProd ? "/openprinting.github.io" : "",
  assetPrefix: isProd ? "/openprinting.github.io/" : "",
  images: { unoptimized: true },
};

export default nextConfig;
