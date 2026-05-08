---
title: Track 3 — Publish Vault Content to vmes.ro
type: project
status: blocked
tags: [project, vmes, integration, publishing]
blockedBy: [repo-url, multi-page-decision]
updated: 2026-05-08
---

# Track 3 — Publish Vault Content to vmes.ro

Author docs, blog posts, or product pages in the vault. A pipeline pushes them to vmes.ro on commit.

## Why

The vault is already where Vladimir thinks. Publishing from it (instead of duplicating into the site repo) means: one source of truth, no copy-paste drift, and the act of publishing is just `git commit`.

## Architecture sketch

```
04_Projects/vmes/drafts/<post>.md
        │
        │ (git commit by Vladimir)
        ▼
GitHub repo (the vmes.ro repo)
        │
        │ (CI on push)
        ▼
build step: copy markdown → site, run static gen
        │
        ▼
deploy: vmes.ro
```

The vault already produces clean markdown with frontmatter. The site needs a build step that consumes it.

## What's needed

- **Repo URL** — to know what we're committing to
- **Decision: multi-page or stay single-page?** Currently vmes.ro is one page. Publishing only makes sense if there's a place to publish to (a `/blog`, `/docs`, `/changelog`, etc.).
- **Build pipeline** — depends on the site's stack. Vite + React: typically a content collection (e.g. Astro's content collections, Next.js MDX, or a simpler `vite-plugin-md` setup). For a React/Vite SPA: probably easiest to drop in a markdown loader and a routing change.
- **Convention for "publish-ready"** — only files in `04_Projects/vmes/drafts/` (or a new `04_Projects/vmes/published/` folder) should be picked up by the build, not the entire vault.

## Open decisions

- **Single-page or multi-page?** Affects everything downstream. Recommend deciding before any pipeline work.
- **What's the first thing to publish?** A changelog, a blog, product docs, customer case studies — pick one to design the pipeline around.

## Phase 1 (cheap)

- Add a `/blog` or `/changelog` route to vmes.ro
- Hand-import 1-2 markdown posts from the vault to validate the look
- Decide if it's worth the pipeline

## Phase 2 (full)

- CI step that watches `04_Projects/vmes/drafts/published/*.md`
- Auto-deploys on commit

## Definition of done

A markdown file in `04_Projects/vmes/drafts/` can be published to vmes.ro by adding `published: true` to frontmatter and committing — without any other manual step.

## Related

- [[04_Projects/vmes/repo/_index]]
- [[04_Projects/vmes/site/_index]]
- [[04_Projects/vmes/integrations/05-github-wiring]]
