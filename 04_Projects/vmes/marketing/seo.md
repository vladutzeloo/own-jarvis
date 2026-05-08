---
title: VMES — SEO
type: project
status: active
tags: [project, vmes, marketing, seo]
updated: 2026-05-08
---

# VMES — SEO

Organic search posture for vmes.ro. Where the site is strong, where it's leaking visibility, and the actions that move ranking-relevant signals.

The site's technical snapshot lives in [[04_Projects/vmes/site/_index]]. This file is *the audit and the plan*, not the technical inventory.

## Baseline (as of 2026-05-08)

Carried over from the existing snapshot in `site/_index.md`. A fresh re-audit is pending — see "How to re-audit" below — and must be run from Cowork because Claude Code on the web's sandbox blocks vmes.ro at egress (see [[02_Capabilities/runtime]]).

| Signal | State | Notes |
|---|---|---|
| Page count | 1 | Sitemap exposes only `/` |
| `<title>` | Present | "VMES — Virtual Manufacturing Execution System" |
| Meta description | Present | "Industrial analytics and real-time production monitoring with an engineering-grade interface." |
| OpenGraph (title/description/url) | Present | Confirmed |
| OG image | **Unconfirmed** | Re-audit must verify |
| Twitter Card tags | **Missing** | Adds preview-quality on X / LinkedIn |
| Schema.org JSON-LD | **Missing in static HTML** | SPA likely hydrates after load — invisible to most crawlers |
| Canonical link | **Unconfirmed** | Re-audit must verify |
| `hreflang` | **Missing / N/A** | Decision pending: monolingual or multilingual |
| `<html lang>` | `en` | On a `.ro` domain — see "Language strategy" below |
| robots.txt | Allows all, points to sitemap | Healthy |
| Sitemap | Present at `/sitemap.xml` | Single URL listed |
| Server-side rendering | **No** | Vite SPA mounted into `<div id="root">` — content invisible to non-JS crawlers |

## Gap analysis — prioritized

Three categories: **must-fix**, **should-fix**, **strategic**. The first two are mechanical. The third needs a decision.

### Must-fix

1. **Pre-rendered or server-rendered HTML.** Googlebot has rendered JS for years, but a SPA that returns an empty `<div id="root">` still costs indexing latency, degrades Core Web Vitals (specifically LCP — first paint of the empty shell can be fast, but the contentful paint waits on JS hydration), and is effectively invisible to non-rendering crawlers like social media unfurlers — LinkedIn, Slack, and X. Pre-render the home page (`vike`, `vite-plugin-prerender`, `react-snap`), switch to a meta-framework (Astro, Next.js, Remix), or add a build-time static export.
2. **JSON-LD `Organization` and `SoftwareApplication` schemas in the static HTML.** Both are well-supported by Google rich results. Without these, Google has to infer everything about VMES from prose. Inject them server-side or in `index.html` directly.
3. **OG image verified and at recommended dimensions** (1200×630, ≤ 5 MB, JPEG/PNG). The current OG presence flag in the baseline does not include image confirmation.

### Should-fix

4. **Twitter Card tags** (`twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`). Cheap, improves link previews on X and LinkedIn (which reads OG and falls back to Twitter Cards in some embedders).
5. **Canonical tag** on the home page, even when only one page exists. Future-proofs against UTM and tracking parameter duplication.
6. **`<meta name="robots" content="index, follow">`** explicitly. Belt-and-braces — relies less on default behavior.
7. **`hreflang` mapping** if multilingual is on the table. If not, leave it off — `hreflang` for a single language is noise.

### Strategic — needs a decision

8. **Language strategy.** Three options:
   - **Romanian only** — fits the `.ro` TLD, opens local SEO, narrows TAM to Romania-based buyers.
   - **English only (current)** — fits global reach, mismatches the TLD signal, potential confusion for Romanian-language searches.
   - **Bilingual** with `hreflang` and proper `lang` switches — best of both, costs ~2× the content effort.
9. **Page architecture.** Single page caps how much content Google can rank. At minimum: `/product`, `/pricing` (or `/contact-sales`), `/customers` (one case study counts), `/blog`. Even three real pages 10× the surface area for keyword targeting.
10. **Keyword targeting.** No keywords currently chosen. Until Vladimir picks 3-5 buying-intent terms (e.g. "manufacturing execution system", "factory analytics platform", "OEE dashboard software"), any content effort is unguided.

## How to re-audit

Run this prompt from **Cowork** (Claude Code on the web cannot fetch vmes.ro — see [[02_Capabilities/runtime]]):

> Fetch https://vmes.ro and https://vmes.ro/sitemap.xml. Extract: title, meta description, robots meta, canonical, all hreflang, html lang, all OG tags, all Twitter Card tags, all JSON-LD blocks (with @type values), theme-color, viewport, charset, any analytics scripts (GA, GTM, Plausible, Fathom), visible H1/H2 headings if present in static HTML, the primary CTA text, sitemap URL count and lastmod values. Mark each as PRESENT or MISSING. **Prepend** a date-stamped section to the "Audit history" section of `04_Projects/vmes/marketing/seo.md` (newest entry at the top of that section, keeping the existing entries below) with what changed since the last entry. If the page count grew, also update [[04_Projects/vmes/site/_index]].

Cadence: monthly, and after any deploy that changes `index.html`.

## Audit history

> Append-only. Most recent first.

### 2026-05-08 — initial baseline

Captured during vault setup. SPA structure confirmed, single page. SEO posture is *acceptable for a stub site* but capped by SPA + single-page architecture. Gaps listed above. Re-audit due 2026-06-08.

## Definition of done — first iteration

- Pre-rendered home page returns full HTML to a non-JS request.
- `Organization` and `SoftwareApplication` JSON-LD present in static HTML.
- Twitter Card tags present.
- Language strategy decided and `<html lang>` matches.
- Re-audit confirms the above and finds no new regressions.

## Related

- [[04_Projects/vmes/marketing/_index]]
- [[04_Projects/vmes/site/_index]] — technical state
- [[04_Projects/vmes/integrations/02-monitor-live-site]] — drift detection over time
- [[02_Capabilities/runtime]] — why audits run from Cowork, not Claude Code on the web
