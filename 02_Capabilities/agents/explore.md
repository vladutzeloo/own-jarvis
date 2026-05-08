---
title: Agent — Explore
type: capability
tags: [capability, agent, search]
updated: 2026-05-08
---

# Agent: Explore

Fast read-only search agent. Locates code, finds files by pattern, greps for symbols.

## When to use

- "Where is X defined?"
- "Find files matching Y"
- "Which files reference Z?"
- Pattern-driven lookups across a codebase

## When NOT to use

- Code review or design audits
- Cross-file consistency checks
- Open-ended analysis
- Anything where you need to understand whole files (Explore reads excerpts and may miss content past its read window)

## Briefing

Specify search breadth:

- `quick` — single targeted lookup
- `medium` — moderate exploration
- `very thorough` — search across multiple locations and naming conventions

Provide the exact pattern or symbol when known. Investigation-style prompts with prescribed steps usually fail because the premise is wrong — for those, use `general-purpose`.

## Related

- [[02_Capabilities/agents/general-purpose]] — for open-ended exploration
- [[02_Capabilities/agents/README]]
