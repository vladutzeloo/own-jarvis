---
title: VMES — Paid Acquisition
type: project
status: spec
tags: [project, vmes, marketing, ads]
updated: 2026-05-08
---

# VMES — Paid Acquisition

How VMES spends money to get qualified attention. This file holds the strategy and the per-channel plans; campaign-specific notes (creatives, copy variants, A/B results) go in dated subfiles when active.

This is intentionally a spec, not a plan. The plan needs Vladimir's input on the questions below before it stops being guesswork.

## Why paid before organic is mature

Three reasons a small B2B product like VMES might run paid acquisition even with thin SEO:

1. **Speed-to-signal.** Paid traffic answers "do these landing pages convert?" in days, not quarters.
2. **Audience precision.** LinkedIn job-title targeting reaches plant managers in a way Google organic can't.
3. **Compounding intent data.** Search terms that convert on paid become organic targets. Paid is the discovery loop.

What paid is *not* good for here: brand awareness with no conversion path, expensive premium placements, or anything before there's a working contact form on vmes.ro.

## Questions Vladimir must answer

These are gates. The plan stays a stub until each is closed.

| # | Question | Why it gates the plan |
|---|---|---|
| 1 | **Monthly budget envelope?** | Determines whether to run two channels or one, and whether managed or self-serve. |
| 2 | **Geo target?** | Romania, EU, global, US? Channel mix and CPM swing 5-10× across these. |
| 3 | **Buyer persona?** | "Plant manager at a 200+ employee manufacturer" implies LinkedIn. "Industrial automation engineer evaluating tools" implies Google search. |
| 4 | **Conversion event?** | Demo request? Sign-up? Whitepaper download? Determines what to optimize toward and what counts as success. |
| 5 | **Existing accounts?** | Google Ads, Meta, LinkedIn — which already have history, conversion tracking, audiences? Reusing is much cheaper than creating. |
| 6 | **Sales follow-up SLA?** | If a demo request waits 48h for follow-up, ads will produce more pain than pipeline. Paid only works when sales can close the loop fast. |

## Channels (sketch — not a recommendation)

Filled in once questions above are answered.

### Google Ads — search

Best when there's existing buying intent. Targeting MES / OEE / production-monitoring keywords. Needs landing pages that match the search intent (which today's vmes.ro single-page doesn't), so deeply tied to [[04_Projects/vmes/marketing/seo]] and the page-architecture decision there.

### LinkedIn Ads

Best for B2B ICP targeting (job title, company size, industry). High CPC (€10-30+) but qualified. Requires a credible contact path on the landing page and a budget floor (~€2k/month before the data is statistically meaningful).

### Meta (Facebook / Instagram) Ads

Usually not where industrial buyers live. Skip unless the persona work surfaces a specific Meta-shaped audience.

### Industry publications and newsletters

Often overlooked. Sponsorships in MES/Industry-4.0 newsletters can outperform self-serve channels for niche B2B. Worth a research pass once the audience is confirmed.

## What Jarvis can do here

Once the gates are answered:

- **Draft ad copy variants** for any channel, against the persona and the conversion event.
- **Generate landing-page copy** that matches a campaign's search intent (not the same as the home page).
- **Synthesize weekly performance** from screenshots or exported CSVs (Cowork can OCR / parse).
- **Suggest negative keywords** based on search-term reports.
- **Cross-reference with CRM** once [[04_Projects/vmes/integrations/04-pull-data-to-vault]] is live — to surface which campaigns produce *closed* customers, not just leads.

What Jarvis should *not* do without explicit go-ahead: spend money, change live campaign settings, pause campaigns, or contact ad-platform support.

## Tracking

A campaign without conversion tracking is a guess. Required before any spend:

- **Google Tag Manager** (or equivalent) on vmes.ro.
- **Conversion event** wired (form submission, demo request) and verified to fire in the relevant ad platforms.
- **UTM convention** documented — at minimum: `utm_source`, `utm_medium`, `utm_campaign`. Suggested format: `<channel>_<persona>_<asset>_<YYYYMM>`.

## Definition of done — for each campaign

A campaign is "in scope to keep running" when:

- It hits the conversion target (TBD — gate question 4) at acceptable CAC (TBD — gate question 1 derives the ceiling).
- It produces leads the CRM marks as qualified at ≥ 30%.
- The campaign-specific landing page exists and is the canonical destination (not vmes.ro home).

If any of these are missing, the campaign is paused and revisited.

## Related

- [[04_Projects/vmes/marketing/_index]]
- [[04_Projects/vmes/marketing/seo]] — landing pages and keyword research feed both
- [[04_Projects/vmes/integrations/04-pull-data-to-vault]] — needed for closed-loop attribution
- [[04_Projects/vmes/crm/_index]] — sales follow-up sits here
