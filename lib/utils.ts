import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { siteConfig } from "@/config/site.config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageSrc(src: string): string {
  if (/^https?:\/\//.test(src)) return src;

  const basePath = siteConfig.urls.basePath
  const normalizedSrc = src.startsWith("../")
    ? src.replace(/^\.\.\//, "/")
    : src;

  return `${basePath}${normalizedSrc.startsWith("/") ? normalizedSrc : `/${normalizedSrc}`}`;
}
