---
title: Skill — schedule (Scheduled Tasks)
type: capability
tags: [capability, skill, schedule, automation]
updated: 2026-05-08
---

# Skill: schedule

Create scheduled tasks that run on demand or automatically on an interval.

## Triggers

- "Run this every morning", "remind me weekly", "check X daily"
- Anything that should happen on a recurrence without Vladimir prompting
- Cron-style automation

## When to use

When the task has a clear trigger (time-based or on-demand) and a clear outcome. Examples:

- Daily digest of new Slack messages
- Weekly review prompt every Friday at 4pm
- Pull a status report from a connector at the start of each week
- Check a webpage for changes hourly

## When NOT to use

- One-off tasks — just do them
- Tasks that need real-time human judgment at every step

## Workflow

1. Invoke `mcp__scheduled-tasks__create_scheduled_task` (or via the skill).
2. Specify: name, trigger (cron-like or "on demand"), the prompt that should run.
3. The scheduled task runs as a fresh Cowork session — design the prompt to be self-contained.
4. Test it once on demand before letting it run autonomously.

## Maintenance

- Review scheduled tasks monthly. Delete what's no longer useful.
- Use `mcp__scheduled-tasks__list_scheduled_tasks` to audit.

## Related

- [[02_Capabilities/skills/README]]
- [[03_Workflows/productivity/daily-review]] — a good candidate for scheduling
- [[03_Workflows/productivity/weekly-review]] — also a good candidate
