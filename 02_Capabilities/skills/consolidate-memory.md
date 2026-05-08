---
title: Skill — consolidate-memory
type: capability
tags: [capability, skill, memory]
updated: 2026-05-08
---

# Skill: consolidate-memory

Reflective pass over memory files — merge duplicates, fix stale facts, prune the index.

## Triggers

- "Clean up my memory"
- "Consolidate the vault"
- Periodic maintenance prompt (e.g. monthly)

## When to use

When [[06_Memory/README]] has grown enough that duplicates and contradictions are likely. Run quarterly at minimum.

## Workflow

1. Invoke skill.
2. It reads the memory tree, identifies overlapping entries, proposes merges.
3. Vladimir approves or edits.
4. Stale facts are flagged for review or deletion.

## Related

- [[02_Capabilities/skills/README]]
- [[06_Memory/README]]
