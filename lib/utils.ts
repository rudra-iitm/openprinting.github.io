import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const basePath = process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_VERCEL != '1' && process.env.VERCEL != '1' ? "/openprinting.github.io" : ""