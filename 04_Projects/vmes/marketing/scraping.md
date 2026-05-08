---
title: VMES — Web Scraping
type: project
status: spec
tags: [project, vmes, marketing, scraping, intel]
updated: 2026-05-08
---

# VMES — Web Scraping

What Jarvis fetches from third-party sites on behalf of VMES, why, and where the results land. Distinct from [[04_Projects/vmes/integrations/02-monitor-live-site]], which monitors *Vladimir's own* surfaces — this file covers *everyone else*.

Three legitimate use cases drive this. Anything outside them needs an explicit "yes" from Vladimir.

## Use cases in scope

### 1. Competitive intelligence

Track competitor sites for: pricing changes, new product pages, marketing copy shifts, new case studies, new hires/team-page changes, blog cadence. Each is a leading indicator of strategy.

The output is a dated diff per competitor in `04_Projects/vmes/marketing/intel/<competitor>/<YYYY-MM-DD>.md`. The diff says what changed, not what the page contains — narrative, not snapshot.

### 2. Lead-gen research

Given a target company name, gather public surface area: website summary, tech-stack signals, key people on the team page, recent news mentions, LinkedIn employee count if accessible. Output goes to `04_Projects/vmes/customers/<company>.md` as a working dossier.

This is research *before* outreach — never a substitute for direct conversation.

### 3. Content research

For a blog post or landing page, pull the top 5-10 search results for a target query, extract their angles, and synthesize a "what hasn't been said yet" gap analysis. Output is ephemeral — a working scratch in `04_Projects/vmes/drafts/<post>/research.md` that gets deleted once the post ships.

## Use cases NOT in scope without explicit approval

- Scraping behind logins, including LinkedIn full profiles, Crunchbase paid tier, Glassdoor reviews, anything requiring an account.
- Scraping that violates a target's `robots.txt` or stated terms of service.
- Aggressive crawling — sustained > 1 req/sec to a single host, or anything that could look like a denial-of-service pattern.
- Personal data that isn't already publicly indexed (e.g. email addresses obtained from leak databases).
- Anything Vladimir hasn't explicitly cleared as a target.

## Legal stance

Romanian law and EU GDPR both apply. The cautious-but-workable line:

- **Public website content** — fine to fetch and quote with attribution. Not fine to republish wholesale.
- **Personal data of identifiable individuals** — even when public, GDPR applies if processing is sustained or systematic. Treat employee lists as snapshots for context, not databases for outreach.
- **`robots.txt`** is not legally binding but breaching it is the cheapest way to escalate a borderline scrape into a complaint. Default: respect it.
- **Rate limit** at ≤ 1 req/sec to any single host, ideally with jitter.

When unsure, ask Vladimir before running. The cost of asking is much lower than the cost of a takedown notice or a complaint.

## Tooling

By surface:

- **Cowork** — primary execution environment. Has [[02_Capabilities/tools/web-fetch]] and [[02_Capabilities/tools/claude-in-chrome]]. Can render JS, follow redirects, handle most modern sites.
- **Claude Code on the web** — limited. The sandbox blocks many hosts at egress (see [[02_Capabilities/runtime]]). Acceptable only for hosts on its allowlist.
- **CLI** — Vladimir's own machine. Use for any one-off scrape that hits a host the other surfaces can't reach. Manual, not automated.

For structured scraping at scale (10+ pages per run), Jarvis writes a small Python or Node script and runs it via shell, rather than chaining WebFetches. Output is markdown, not JSON dumps — the vault doesn't store raw data.

## Inputs Vladimir must provide

The plan stays a stub until these exist.

| # | Input | Used for |
|---|---|---|
| 1 | **Top 3-5 competitors** with URLs | Targets for competitive intel |
| 2 | **A list of "comparable companies"** in adjacent or aspirational categories | Stretch competitive set |
| 3 | **Industry publications worth tracking** | Where VMES might want presence |
| 4 | **Stance on lead-gen scraping** — green / yellow / red | Determines whether case 2 above runs at all |

## How Jarvis runs a scrape

A scrape is a one-shot or scheduled task. Default protocol:

1. **Confirm target.** Match against the in-scope use cases above.
2. **Check `robots.txt`** before any fetch.
3. **Fetch with realistic UA and rate limit.** Identify as a research bot when possible.
4. **Parse and summarize.** Markdown out, not raw HTML.
5. **Diff against the prior run** if this is a recurring scrape. Log only what changed.
6. **Land the output** in the documented location for the use case.
7. **Surface anomalies.** If a target starts returning 403, geoblocking, or wildly different content, stop the schedule and flag.

## Definition of done — for now

- Competitor list captured (gate input 1 above).
- A first competitive-intel run executed against one competitor and the output reviewed.
- Legal stance confirmed by Vladimir on the lead-gen case.

## Related

- [[04_Projects/vmes/marketing/_index]]
- [[04_Projects/vmes/integrations/02-monitor-live-site]] — monitoring Vladimir's own sites
- [[02_Capabilities/tools/web-fetch]]
- [[02_Capabilities/tools/claude-in-chrome]]
- [[02_Capabilities/runtime]] — egress restrictions per surface
