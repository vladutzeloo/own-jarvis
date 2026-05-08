---
title: Memory — Decisions, Learnings, Episodes
type: moc
tags: [memory, moc]
updated: 2026-05-08
---

# Memory

What happened. Append-only. The vault's autobiography.

## The three flavors

**Decisions** (`decisions/`) — choices made and their reasoning. Each decision file: what was decided, what was considered, what tipped it, what would change the call. Useful when the same kind of choice comes up again.

**Learnings** (`learnings/`) — things discovered that should outlive the moment. Bugs that were sneaky, advice that worked, surprises. Each one is a paragraph or two.

**Episodes** (`episodes/`) — what happened on a given day or in a notable session. Daily notes, weekly reviews, meeting notes, post-mortems. Time-stamped, sortable.

## Why separate?

The same event can produce all three: a decision was made (decisions), and along the way something was learned (learnings), in the context of a meeting (episodes). Cross-link, don't duplicate.

## File naming

All memory files use ISO date prefix: `2026-05-08-<slug>.md`. Sortable, unambiguous.

## Anti-patterns

- **Editing a memory file weeks later** — the dated record should reflect what was true then. If your view changed, write a new memory and link back.
- **Filing knowledge here.** A durable fact about how the world works is [[05_Knowledge/README]], not memory.
- **Skipping the episode for "small" days.** If you ran a [[03_Workflows/productivity/daily-review]] today, write the file.

## Durable facts

A small set of facts about Vladimir and his world that Jarvis should keep loaded: [[06_Memory/facts]].

## Related

- [[02_Capabilities/skills/consolidate-memory]] — periodic merge/prune
- [[99_Templates/decision]], [[99_Templates/learning]], [[99_Templates/daily-note]]
