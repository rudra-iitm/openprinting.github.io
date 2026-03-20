import type { NextConfig } from "next";
import { execSync } from "node:child_process";
import { getDeploymentConfig } from "./lib/site-config";

function getRepositoryFromGit(): string {
  try {
    const remoteUrl = execSync("git config --get remote.origin.url", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    return remoteUrl
      .replace(/\.git$/, "")
      .replace(/^https:\/\/github\.com\//, "")
      .replace(/^git@github\.com:/, "");
  } catch {
    return "";
  }
}

const deployment = getDeploymentConfig({
  ...process.env,
  GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY ?? getRepositoryFromGit(),
});

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: deployment.basePath,
  assetPrefix: deployment.assetPrefix,
  trailingSlash: false,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: deployment.basePath,
    NEXT_PUBLIC_SITE_REPOSITORY: deployment.repository,
    NEXT_PUBLIC_SITE_URL: deployment.siteUrl,
    NEXT_PUBLIC_SITE_HOME_URL: deployment.links.home,
    NEXT_PUBLIC_SITE_CUPS_URL: deployment.links.cups,
    NEXT_PUBLIC_SITE_FEED_URL: deployment.links.feed,
  },
};

export default nextConfig;
