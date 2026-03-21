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

function hasFileExtension(pathname: string): boolean {
  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "";
  return lastSegment.includes(".");
}

export function normalizeInternalHref(href: string): string {
  if (
    !href ||
    /^([a-z]+:)?\/\//i.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  const pathname = match?.[1] || href;
  const search = match?.[2] || "";
  const hash = match?.[3] || "";

  const normalizedPathname = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`;

  const pathWithBase = normalizedPathname.startsWith(`${siteBasePath}/`) ||
    normalizedPathname === siteBasePath ||
    !siteBasePath
    ? normalizedPathname
    : withBasePath(normalizedPathname);

  const needsTrailingSlash =
    pathWithBase !== "/" &&
    !pathWithBase.endsWith("/") &&
    !hasFileExtension(pathWithBase);

  return `${needsTrailingSlash ? `${pathWithBase}/` : pathWithBase}${search}${hash}`;
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
