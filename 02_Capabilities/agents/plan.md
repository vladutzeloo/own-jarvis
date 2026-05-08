---
title: Agent — Plan
type: capability
tags: [capability, agent, planning]
updated: 2026-05-08
---

# Agent: Plan

Software architect agent. Designs implementation plans, identifies critical files, considers architectural trade-offs.

## When to use

- Before starting a non-trivial implementation
- "How should I structure this refactor?"
- Trade-off analysis between approaches
- When the answer requires reading several files and synthesizing across them

## When NOT to use

- Trivial changes that don't need a plan
- Pure information lookup → use `Explore`
- The plan is already obvious

## Briefing

Describe:
- The goal (what should be true after)
- The current state (what's there now)
- Any constraints (tech stack, perf, backwards compat)
- What "done" looks like

Ask for a step-by-step plan with critical files identified. Push back on the returned plan if it skips trade-offs.

## Related

- [[02_Capabilities/agents/general-purpose]]
- [[02_Capabilities/agents/README]]
