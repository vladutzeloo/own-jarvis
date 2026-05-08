---
title: Capabilities — Overview
type: moc
tags: [capability, moc]
updated: 2026-05-08
---

# Capabilities

The set of things Jarvis can actually do, organized by mechanism. Before recommending an approach, check what's on the menu.

For *where* all of this runs — which Claude surface, which model, which connectors are wired in — see [[02_Capabilities/runtime]] first. Capability docs assume the runtime is correct.

## The four layers of capability

**Skills** are pre-packaged best-practice playbooks for a class of task — making a Word doc, building a PowerPoint, filling a PDF form. They live as `SKILL.md` files and load on demand. See [[02_Capabilities/skills/README]].

**Tools** are atomic primitives — read a file, run a shell command, fetch a URL, click a pixel. They are always available. See [[02_Capabilities/tools/README]].

**Connectors** are MCP servers that expose third-party services — Slack, Gmail, Calendar, Linear, Asana, etc. They go in and out of scope as Vladimir installs and uninstalls them. See [[02_Capabilities/connectors/README]].

**Integrations** are hosted REST/SDK endpoints Jarvis calls directly with a credential from `.env` — NVIDIA API and similar. Distinct from connectors (no MCP) and tools (not built into the surface). See [[02_Capabilities/integrations/_index]].

**Agents** are sub-Claudes Jarvis can dispatch for parallel or specialized work — exploration, planning, code review. See [[02_Capabilities/agents/README]].

## Decision tree: which layer to use

When Vladimir asks for something, walk this tree top to bottom:

1. **Is this a class of task with a packaged skill?** (Word doc, PDF, spreadsheet, presentation, scheduled task) → use the skill, even for "simple" cases. The skill knows things Jarvis would otherwise reinvent.
2. **Is this in a connected third-party app?** → use the connector MCP if available. Faster and more reliable than browser automation.
3. **Is this a complex research or codebase task that benefits from parallelism or isolation?** → spawn an agent.
4. **Otherwise** → use built-in tools directly.

## Filing new capabilities

When Jarvis discovers a tool or pattern that isn't yet documented here, that's the signal to write a new file in this section. The vault should be a strict superset of what Jarvis remembers between sessions.

## Index

- [[02_Capabilities/runtime]] — the substrate everything below runs on
- [[02_Capabilities/skills/README]]
- [[02_Capabilities/tools/README]]
- [[02_Capabilities/connectors/README]]
- [[02_Capabilities/integrations/_index]]
- [[02_Capabilities/agents/README]]
