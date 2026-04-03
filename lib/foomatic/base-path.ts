export function getBasePath() {
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  if (configuredBasePath) {
    return configuredBasePath
  }

  if (
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/openprinting.github.io")
  ) {
    return "/openprinting.github.io"
  }

  return ""
}

export function withBasePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${getBasePath()}${normalizedPath}`
}
