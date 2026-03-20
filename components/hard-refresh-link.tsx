import type { AnchorHTMLAttributes } from "react";
import { getBasePath } from "@/lib/utils";

type HardRefreshLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean;
};

function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function addTrailingSlash(pathname: string): string {
  if (pathname === "/" || pathname.endsWith("/") || /\.[^/]+$/.test(pathname)) {
    return pathname;
  }

  return `${pathname}/`;
}

function withBasePath(href: string): string {
  if (!href || isExternalHref(href) || href.startsWith("#")) {
    return href;
  }

  const basePath = getBasePath();

  if (!href.startsWith("/")) {
    return href;
  }

  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);

  if (!match) {
    return href;
  }

  const [, rawPath = "", query = "", hash = ""] = match;
  const pathname = addTrailingSlash(rawPath);

  if (!basePath) {
    return `${pathname}${query}${hash}`;
  }

  if (pathname === "/") {
    return `${basePath}/${query}${hash}`;
  }

  if (pathname === basePath || pathname.startsWith(`${basePath}/`)) {
    return `${pathname}${query}${hash}`;
  }

  return `${basePath}${pathname}${query}${hash}`;
}

export default function HardRefreshLink({
  href,
  prefetch,
  ...props
}: HardRefreshLinkProps) {
  void prefetch;
  return <a href={withBasePath(href)} {...props} />;
}
