---
title: Google Jules API (jules.google)
type: capability
tags: [capability, integration, jules, coding-agent, google]
updated: 2026-05-08
status: stub
---

# Google Jules API

Programmatic access to [Jules](https://jules.google/), Google's autonomous coding agent. Jarvis dispatches a coding task (repo + prompt + branch); Jules works on it asynchronously and returns a PR or diff. The right tool when the task is large enough to want isolation — multi-file refactors, scaffolding a new service, batch dependency upgrades — and small enough that Jarvis doesn't need to babysit each step.

This integration is **a stub**. The `.env` scaffolding is wired up (`JULES_API_KEY`, `JULES_API_BASE`); the auth shape, endpoint paths, and request/response schemas below are placeholders to fill in from the official docs the first time we actually call it. Do not paste fabricated endpoint paths into a real script — verify them first.

## Credentials

The key lives in `.env` at the repo root, gitignored. The committed template `.env.example` documents the variables.

```
JULES_API_KEY=...           # from jules.google → Settings → API access
JULES_API_BASE=             # confirm from official docs before first call
```

Like every other integration here, each surface (Cowork on Windows, Claude Code on the web, CLI) keeps its own `.env`. Replicating the vault via `git pull` does not copy the secret.

## What to confirm before first use

Before writing a script against this, look up and record the following — append to this section, don't pre-fill with guesses:

- **Base URL** — set `JULES_API_BASE` in `.env.example`.
- **Auth header** — `Authorization: Bearer <key>` vs. `x-goog-api-key: <key>` vs. OAuth.
- **Task submission endpoint** — path, method, request body shape (repo URL, branch, prompt, optional context).
- **Polling vs. webhook** — does the API return a task id you poll, or does it push status to a webhook?
- **Quota model** — per-key request limit, concurrent tasks, monthly cap.

When those are nailed down, replace this section with the actual call shape and a runnable snippet (Python first, mirror the NVIDIA doc's structure).

## Calling the API

> **TODO:** add a real Python / curl snippet once the endpoint shape is confirmed.
> Until then, this section intentionally has no code so nobody copy-pastes a fabricated URL into a scheduled task.

The expected pattern, by analogy with similar coding-agent APIs:

1. POST a task: `{ repo, branch, prompt, base_branch }` → returns `{ task_id }`.
2. Poll task status: `GET /tasks/{task_id}` → returns `{ status, pr_url?, diff? }`.
3. On `status: completed`, fetch the PR or diff.

Confirm against the docs before relying on any of that.

## When to choose Jules over alternatives

| Want | Tool |
|---|---|
| Synchronous, conversational coding | Claude Code (this surface) |
| Autonomous, async coding on a real repo | Jules |
| Hosted LLM inference (no agent loop) | [[02_Capabilities/integrations/nvidia]] or Claude API |
| Issue triage / PR review on existing GitHub PRs | Cowork's GitHub MCP, Copilot review |

Jules' niche is "fire-and-forget on a repo I trust it with" — so the `.env` and a small wrapper that passes `vladutzeloo/own-jarvis` (or a VMES repo, when its URL is captured) is the natural integration point.

## Egress and surface notes

- **Cowork (Windows)** and **Claude Code CLI** can reach Google APIs without restriction.
- **Claude Code on the web** uses an outbound allowlist; Google API hosts are typically on it, but the specific Jules host has not been verified as of 2026-05-08. If a call returns HTTP 403 with `x-deny-reason: host_not_allowed`, it is the sandbox proxy, not Jules. Run the call from Cowork or the CLI in that case. See [[02_Capabilities/runtime#Egress and network boundaries]].

## Operational notes

- Treat `JULES_API_KEY` like a Claude or NVIDIA key. Rotate via the Jules dashboard if it leaks. Never paste it into a vault note, a chat, or a commit.
- Jules acts on real repos. Restrict the key — and the wrapper script — to repos Vladimir is comfortable having an autonomous agent push to. Default-deny: do not give Jules write access to VMES production code without an explicit decision in [[06_Memory/decisions/README]].
- When Jules opens a PR, surface it in the vault's PR-watching workflow (same as [[00_Meta/git-conventions]] expects for Claude-authored PRs).

## Related

- [[02_Capabilities/integrations/_index]] — sibling integrations
- [[02_Capabilities/integrations/nvidia]] — same scaffolding pattern, fully documented
- [[02_Capabilities/runtime]] — egress rules per surface
- [[00_Meta/git-conventions]] — how agent-authored PRs flow into the repo
