---
title: Track 4 — Pull Live Data from VMES into Vault
type: project
status: blocked
tags: [project, vmes, integration, data]
blockedBy: [crm-cert, api-decision]
updated: 2026-05-08
---

# Track 4 — Pull Live Data from VMES into Vault

Expose VMES + CRM data to Jarvis so he can answer questions about production state, customer pipeline, and operational metrics — without Vladimir having to re-explain every time.

## Why

The whole point of Jarvis is that he carries state. Right now, every time Vladimir asks "what's happening with customer X" or "what's the production status of plant Y", Jarvis has to ask. With this track, Jarvis can answer the second-tier questions directly.

## Architecture options

### Option A — Custom MCP server (recommended for own product)

Vladimir builds a small MCP server that exposes a curated read-only API surface:
- `vmes_list_customers()` (or whatever the CRM equivalent is)
- `vmes_get_customer(id)`
- `vmes_list_active_alerts()`
- `vmes_production_status(plant_id)`

The MCP server runs alongside VMES (or as a separate service), authenticates with a service account, and Jarvis calls it like any other connector.

**Pros:** Full control over the surface. PII can be gated server-side. Easy to evolve.
**Cons:** Have to build and host it.

### Option B — Direct DB read-only credential

Jarvis gets a read-only DB credential (Postgres? MySQL? something else?) and runs queries directly via shell.

**Pros:** Zero new code.
**Cons:** PII discipline becomes Jarvis's responsibility (riskier). Schema drift breaks queries.

### Option C — Use crm.vmes.ro's existing API (if it has one)

If the CRM already exposes a REST or GraphQL API for its own front-end, Jarvis can authenticate as a user/service and call it.

**Pros:** No new code.
**Cons:** Tied to the CRM's API shape; rate limits; auth complexity.

Recommended: **Option A**, when there's appetite. **Option C** as a stopgap if the CRM already has an API.

## What's needed

- **Cert fix on crm.vmes.ro** — blocking. Without this, neither Jarvis nor browsers can reach it.
- **Decision: A, B, or C?**
- **Read-only credential** stored in a real secrets manager (not the vault)
- **A whitelist of fields** Jarvis is allowed to surface to the chat (PII discipline)

## Phase 1 (smallest viable)

- Pick three questions Jarvis should answer. Examples:
  - "How many active customers do we have?"
  - "What was production yesterday at plant X?"
  - "Are any alerts open?"
- Build whatever's needed to answer those three. Stop there until they're useful.

## Definition of done

The three Phase 1 questions are answerable by Jarvis from chat, with sub-2-second latency, without revealing any PII Vladimir didn't approve in the whitelist.

## Related

- [[04_Projects/vmes/crm/_index]]
- [[02_Capabilities/connectors/README]]
