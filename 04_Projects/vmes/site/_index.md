---
title: VMES — Marketing Site (vmes.ro)
type: project
status: active
tags: [project, vmes, site, marketing]
url: https://vmes.ro
updated: 2026-05-08
---

# VMES — Marketing Site (vmes.ro)

The public face of VMES. Currently a single-page React/Vite SPA.

## Snapshot — 2026-05-08

| Field | Value |
|---|---|
| URL | https://vmes.ro |
| Title | VMES — Virtual Manufacturing Execution System |
| Description | Industrial analytics and real-time production monitoring with an engineering-grade interface. |
| Stack | Vite + module bundle + single CSS bundle, mounted into `<div id="root">` |
| Pages | 1 (root only — sitemap confirms) |
| robots.txt | Allows everything, points to sitemap |
| OpenGraph | Title + description + URL set |
| Theme color | `#0a0a0a` (dark UI) |

## Page inventory

| Path | Status | Purpose |
|---|---|---|
| `/` | Live | Hero / pitch / contact / everything |

> Currently one page. As the site grows, add rows here.

## SEO baseline

- ✅ Meta description present
- ✅ OpenGraph tags present
- ✅ Sitemap exposed
- ✅ robots.txt allows crawling
- ❓ Twitter Card tags — not present (worth adding)
- ❓ Schema.org structured data — not visible in HTML (likely hydrated by JS — should add server-side or pre-render for SEO)
- ❓ Multilingual (`.ro` domain — Romanian audience? Currently `lang="en"`)

## Open questions

- Stay single-page, or expand to product / pricing / docs / blog / contact?
- Romanian + English, or English-only?
- Where does "request a demo" / "contact" lead today? (Couldn't tell from HTML — JS-rendered)

## Monitoring (planned)

See [[04_Projects/vmes/integrations/02-monitor-live-site]] for the scheduled task that will track this surface daily and append to `monitoring-log.md` here.

## Related

- [[04_Projects/vmes/_index]]
- [[04_Projects/vmes/integrations/02-monitor-live-site]]
- [[04_Projects/vmes/integrations/03-publish-vault-to-site]]
