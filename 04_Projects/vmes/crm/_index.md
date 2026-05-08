---
title: VMES — CRM (crm.vmes.ro)
type: project
status: active
tags: [project, vmes, crm]
url: https://crm.vmes.ro
updated: 2026-05-08
---

# VMES — CRM (crm.vmes.ro)

Vladimir's CRM, served at `crm.vmes.ro`. First-party — built and operated alongside VMES.

## Snapshot — 2026-05-08

| Field | Value |
|---|---|
| URL | https://crm.vmes.ro |
| Status | **Unreachable from web fetch** — `ERR_CERT_AUTHORITY_INVALID` |

## Active issue: SSL cert

Fetch from outside the network is blocked because the cert is not trusted by a public CA. Browsers will show a "Your connection is not private" warning when customers try to reach it. Fix candidates:

1. **Let's Encrypt via reverse proxy** (Caddy or Traefik). Free, auto-renewing, takes ~10 minutes if DNS is correct. Recommended default.
2. **Cloudflare proxy + their cert**. Easiest if you already use Cloudflare DNS — flip the cloud icon orange and they handle TLS at their edge.
3. **A purchased CA cert**. Worth it only if you have a specific compliance reason; otherwise overkill.

Until this is fixed, Jarvis can't fetch the page to capture meta or behavior the way it can with vmes.ro.

## What's in the CRM (to fill in)

> *Fill in: data model, key entities, what features it has, who uses it, deployment topology.*

## Connection to vault

The CRM is the obvious source of truth for customer-facing work. Once the cert is fixed, the integration tracks become possible:

- **Monitor** — daily fetch confirming reachability and meta
- **Pull** — if there's a query API, surface customer/account state to the vault (privately — no PII in shared notes)
- **Publish** — probably not relevant for the CRM

A Vladimir-built CRM means there's no vendor MCP — integration runs through whatever API the CRM exposes, or through direct DB access (if Vladimir is willing to give Jarvis a read-only credential).

## Open questions

- Is there an API on the CRM Jarvis could read?
- Multi-tenant or single-tenant?
- What auth model — session, token, OAuth?
- Is there a staging environment, or is `crm.vmes.ro` it?

## Related

- [[04_Projects/vmes/_index]]
- [[04_Projects/vmes/integrations/04-pull-data-to-vault]]
