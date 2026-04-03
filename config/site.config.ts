/**
 * site.config.ts — Centralized Site Configuration
 *
 * This file is the single source of truth for all deployment-specific,
 * repository-specific, and environment-dependent values.
 *
 * When migrating to a new repository or deployment environment, update
 * the values in this file. Do not scatter these values across the codebase.
 *
 * Values that may need updating on migration:
 *   - REPO_OWNER, REPO_NAME
 *   - BASE_URL, BASE_PATH, ASSET_PREFIX
 *   - GISCUS_* credentials
 *   - Any NEXT_PUBLIC_* values currently hardcoded
 */

export const siteConfig = {
  github: {
    owner: "rudra-iitm",
    repo: "openprinting.github.io",
    orgUrl: "https://github.com/openprinting",
  },
  urls: {
    // Used in RSS generation and absolute canonical URLs
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://openprinting.github.io",
    // Base path for Next.js and static assets
    basePath: process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "",
    cupsUrl: "https://openprinting.github.io/cups/",
  },
  giscus: {
    // these values come right from the Giscus setup component values
    repo: "rudra-iitm/openprinting.github.io" as `${string}/${string}`,
    repoId: "R_kgDOOJ9tYQ",         // Replace this if moving repos
    category: "Blog Comments",
    categoryId: "DIC_kwDOOJ9tYc4C4B5V", // Replace this if moving repos
  }
};
