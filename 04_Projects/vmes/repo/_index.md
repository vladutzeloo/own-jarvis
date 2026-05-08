---
title: VMES — Source Repo
type: project
status: active
tags: [project, vmes, repo, github]
updated: 2026-05-08
---

# VMES — Source Repo

GitHub repo backing vmes.ro and crm.vmes.ro. Vladimir owns and ships from it.

## Snapshot

| Field | Value |
|---|---|
| Host | GitHub (per Vladimir) |
| URL | _to capture — paste in chat next session and Jarvis will fill this in_ |
| Visibility | _public / private — to confirm_ |
| Default branch | _to capture_ |
| Deploy target | vmes.ro (likely Vercel/Netlify/Cloudflare Pages — to confirm) |
| Crm deploy target | crm.vmes.ro (to confirm) |
| CI | _to confirm — GitHub Actions?_ |

## Once the repo URL is captured

Jarvis can do the following from chat without needing a connector — using `WebFetch` against the public repo or shell against a local clone:

- Read README, recent commits, recent issues, recent PRs (if public)
- Track release cadence
- Surface stale branches

For deeper integration (write access, draft PRs, comment on issues), see [[04_Projects/vmes/integrations/05-github-wiring]].

## Deploy notes

> *Fill in: how does code get from `main` to vmes.ro and crm.vmes.ro? Vercel, Netlify, Cloudflare Pages, custom CI? What's the rollback path?*

## Related

- [[04_Projects/vmes/_index]]
- [[04_Projects/vmes/integrations/05-github-wiring]]
- [[04_Projects/vmes/integrations/03-publish-vault-to-site]] — depends on this
