import MiniSearch, { type SearchResult } from "minisearch";
import type { SearchDocument } from "./types";
import { basePath } from "../utils";

let miniSearch: MiniSearch<SearchDocument> | null = null;
let isInitialized = false;



async function initializeSearch(): Promise<MiniSearch<SearchDocument>> {
  if (isInitialized && miniSearch) return miniSearch;

  const response = await fetch(`${basePath}/search/static-index.json`);
  const data = await response.json();

  const documents: SearchDocument[] = data.documents;

  miniSearch = new MiniSearch<SearchDocument>({
    fields: ["title", "content", "headings"],
    storeFields: ["id", "title", "url", "snippet", "type", "source"],
    searchOptions: {
      boost: { title: 3, headings: 2 },
      fuzzy: 0.2,
    },
  });

  miniSearch.addAll(documents);

  isInitialized = true;

  return miniSearch;
}

export type SearchRuntimeResult = SearchResult;

export async function searchRuntime(
  query: string,
): Promise<SearchRuntimeResult[]> {
  if (!query.trim()) return [];

  const engine = await initializeSearch();

  return engine.search(query).slice(0, 8);
}
