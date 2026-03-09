export type SearchSource = "static" | "foomatic";

export type StaticContentType =
  | "post"
  | "documentation"
  | "project"
  | "page";

export interface SearchDocument {
  id: string;
  source: SearchSource;
  type: StaticContentType;

  title: string;
  url: string;

  headings: string[];
  tags: string[];

  snippet: string;
  content: string;
}

export interface StaticSearchIndex {
  version: "1.0";
  documents: SearchDocument[];

  metadata: {
    documentCount: number;
    contentTypes: StaticContentType[];
  };
}
