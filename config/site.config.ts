/**
 * Centralized site, repository, and deployment configuration.
 * Update these values or the matching NEXT_PUBLIC_* environment variables when
 * migrating this site to a different GitHub Pages repository, domain, or Giscus setup.
 */

function normalizeBasePath(value: string): string {
  if (!value) return "";

  const trimmed = value.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "";
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

const repositoryOwner =
  process.env.NEXT_PUBLIC_SITE_REPOSITORY_OWNER ?? "openprinting";
const repositoryName =
  process.env.NEXT_PUBLIC_SITE_REPOSITORY_NAME ?? "openprinting.github.io";

const productionBasePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? `/${repositoryName}`,
);

const siteUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://openprinting.github.io",
);

export const siteConfig = {
  name: "OpenPrinting",
  title: "Openprinting - Openprinting",
  description:
    "OpenPrinting is dedicated to providing open-source printing solutions for Linux, Unix, and other operating systems. Explore drivers, tools, and resources to enhance your printing experience.",
  repository: {
    owner: repositoryOwner,
    name: repositoryName,
    slug: `${repositoryOwner}/${repositoryName}`,
  },
  deployment: {
    siteUrl,
    productionBasePath,
    productionAssetPrefix: productionBasePath ? `${productionBasePath}/` : "",
  },
  giscus: {
    repo:
      process.env.NEXT_PUBLIC_GISCUS_REPO ??
      "rudra-iitm/openprinting.github.io",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "R_kgDOOJ9tYQ",
    category:
      process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Blog Comments",
    categoryId:
      process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ??
      "DIC_kwDOOJ9tYc4C4B5V",
    mapping: process.env.NEXT_PUBLIC_GISCUS_MAPPING ?? "url",
    term:
      process.env.NEXT_PUBLIC_GISCUS_TERM ??
      "Welcome to OpenPrinting Blog",
  },
  links: {
    home: `${siteUrl}/`,
    cups: `${siteUrl}/cups/`,
    githubOrg: "https://github.com/OpenPrinting",
    legacyPrinters: "https://openprinting.org/printers",
    legacyDrivers: "https://openprinting.org/drivers",
    printerWorkingGroup: "https://www.pwg.org/ipp/",
    monthlyCallMinutes:
      "http://ftp.pwg.org/pub/pwg/liaison/openprinting/minutes/",
    mastodon: "https://ubuntu.social/tags/OpenPrinting",
    linkedin: "https://www.linkedin.com/company/openprinting/posts/",
    rssFeed: "/feed.xml",
  },
  assets: {
    logo: "/openprinting.png",
    boxLogo: "/OpenPrintingBox.png",
    contribute: "/contribute.png",
    cups: "/cups.png",
    ippEverywhere: "/ipp-everywhere.png",
    printer: "/printer.png",
    wslPrinting: "/wsl-printing-icon.png",
    pwg: "/pwg.png",
    gsoc: "/gsoc.jpeg",
    gsod: "/gsod.jpg",
    heroBackground: "/rotation_pantone.jpg",
    authorPlaceholder: "/authors/placeholder.jpg",
    driverlessHero: "/assets/images/ipp-everywhere.png",
  },
} as const;
