import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageSrc(src: string): string {
  if (/^https?:\/\//.test(src)) return src;

  const basePath = process.env.NODE_ENV == "production" ? '/openprinting.github.io' : ""
  const normalizedSrc = src.startsWith("../")
    ? src.replace(/^\.\.\//, "/")
    : src;

  return `${basePath}${normalizedSrc.startsWith("/") ? normalizedSrc : `/${normalizedSrc}`}`;
}
