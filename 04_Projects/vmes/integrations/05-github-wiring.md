---
title: Track 5 — GitHub Repo Wiring
type: project
status: blocked
tags: [project, vmes, integration, github]
blockedBy: [repo-url]
updated: 2026-05-08
---

# Track 5 — GitHub Repo Wiring

Give Jarvis structured access to the VMES GitHub repo. Read PRs, issues, releases, commits. Eventually draft PRs and comment.

## Why

Once Jarvis can see the repo, he can:
- Answer "what shipped this week"
- Surface stale PRs
- Auto-summarize releases for the changelog
- Cross-reference issues with customer notes
- Help with PR review (using the `review` skill — already installed)

## State of the world

- GitHub MCP **did not appear** in the Cowork registry searches under any of the tried keywords. Either it's not yet offered as a managed connector here, or it's listed under different keywords than expected.
- Workarounds, in order of preference:

### Option A — Self-hosted GitHub MCP

Anthropic publishes [github-mcp-server](https://github.com/github/github-mcp-server). It can be added as a custom MCP in Cowork. Auth via a Personal Access Token with read scopes (no write until trust is built up).

**Pros:** Full GitHub API surface. Same UX as built-in connectors.
**Cons:** Self-hosting; PAT management.

### Option B — `gh` CLI in shell

The `gh` CLI is likely available in the bash sandbox. Authenticated with a token, Jarvis can run `gh pr list`, `gh issue list`, `gh run list` from shell.

**Pros:** Zero setup if `gh` is installed.
**Cons:** Each call is a one-off; no structured state across calls.

### Option C — Public WebFetch

For public repos, Jarvis can `WebFetch` against `github.com/<org>/<repo>` directly. Limited but works for read-only.

**Pros:** Zero setup.
**Cons:** No structured data; rate-limited; only public repos.

## Recommended path

1. **Right now:** Vladimir pastes the repo URL. Jarvis uses Option C (public fetch) for surface-level reads.
2. **First proper integration:** Option B (`gh` CLI + token). Test in shell. Decide if it's enough.
3. **Long-term:** Option A (self-hosted MCP) once the patterns stabilize.

## What's needed

- **Repo URL** — paste in chat next session
- **Token decision** — PAT (classic) vs. fine-grained (recommended). Read-only scopes initially: `repo:status`, `public_repo` (or `repo` if private), `read:org`.
- **Where the token lives** — a real secrets manager, not the vault.

## Definition of done

Jarvis can answer "what shipped to vmes.ro this week" by reading the repo's recent commits and releases, without Vladimir having to paste anything in.

## Related

- [[04_Projects/vmes/repo/_index]]
- [[04_Projects/vmes/integrations/03-publish-vault-to-site]] — depends on this
- [[02_Capabilities/connectors/README]]
