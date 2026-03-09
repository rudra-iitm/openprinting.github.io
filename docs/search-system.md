### OpenPrinting Search System

### 1. Overview

The OpenPrinting website ships with a **client-side search system** that lets users search across blog posts, documentation, project pages, and other static content.  
There is **no backend search service**: all indexing happens at build time, and the browser loads a prebuilt JSON index and runs queries entirely on the client.

At a high level:
- **Build time**: a Node.js script walks the Markdown content, normalizes it, and writes a compact JSON index to `public/search/static-index.json`.
- **Runtime**: the browser fetches this JSON file and uses **MiniSearch** to provide fast full-text search with field boosts and fuzzy matching.

### 2. Architecture

The search system has two main parts:

- **Build-time index generator**
  - Runs in Node.js (via `scripts/search/build-index.ts`).
  - Reads Markdown files from the `contents/` tree.
  - Extracts frontmatter, headings, and normalized text from each document.
  - Produces an array of `SearchDocument` objects.
  - Writes a `StaticSearchIndex` JSON file (`public/search/static-index.json`).

- **Runtime search engine**
  - Runs in the browser (via `lib/search/runtime-search.ts`).
  - Fetches the static JSON index.
  - Initializes a MiniSearch instance with appropriate fields and boosts.
  - Answers queries by returning top results with titles, URLs, snippets, and content type information.

This separation keeps the runtime lightweight while allowing relatively heavy parsing and normalization to run once at build time.

### 3. File structure

Below are the key files involved in the search system and their responsibilities.

- **`scripts/search/build-index.ts`**
  - Entry point for building the static search index.
  - Calls `extractPosts()` and `extractContent()` to pull raw Markdown data from the `contents/` directory.
  - Uses `normalizeMarkdown()` to derive headings, plain-text content, and snippets.
  - Maps each raw item into a `SearchDocument` with:
    - A stable `id` in the form `<type>:<slug>`.
    - `source` set to `"static"`.
    - `type` set to the appropriate `StaticContentType` (e.g. `"post"`, `"documentation"`, `"project"`, `"page"`).
    - `title`, `url`, `headings`, `snippet`, and truncated `content`.
  - Aggregates all documents into a `StaticSearchIndex` object and writes it as JSON to `public/search/static-index.json`.
  - Updates `metadata.documentCount` and `metadata.contentTypes` based on the generated documents.

- **`scripts/search/extract-posts.ts`**
  - Defines the `RawPost` interface (`slug`, `frontmatter`, `content`).
  - Reads all `.md` files from `contents/post/`.
  - Uses `gray-matter` to parse frontmatter and body content for each file.
  - Returns an array of `RawPost` objects for use by the index builder.

- **`scripts/search/extract-content.ts`**
  - Defines which non-post content directories should be indexed and how they map to `StaticContentType`:
    - `contents/documentation/` → `"documentation"`
    - `contents/projects/` → `"project"`
    - `contents/pages/` → `"page"`
    - `contents/upcoming-technologies/` → `"page"`
  - Reuses the `RawPost` shape and extends it as `RawStaticContent` by adding a `type: StaticContentType` field.
  - For each directory:
    - Reads `.md` files.
    - Parses frontmatter and content via `gray-matter`.
    - Produces an array of `{ slug, frontmatter, content, type }` objects.
  - Consumed by `build-index.ts` to generate `SearchDocument`s for non-post content.

- **`scripts/search/normalize-markdown.ts`**
  - Provides the `normalizeMarkdown(markdown)` function that converts Markdown into:
    - `headings`: an array of heading texts (H1–H3).
    - `text`: a single normalized plain-text string suitable for full-text indexing.
    - `snippet`: a short summary string used for display in results.
  - Uses `remark-parse`, `unist-util-visit`, and `mdast-util-to-string` to traverse the Markdown AST.
  - Skips code blocks and inline code to keep the index focused on prose.
  - **Snippet generation**:
    - Uses `generateSnippet(text, maxLength = 180)` to take the first 180 characters.
    - Truncates at the last space before the limit and appends `"..."` to avoid cutting in the middle of words.
  - **Content truncation for performance**:
    - Defines `MAX_CONTENT_LENGTH = 1000`.
    - After building `normalizedText`, truncates it to at most 1000 characters.
    - Uses the same "find last space before limit, then append `...`" pattern to avoid mid-word cuts.
    - This truncated string is returned as the `text` field in `NormalizedMarkdown`.

- **`lib/search/runtime-search.ts`**
  - Implements the client-side search runtime using **MiniSearch**.
  - Lazily initializes a shared MiniSearch instance:
    - Computes a `basePath` depending on `NODE_ENV` so that the static index is correctly loaded in production (`/openprinting.github.io/search/static-index.json`) and in development (`/search/static-index.json`).
    - Fetches `static-index.json`, reads `data.documents` as an array of `SearchDocument`.
  - Creates `miniSearch = new MiniSearch<SearchDocument>({...})` with:
    - `fields: ["title", "content", "headings"]` — fields used for full-text search scoring.
    - `storeFields: ["id", "title", "url", "snippet", "type", "source"]` — fields kept in the in-memory index and returned in results.
    - `searchOptions`:
      - `boost: { title: 3, headings: 2 }` — boosts matches in titles and headings above body content.
      - `fuzzy: 0.2` — enables fuzzy matching to tolerate minor typos.
  - Exports:
    - `searchRuntime(query)` which:
      - Returns an empty array if the query is blank.
      - Initializes MiniSearch if needed.
      - Executes `engine.search(query)` and returns the top 8 results.
    - `SearchRuntimeResult` (MiniSearch’s `SearchResult` type).

- **`lib/search/types.ts`**
  - Declares core types shared between the build step and runtime:
    - `SearchSource` — `"static"` or `"foomatic"`.
    - `StaticContentType` — `"post" | "documentation" | "project" | "page"`.
    - `SearchDocument` — the normalized document structure stored in the JSON index and ingested by MiniSearch:
      - `id`, `source`, `type`, `title`, `url`, `headings`, `tags`, `snippet`, `content`.
    - `StaticSearchIndex` — wrapper type for the full static index:
      - `version`, `generatedAt`, `documents`, and `metadata` (document count and the set of content types).

- **`public/search/static-index.json`**
  - Build artifact produced by `scripts/search/build-index.ts`.
  - JSON representation of `StaticSearchIndex`:
    - Top-level metadata (`version`, `generatedAt`).
    - `documents` array of `SearchDocument`.
    - `metadata.documentCount` and `metadata.contentTypes`.
  - Served as a static asset and fetched by the browser at runtime.

### 4. How to rebuild the index

You can rebuild the static search index in two ways:

- **As part of the normal build**:

```bash
npm run build
```

The build pipeline should invoke the index builder so that `public/search/static-index.json` is regenerated alongside the rest of the site assets.

- **Manually from the command line**:

```bash
npx tsx scripts/search/build-index.ts
```

This runs the TypeScript build script directly with `tsx`, regenerating `public/search/static-index.json` based on the current contents of the `contents/` directory.

After rebuilding, commit the updated `public/search/static-index.json` if it is tracked in the repository.

### 5. How to add a new content type

To add a new content type to the search index (for example, `"news"`):

1. **Decide on a directory and type name**
   - Create or choose a directory under `contents/` to hold the new Markdown files, e.g. `contents/news/`.
   - Decide on the corresponding `StaticContentType` string (e.g. `"news"`). If it does not already exist, you will need to extend the `StaticContentType` union in `lib/search/types.ts`.

2. **Update `StaticContentType` (if needed)**
   - In `lib/search/types.ts`, add the new type to the `StaticContentType` union:

```ts
export type StaticContentType =
  | "post"
  | "documentation"
  | "project"
  | "page"
  | "news";
```

3. **Teach `extract-content` about the new directory**
   - In `scripts/search/extract-content.ts`, extend the `CONTENT_DIRS` map to include the new directory:

```ts
const CONTENT_DIRS: Record<string, StaticContentType> = {
  documentation: "documentation",
  projects: "project",
  pages: "page",
  "upcoming-technologies": "page",
  news: "news", // new mapping
};
```

   - This will cause `extractContent()` to read `.md` files from `contents/news/`, parse them, and return them with `type: "news"`.

4. **Define URL structure in `build-index`**
   - In `scripts/search/build-index.ts`, when mapping `RawStaticContent` into `SearchDocument`, ensure that the new type is assigned an appropriate URL pattern. For example:
     - `"/news/<slug>"` for content under `contents/news/`.
   - Follow the existing pattern used for `"documentation"`, `"project"`, and `"page"`.

5. **Rebuild the index**
   - Run either:

```bash
npm run build
```

   - or:

```bash
npx tsx scripts/search/build-index.ts
```

   - Confirm that:
     - Documents of the new type appear in `public/search/static-index.json`.
     - `metadata.contentTypes` includes the new type.

6. **Verify search behavior**
   - Start the dev server or open the built site.
   - Search for terms you know appear in the new content.
   - Ensure the results show up with correct titles, URLs, and type labels.

### 6. Performance decisions

The search index is shipped to every client as a single JSON file. Its size directly affects:
- **Initial load time** — the larger the file, the longer it takes to download.
- **Memory usage** — MiniSearch must hold the documents in memory.
- **Search latency** — more or larger documents can slow down indexing and querying.

To keep the index reasonably small and fast:
- The `normalizeMarkdown` step truncates the full-text `content` field to **1000 characters** (`MAX_CONTENT_LENGTH`).
- It uses the same safe truncation strategy as snippet generation:
  - Cut at the last space before the limit.
  - Append `"..."` to avoid mid-word breaks.
- The **snippet** remains at a separate **180-character** limit and is derived from the full normalized text.

This means:
- Search relevance is still good for typical content because titles, headings, and the first ~1000 characters usually contain the most important terms.
- The index size stays in a manageable range, reducing bundle size and improving client performance (both download time and in-memory MiniSearch index size).

If the index becomes too large in the future, contributors can further tune:
- Which directories are indexed.
- Which fields are included in `storeFields`.
- The maximum content length.

### 7. Search configuration

The runtime search configuration is defined in `lib/search/runtime-search.ts` when constructing the `MiniSearch` instance:

```ts
miniSearch = new MiniSearch<SearchDocument>({
  fields: ["title", "content", "headings"],
  storeFields: ["id", "title", "url", "snippet", "type", "source"],
  searchOptions: {
    boost: { title: 3, headings: 2 },
    fuzzy: 0.2,
  },
});
```

Key aspects:

- **Indexed fields (`fields`)**
  - `"title"` — heavily weighted for relevance; matching in titles is a strong signal.
  - `"content"` — main body text (truncated to 1000 chars).
  - `"headings"` — section headings within the document, also important for relevance.

- **Stored fields (`storeFields`)**
  - Only these fields are kept in the MiniSearch index and returned from queries:
    - `id`
    - `title`
    - `url`
    - `snippet`
    - `type`
    - `source`
  - This keeps the in-memory index smaller than storing every field.

- **Boost values**
  - `boost: { title: 3, headings: 2 }`
    - Matches in the `title` field get a **3× weight**.
    - Matches in `headings` get a **2× weight**.
    - Matches in `content` use the default weight (1×).
  - This ensures that documents with query terms in their titles or section headings rank higher than those where the terms only appear in the body.

- **Fuzzy matching**
  - `fuzzy: 0.2`
    - Enables fuzzy search, allowing results to match even when the query contains minor typos or letter transpositions.
    - The value `0.2` provides a moderate tolerance without making results too noisy.

- **Result limiting**
  - `searchRuntime(query)` returns `engine.search(query).slice(0, 8)`, limiting the result set to the top **8** matches.
  - This keeps the UI focused and reduces the amount of data passed to the frontend.

Contributors can adjust these settings (fields, boosts, fuzzy level, and result limit) to better match evolving content and UX requirements, but should keep in mind the trade-offs between recall, precision, and performance.

## 8. Extended Content Indexing

The original system indexed only blog posts from `contents/post/`.
This was extended to index all content types across the site.

### New Files
- `scripts/search/extract-content.ts` — generic extractor handling 
  documentation, projects, pages, and upcoming-technologies

### Content Coverage

| Directory | Type | Documents |
|---|---|---|
| `contents/post/` | `post` | 205 |
| `contents/pages/` | `page` | 31 |
| `contents/projects/` | `project` | 7 |
| `contents/documentation/` | `documentation` | 5 |
| **Total** | | **248** |

### Index Size Optimization

Content field truncated to 1000 chars in `normalize-markdown.ts`.

| Metric | Before | After |
|---|---|---|
| Index size | 1.7MB | 332KB |
| Reduction | — | 80% |