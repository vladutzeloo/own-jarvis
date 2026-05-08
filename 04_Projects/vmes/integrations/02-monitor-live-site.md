---
title: Track 2 — Monitor the Live Site
type: project
status: ready
tags: [project, vmes, integration, monitoring]
updated: 2026-05-08
---

# Track 2 — Monitor the Live Site

Jarvis fetches vmes.ro (and eventually crm.vmes.ro) on a schedule. Captures uptime, response time, meta drift, and SEO posture. Writes to `04_Projects/vmes/site/monitoring-log.md`.

## Why

Single-page sites die quietly. A bad deploy, a CDN config, a cert expiry — none of these page anyone unless someone notices. Daily monitoring catches them in 24 hours instead of when a customer complains.

## What gets captured

| Field | Why |
|---|---|
| HTTP status | 200 = up, anything else = investigate |
| Response time | Trend matters more than absolute |
| Title + meta description | Detect accidental content drift |
| OpenGraph fields | Detect partial deploy that broke SEO |
| Sitemap URL count | Detect new pages or pages disappearing |
| Cert expiry (when in scope) | 30-day warning |
| Hash of HTML | Diff vs. previous to surface unexpected changes |

## How

Use [[02_Capabilities/skills/schedule]] + [[02_Capabilities/tools/web-fetch]].

Scheduled task prompt (draft):

> Fetch https://vmes.ro and https://vmes.ro/sitemap.xml. Compare meta and sitemap to the last entry in `C:\Users\vdzoo\Documents\obisidian\brain\04_Projects\vmes\site\monitoring-log.md`. Append today's entry with date, status code, response time, title, description, OG title, OG description, sitemap URL count, and a "diff vs. yesterday" summary. If anything regressed (4xx/5xx, missing meta, removed pages), prefix the entry with `⚠️ ALERT —` and surface in the next morning's daily review.

Run cadence: **daily at 8am**. Cheap to run, surfaces issues fast.

## Phase 2 — once crm.vmes.ro cert is fixed

Add crm.vmes.ro to the same scheduled task. Capture the same fields. Add cert expiry tracking specifically for the CRM.

## Definition of done

- Scheduled task created and tested once on demand
- `monitoring-log.md` exists in `04_Projects/vmes/site/` with one entry
- The next daily review (run via [[03_Workflows/productivity/daily-review]]) reads the latest monitoring entry and surfaces alerts

## Related

- [[02_Capabilities/skills/schedule]]
- [[04_Projects/vmes/site/_index]]
