---
title: Jarvis Runtime
type: capability
tags: [capability, runtime, platform, meta]
updated: 2026-05-08
---

# Jarvis Runtime

Skills, tools, connectors, and agents describe **what Jarvis can do**. This file describes **the substrate all of that runs on** — which Claude product is hosting the session, which model is answering, which integrations are wired in, and how the vault on Vladimir's machine maps into that environment.

When something seems to "not work the way the docs say," it is almost always a runtime mismatch (wrong surface, missing connector, model swapped) rather than a vault error. Read this file before assuming a capability is broken.

## Surfaces

Jarvis is not a single program. It's a persona that runs on whichever Claude surface Vladimir opens. The surface determines what tools exist, where files live, and how persistence works.

| Surface | What it is | Where the vault lives | Notes |
|---|---|---|---|
| Cowork (Claude desktop) | Primary day-to-day surface. Bundles MCP connectors, scheduled tasks, computer-use. | `C:\Users\vdzoo\Documents\obsidian\brain` (real path on Windows) | Default for documents, research, daily-review. |
| Claude Code on the web | Browser-hosted coding sandbox at claude.ai/code. Linux container, ephemeral filesystem. | `/home/user/own-jarvis` (sandbox path; the GitHub repo is the source of truth) | Used for repo work on `vladutzeloo/own-jarvis`. |
| Claude Code CLI | Local terminal install, runs against the real Windows filesystem. | Wherever the working directory points | Same model as the web surface; different file boundary. |
| Claude API / Agent SDK | Programmatic — for custom agents Vladimir might build. | N/A — caller-supplied | See [[02_Capabilities/agents/README]]. |
| **Phone PWA** | Mobile-first chat web app at `https://jarvis.vmes.ro`. Installable to Android home screen. | Vault clone at `/var/jarvis/vault` on the VPS (git-synced). | Uses Qwen Coder via Ollama on the OpenJarvis VPS. Same session DB as jarvis.exe. |
| **jarvis.exe (desktop)** | Tauri app running on Windows with WSL backend. | Local Obsidian vault (git-synced to GitHub). | Calls the same VPS API (`https://jarvis.vmes.ro/api/`). Shares sessions with the phone PWA. |

The vault is replicated; it is the same content on each surface, but the path differs. Anything written to `C:\Users\vdzoo\Documents\obsidian\brain` from Cowork lands in `/home/user/own-jarvis` when Claude Code on the web pulls from GitHub, and vice-versa, mediated by `git`.

## Models

The model is set per surface and changes over time. Don't hard-code assumptions about model behavior into vault files — record the floor capability needed (e.g. "needs tool use", "needs a 200k context window") and let the surface decide.

| Surface | Default model (as of 2026-05-08) |
|---|---|
| Claude Code on the web | `claude-opus-4-7` |
| Cowork desktop | *Fill in: confirm current default.* |
| Claude API projects | Whichever Vladimir pins per project |
| Phone PWA / jarvis.exe | `qwen2.5-coder:7b` via Ollama on the OpenJarvis VPS (local AI — no Anthropic) |

The latest family is Claude 4.x. IDs in use: Opus 4.7 (`claude-opus-4-7`), Sonnet 4.6 (`claude-sonnet-4-6`), Haiku 4.5 (`claude-haiku-4-5-20251001`). When building anything against the API, default to the latest available — see [[02_Capabilities/skills/skill-creator]].

## Egress and network boundaries

Each surface has its own outbound network policy. This matters when Jarvis is asked to fetch a URL and the request fails — it is usually the surface, not the target.

- **Claude Code on the web** uses an outbound allowlist. Hosts not on the list return HTTP 403 with header `x-deny-reason: host_not_allowed` from the sandbox proxy (the response is *not* from the target site). Confirmed blocked as of 2026-05-08: `vmes.ro` and subdomains. Symptom: WebFetch returns 403; `curl -I` returns the same with content-length 21.
- **Cowork desktop** has broader egress and is the correct surface for fetches against Vladimir's own properties (`vmes.ro`, `crm.vmes.ro`) and for arbitrary scraping targets.
- **Claude Code CLI** runs on the local machine, so it is constrained only by Vladimir's own network — same effective egress as a browser on his laptop.

Rule of thumb: any task involving an HTTP fetch against a host that isn't a major public service (GitHub, npm, PyPI, common docs sites) should be done from Cowork or the CLI, not from Claude Code on the web.

## Connectors and MCP servers

Connectors are MCP servers wired into a surface. The full inventory and registration flow live in [[02_Capabilities/connectors/README]]; this section only records the runtime-level facts.

- **Cowork** is where most third-party connectors are installed (Notion, Drive, M365, etc.). The connectors README tracks which ones are live.
- **Claude Code on the web** has a single MCP server pre-wired: GitHub, scoped exclusively to the `vladutzeloo/own-jarvis` repository. Any GitHub action against another repo will be denied. See [[00_Meta/git-conventions]].
- Connectors are not portable across surfaces — installing Slack in Cowork does not give Claude Code on the web access to it.

## Hooks and skills

Two layers of "automatic behavior" sit between Vladimir and the model.

**Skills** are declarative playbooks loaded on demand by name. The vault's `02_Capabilities/skills/` directory mirrors the installed catalog. Calling `/skill-creator` builds new ones; see [[02_Capabilities/skills/skill-creator]].

**Hooks** are shell commands the harness fires on lifecycle events (SessionStart, PreToolUse, Stop). They live in `settings.json`, not memory — Jarvis cannot create automatic behavior without writing a hook. The `update-config` skill is the right entry point for any "from now on, every time X..." request. See [[02_Capabilities/skills/setup-cowork]] for the Cowork-specific setup, and use the `session-start-hook` skill to bootstrap a SessionStart hook for Claude Code on the web.

## Filesystem map

On the Windows host:

```
C:\Users\vdzoo\Documents\obsidian\brain\   <-- the vault (Obsidian + git working tree)
  .git\                                    <-- pushed to github.com/vladutzeloo/own-jarvis
  .obsidian\                               <-- Obsidian app config (mostly gitignored)
  00_Meta\ ... 99_Templates\               <-- vault content
  init-repo.ps1                            <-- one-time bootstrap, idempotent
```

In a Claude Code on the web sandbox, the equivalent appears at `/home/user/own-jarvis/`. The Cowork shell exposes the host vault at `/sessions/<id>/mnt/brain/` — see [[02_Capabilities/tools/file-system]] for the per-tool table.

## When this file should change

Bump `updated:` and edit when:

- A new surface comes online (e.g. Vladimir adopts the Claude iOS app, or a new IDE extension).
- The default model on a surface changes by more than a point release.
- A connector is added or removed at the runtime layer (not for an in-app config tweak).
- The host filesystem layout changes — vault rename, new machine, dual-boot.

Day-to-day capability documentation belongs in `skills/`, `tools/`, `connectors/`, or `agents/`, not here.

## Related

- [[02_Capabilities/README]] — capability MOC
- [[02_Capabilities/connectors/README]] — full connector inventory
- [[02_Capabilities/tools/file-system]] — path mappings per tool
- [[00_Meta/git-conventions]] — how Jarvis interacts with the GitHub repo
- [[06_Memory/facts]] — durable runtime facts
