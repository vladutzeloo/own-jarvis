---
title: Tool — Scheduled Tasks
type: capability
tags: [capability, tool, automation, schedule]
updated: 2026-05-08
---

# Scheduled Tasks

Cron-like recurring runs that fire as fresh Cowork sessions. Each scheduled task is a self-contained prompt that runs without Vladimir present.

## Tools

- `mcp__scheduled-tasks__create_scheduled_task` — register a new task
- `mcp__scheduled-tasks__list_scheduled_tasks` — audit existing tasks
- `mcp__scheduled-tasks__update_scheduled_task` — change schedule or prompt

## Designing a good scheduled task

Because the task runs in a fresh session, the prompt has no memory of prior runs. It must be self-contained:

- State the goal in one sentence at the top.
- Reference vault files explicitly via absolute paths if context matters.
- Specify the output destination — usually a file in `04_Projects/` or `06_Memory/episodes/`.
- Include any tools/connectors the run depends on (so the harness loads them).

## Good candidates

- Daily digest of new messages from a connector
- Weekly review prompt every Friday
- Monthly memory consolidation
- Hourly check of a webpage for changes

## Bad candidates

- Tasks that need real-time judgment at every step
- One-offs (just do them)
- Anything that produces sensitive output without a destination

## Maintenance

Audit monthly via `list_scheduled_tasks`. Delete stale tasks. Tune prompts that produce low-value output.

## Related

- [[02_Capabilities/skills/schedule]] — the higher-level skill wraps this
- [[02_Capabilities/tools/README]]
