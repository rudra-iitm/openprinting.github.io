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
- `config/`: centralized site, deployment, and repository-specific configuration
- `contents/`: source content in Markdown
- `data/`: structured data for authors, GSOC/GSOD pages, summaries
- `lib/`: shared helpers for content loading, image path handling, site path/url resolution, search runtime
- `scripts/search/`: build-time search index generation
- `public/`: static assets and generated search index output

## Source Of Truth

Treat these as source files:

- `app/**`
- `components/**`
- `contents/**`
- `data/**`
- `config/**`
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
- Production build path settings come from [`config/site.config.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/config/site.config.ts). `next.config.ts` reads `productionBasePath` and `productionAssetPrefix` from that file, so repository or deployment moves should be handled there instead of inline.
- Search index generation runs in `prebuild` via `tsx scripts/search/build-index.ts`. Changes affecting content extraction, slugs, URLs, or searchable text often require regenerating `public/search/static-index.json`.
- A large part of the site is Markdown-driven. Review content pipeline changes for frontmatter assumptions, slug handling, excerpt/title sanitization, and image resolution.
- This repo uses Yarn as the expected package manager. Flag changes that introduce package-manager drift or inconsistent lockfile/package-manager usage unless the migration is intentional.
- Shared asset/url helpers now live in [`lib/site.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/lib/site.ts) and [`lib/utils.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/lib/utils.ts). Prefer `withBasePath`, `toAbsoluteSiteUrl`, `getAuthorImageSrc`, and `getImageSrc` over ad hoc path concatenation.

## Portability Rules

- Treat [`config/site.config.ts`](/Users/rudra/Desktop/workspace/openprinting/openprinting.github.io/config/site.config.ts) as the single source of truth for:
  - GitHub Pages base path and asset prefix
  - canonical site URL
  - repository slug and related GitHub links
  - Giscus repo/category configuration
  - repo- or deployment-specific external links that are reused across the UI
- When migrating this project to a new repository or deployment target, update `config/site.config.ts` or its `NEXT_PUBLIC_*` overrides first. Do not scatter new repository names, domains, base paths, or Giscus identifiers across route files or components.
- For static assets and internal fetches that must honor GitHub Pages subpaths, use the shared helpers instead of `process.env.NODE_ENV` checks in page/component files.
- If a change introduces a new repo-specific value, add it to the centralized config before using it elsewhere.

## Portability Checklist

- `next.config.ts` still derives `basePath`, `assetPrefix`, and exported env values from the centralized config.
- Components and routes do not hardcode repository slugs, site URLs, Giscus IDs, or production-only asset prefixes inline.
- Asset `src` values and fetch URLs continue to work both in local dev and under the configured production base path.
- Redirects, canonical metadata, and social/organization links still resolve correctly after config changes.

## Review Focus

### Routing and content loading

- Check that route params map to the right content directories.
- Watch for slug mismatches between file names, generated URLs, and redirects.
- For dynamic routes like `app/[...slug]`, `app/documentation/[doc]`, and `app/projects/[project]`, verify not-found and redirect behavior still makes sense for static export.

### Static export constraints

- Flag use of features that depend on request-time server execution unless the repo already supports them safely.
- Be suspicious of changes that assume root-relative assets without considering the production `basePath`.
- For images and links, prefer helpers already used by the repo such as `getImageSrc` and `withBasePath`.
- Check that asset `src` values are valid for both local development and production export. A change that appears to work locally but breaks under the production prefix should be treated as a bug.

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
- When adding repo-specific settings, extend `config/site.config.ts` and consume them via shared helpers instead of new inline constants.
