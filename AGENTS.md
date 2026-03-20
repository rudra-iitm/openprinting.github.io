# AGENTS.md

## Purpose

This repository is the source for the OpenPrinting website. It is a Next.js App Router site that statically exports to GitHub Pages.

When reviewing changes in this repo, optimize for:

- behavioral regressions in page generation, routing, and content loading
- breakage specific to static export and GitHub Pages deployment
- content/rendering issues in Markdown-driven pages
- accidental edits to generated artifacts or vendored output

## Repository Map

- `app/`: route handlers and page entry points
- `components/`: shared UI, Markdown rendering, navigation, search UI
- `contents/`: source content in Markdown
- `data/`: structured data for authors, GSOC/GSOD pages, summaries
- `lib/`: shared helpers for content loading, image path handling, search runtime
- `scripts/search/`: build-time search index generation
- `public/`: static assets and generated search index output

## Source Of Truth

Treat these as source files:

- `app/**`
- `components/**`
- `contents/**`
- `data/**`
- `lib/**`
- `scripts/**`
- config files such as `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`

Treat these as generated or build output and review them only when the change explicitly requires regeneration:

- `.next/`
- `out/`
- `public/search/static-index.json`
- `node_modules/`

If a PR changes generated output without changing the inputs that produce it, call that out.

## Architecture Notes

- Static export is enabled in [`next.config.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/next.config.ts). `output: "export"` means features requiring a server runtime are risky by default.
- Production deployment settings are centralized in [`lib/site-config.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/lib/site-config.ts) and consumed by helpers such as [`lib/utils.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/lib/utils.ts). `basePath`, `assetPrefix`, site URL, repo identity, and Giscus settings are intended to derive from repository/env configuration rather than from hardcoded repo-specific values.
- Review changes for transferability between GitHub Pages repositories. Code should not assume this repo will always live at a fixed owner/name or fixed `basePath`.
- Search index generation runs in `prebuild` via `tsx scripts/search/build-index.ts`. Changes affecting content extraction, slugs, URLs, or searchable text often require regenerating `public/search/static-index.json`.
- A large part of the site is Markdown-driven. Review content pipeline changes for frontmatter assumptions, slug handling, excerpt/title sanitization, and image resolution.
- This repo uses Yarn as the expected package manager. Flag changes that introduce package-manager drift or inconsistent lockfile/package-manager usage unless the migration is intentional.

## Review Focus

### Routing and content loading

- Check that route params map to the right content directories.
- Watch for slug mismatches between file names, generated URLs, and redirects.
- For dynamic routes like `app/[...slug]`, `app/documentation/[doc]`, and `app/projects/[project]`, verify not-found and redirect behavior still makes sense for static export.

### Static export constraints

- Flag use of features that depend on request-time server execution unless the repo already supports them safely.
- Be suspicious of changes that assume root-relative assets without considering the configured production `basePath`.
- For images and links, prefer helpers already used by the repo such as `getImageSrc`, `getBasePath`, and shared values from `siteConfig`.
- Check that asset `src` values are valid for both local development and production export. A change that appears to work locally but breaks under the production prefix should be treated as a bug.
- Flag newly introduced hardcoded repo-specific values such as GitHub repository slugs, GitHub Pages hostnames, absolute site URLs, fixed Giscus repo/category identifiers, or literal `"/openprinting.github.io"` path prefixes when the same value should come from centralized config.

### Deployment portability

- Review changes to [`next.config.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/next.config.ts), [`lib/site-config.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/lib/site-config.ts), [`lib/utils.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/lib/utils.ts), and [`components/giscus-comment.tsx`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/components/giscus-comment.tsx) together when deployment, repo identity, absolute URLs, or comments integration are touched.
- Prefer centralized configuration over repeating deployment assumptions in components or routes.
- Treat reintroduction of hardcoded GitHub Pages repository names or owner-specific URLs as a maintainability bug unless the change explicitly documents why it must be fixed to one deployment target.

### UI and styling

- UI changes should follow the current visual theme of the site rather than introducing a disconnected style.
- Verify layouts remain responsive across common mobile and desktop widths.
- Confirm UI changes remain compatible with both light mode and dark mode, including text contrast, borders, icons, and code/content surfaces.

### Markdown rendering and content safety

- Review changes to [`components/markdown-renderer.tsx`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/components/markdown-renderer.tsx) carefully. It uses `rehype-raw`, so rendering changes can have broad effects on embedded HTML in content.
- Confirm frontmatter fields remain optional where the content corpus is inconsistent.
- Check that teaser images, author metadata, and reading time logic still degrade gracefully for older posts.

### Search

- Review `scripts/search/*`, `lib/search/*`, and `public/search/static-index.json` together.
- If URL generation or content extraction changes, verify the search index schema and document URLs remain consistent with the app routes.

### Content-heavy changes

- When reviewing bulk Markdown edits, prioritize broken links, malformed frontmatter, invalid image paths, and dates/slugs that affect sorting or routing.
- For post metadata, note that date parsing affects ordering in helpers such as [`lib/get-latest-posts.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/lib/get-latest-posts.ts).

## Validation Commands

Use the smallest relevant validation first, then escalate to a full build for routing/content pipeline changes.

```bash
yarn lint
yarn build
```

What each command validates here:

- `yarn lint`: code quality and some framework-level issues
- `yarn build`: static export viability and search index generation

There does not appear to be a dedicated test suite in this repo. If you cannot run a command, say so explicitly in the review.

## Review Output Expectations

When reviewing a change, lead with findings, not a summary. Prioritize:

1. broken routes or static export regressions
2. asset path and `basePath` mistakes
3. content parsing or Markdown rendering regressions
4. generated-file churn without corresponding source changes
5. missing validation for risky changes

If no issues are found, say that explicitly and mention any residual risk, especially when a full `npm run build` was not run.

## Editing Guidance For Agents

- Avoid editing generated directories unless the task explicitly requires regeneration.
- Do not overwrite user changes in generated artifacts to "clean up" the diff.
- If content or search behavior changes, mention whether `public/search/static-index.json` should be regenerated.
- Keep new code compatible with static export unless the task clearly changes deployment assumptions.
