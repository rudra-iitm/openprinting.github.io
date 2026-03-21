import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { withBasePath } from "@/lib/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageSrc(src: string): string {
  if (/^https?:\/\//.test(src)) return src;

  const normalizedSrc = src.startsWith("../")
    ? src.replace(/^\.\.\//, "/")
    : src;

  return withBasePath(normalizedSrc);
}
