import { type SearchResult, siteContent } from "./search-data"

export function searchSite(query: string): SearchResult[] {
  if (!query || query.trim() === "") {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()

  return siteContent.filter((item) => {
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.excerpt.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    )
  })
}

