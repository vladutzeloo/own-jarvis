---
title: VMES — Marketing
type: project
status: active
tags: [project, vmes, marketing]
updated: 2026-05-08
---

# VMES — Marketing

The demand side of VMES: getting the right people to vmes.ro, converting them to demos, and turning those into customers in the CRM. This folder holds anything Jarvis should remember or run on a recurring basis to support that funnel.

The product side lives in [[04_Projects/vmes/_index]]. The integration tracks (vault ↔ VMES surfaces) live in [[04_Projects/vmes/integrations/_index]]. Marketing here is *strategy and execution*, not plumbing.

## Surfaces in scope

- **vmes.ro** — the marketing site. See [[04_Projects/vmes/site/_index]] for the technical snapshot.
- **crm.vmes.ro** — where leads become accounts. Currently unreachable due to cert; see [[04_Projects/vmes/crm/_index]].

## Workstreams

| File | Topic | Status |
|---|---|---|
| [[04_Projects/vmes/marketing/seo]] | Organic search posture and audits | Snapshot done, gaps listed, re-audit pending Cowork |
| [[04_Projects/vmes/marketing/ads]] | Paid acquisition strategy and suggested campaigns | Spec only — needs Vladimir's input on budget, channels, audience |
| [[04_Projects/vmes/marketing/scraping]] | Competitive intel and lead-gen scraping | Spec only — needs target list and legal stance |

## Where this connects

- **Live tracking** of vmes.ro health and SEO drift is in [[04_Projects/vmes/integrations/02-monitor-live-site]] (an integration track, not a marketing workstream — it's the plumbing the SEO workstream depends on).
- **Suggested ads** can only get smart once [[04_Projects/vmes/integrations/04-pull-data-to-vault]] is live; ad targeting calibrated against actual customer pipeline beats targeting calibrated against guesses.
- **Scraping** runs through [[02_Capabilities/tools/web-fetch]] / [[02_Capabilities/tools/claude-in-chrome]] from Cowork; the Claude Code on the web sandbox blocks vmes.ro and many other hosts at the egress (see [[02_Capabilities/runtime]]).

## Open questions for Vladimir

These gate real work. Listed in priority order.

1. **Audience and language.** vmes.ro currently runs `lang="en"` on a `.ro` domain. Is the buyer Romanian, EU-wide, or global? Affects every other decision.
2. **Buyer persona.** Plant managers, ops directors, automation engineers, IT? Determines copy, channels, and competitive set.
3. **Ad budget envelope.** Even a rough monthly cap unlocks the ads spec.
4. **Existing ad accounts.** Google Ads / Meta / LinkedIn / others — which already exist with conversion tracking attached?
5. **Top 3-5 competitors.** Names + URLs unblocks the scraping plan.
6. **Sales motion.** Inbound demo requests, outbound prospecting, partner-led, channel? Marketing should support whichever one is actually working.

## Definition of done — for now

This folder is "current" when:

- The SEO workstream has a fresh audit (≤ 30 days old) with at least 3 prioritized fixes.
- The ads workstream has a one-page strategy after Vladimir answers the budget/channel/audience questions.
- The scraping workstream has a target list and a documented legal stance.

## Related

- [[04_Projects/vmes/_index]] — VMES master
- [[04_Projects/vmes/site/_index]] — site technical state
- [[04_Projects/vmes/integrations/02-monitor-live-site]] — daily monitoring (depended on by SEO)
- [[02_Capabilities/runtime]] — egress notes that constrain which surface can run scrapes
