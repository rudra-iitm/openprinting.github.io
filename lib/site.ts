import { siteConfig } from "@/config/site.config";

export const siteBasePath =
  process.env.NODE_ENV === "production"
    ? siteConfig.deployment.productionBasePath
    : "";

export function withBasePath(path: string): string {
  if (!path) return siteBasePath;
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}

export function toAbsoluteSiteUrl(path = ""): string {
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";

  return `${siteConfig.deployment.siteUrl}${normalizedPath}`;
}

export function getAuthorImageSrc(image?: string): string {
  const source =
    image && image !== "NA" ? image : siteConfig.assets.authorPlaceholder;
  return withBasePath(source);
}

export function getMentorImageSrc(image?: string): string | undefined {
  return image ? withBasePath(image) : undefined;
}
