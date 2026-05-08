---
title: Project — VMES
type: project
status: active
tags: [project, active, vmes, product]
goal: ladder-up to be defined in 01_Identity/goals
domains: [vmes.ro, crm.vmes.ro]
updated: 2026-05-08
---

# Project — VMES

Virtual Manufacturing Execution System. Industrial analytics and real-time production monitoring with an engineering-grade interface. Vladimir owns it and ships it.

## Surfaces

| Surface | URL | Status | Detail |
|---|---|---|---|
| Marketing site | https://vmes.ro | Live (single page React/Vite SPA) | [[04_Projects/vmes/site/_index]] |
| CRM | https://crm.vmes.ro | **Cert invalid** — `ERR_CERT_AUTHORITY_INVALID` | [[04_Projects/vmes/crm/_index]] |
| Source repo | _GitHub — URL pending_ | _to capture_ | [[04_Projects/vmes/repo/_index]] |

## Outcome

> Define what "VMES is in a great state" looks like. First pass below — refine.

VMES has a clear public story (marketing site), a working CRM that customers can reach without security warnings, an organized repo with predictable releases, and Jarvis is integrated deeply enough to assist with product, customer, and operational work without re-explaining context every time.

## Why it's in the vault

VMES is the largest single body of Vladimir's work. Anything that touches the product — specs, customer notes, decisions, drafts, monitoring — should land here so it accumulates instead of scattering.

## Folder layout

| Folder | Contents |
|---|---|
| `site/` | Marketing site notes — pages, copy, SEO, metrics |
| `crm/` | CRM notes — features, customers, data model, ops |
| `repo/` | Repo-related — branches, releases, infra, deploy notes |
| `integrations/` | The four integration tracks with the vault — see [[04_Projects/vmes/integrations/_index]] |
| `decisions/` | Project-local decision log (cross-link to `06_Memory/decisions/` for cross-cutting ones) |
| `customers/` | Per-customer notes if/when relevant |
| `drafts/` | Work-in-progress copy, blog posts, docs |

## Integration roadmap

Four tracks, requested simultaneously. Sequenced by dependency:

| # | Track | Status | File |
|---|---|---|---|
| 1 | **Track as project** | Done — this folder | _(this file)_ |
| 2 | **Monitor live site** | Spec written, scheduled task pending | [[04_Projects/vmes/integrations/02-monitor-live-site]] |
| 3 | **Publish vault → site** | Spec written, blocked on repo URL | [[04_Projects/vmes/integrations/03-publish-vault-to-site]] |
| 4 | **Pull live data → vault** | Spec written, blocked on API surface | [[04_Projects/vmes/integrations/04-pull-data-to-vault]] |
| 5 | **GitHub repo wiring** | Spec written, blocked on repo URL | [[04_Projects/vmes/integrations/05-github-wiring]] |

## Open issues

> Append-only. Most recent first.

### 2026-05-08 — crm.vmes.ro SSL cert invalid
Browser blocks reaching crm.vmes.ro with `ERR_CERT_AUTHORITY_INVALID`. Likely self-signed or expired. **Customer-impacting** — anyone clicking through gets a scary warning. Fix candidates: Let's Encrypt via Caddy/Traefik, Cloudflare proxy, or a real CA cert. Track until resolved.

### 2026-05-08 — vmes.ro is a single page only
Sitemap.xml exposes only `/`. Single SPA bundle. Worth deciding: stay single-page, or expand into product / pricing / docs / blog / contact pages. Affects the publishing track — there's nowhere to publish to right now.

## Definition of done — for now

This is a long-running project (the product itself), so "done" is per-track:

- **Track 2 (monitoring)** done when a scheduled task runs daily and writes results to `04_Projects/vmes/site/monitoring-log.md`.
- **Track 3 (publishing)** done when a markdown file in this folder can be pushed to the deployed site via a documented pipeline.
- **Track 4 (data pull)** done when Jarvis can answer "what's the current production status of X" against live VMES data.
- **Track 5 (GitHub)** done when Jarvis can read PRs/issues/releases for the repo and write them to the vault.

## Log

> Append-only narrative. Most recent first.

### 2026-05-08
Project folder created. Both surfaces fetched — vmes.ro live, crm.vmes.ro cert-broken. Four integration tracks documented in `integrations/`. Awaiting GitHub repo URL from Vladimir.

## Related

- [[02_Capabilities/connectors/README]] — connector strategy
- [[02_Capabilities/skills/schedule]] — for monitoring jobs
- [[06_Memory/decisions/README]] — cross-cutting decision log
- [[01_Identity/goals]] — should add a VMES-related goal here if not already
