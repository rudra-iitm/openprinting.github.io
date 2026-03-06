import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isVercel = process.env.NEXT_PUBLIC_VERCEL == '1' || process.env.VERCEL == '1';

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: isProd && !isVercel ? "/openprinting.github.io" : "",
  assetPrefix: isProd && !isVercel ? "/openprinting.github.io/" : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
