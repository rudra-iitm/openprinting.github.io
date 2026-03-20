import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/site-config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? siteConfig.deployment.basePath;
}

export function getImageSrc(src: string): string {
  if (/^https?:\/\//.test(src)) return src;

  const basePath = getBasePath();
  const normalizedSrc = src.startsWith("../")
    ? src.replace(/^\.\.\//, "/")
    : src;

  return `${basePath}${normalizedSrc.startsWith("/") ? normalizedSrc : `/${normalizedSrc}`}`;
}
