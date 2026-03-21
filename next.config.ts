import type { NextConfig } from "next";
import { siteConfig } from "./config/site.config";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? siteConfig.deployment.productionBasePath : "";
const assetPrefix = isProd
  ? siteConfig.deployment.productionAssetPrefix
  : "";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath,
  assetPrefix,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
