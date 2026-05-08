---
title: Tool — Task List (TodoWrite)
type: capability
tags: [capability, tool, todo, planning]
updated: 2026-05-08
---

# Task List

In-session task tracker. Renders as a widget in Cowork — Vladimir sees progress live.

## Tools

- `TaskCreate` — add a new task with subject, description, optional activeForm
- `TaskList` — show current tasks
- `TaskGet` — fetch one by ID
- `TaskUpdate` — change status, owner, dependencies
- `TaskStop` — abort a running task

## When to use

For virtually any non-trivial work — Cowork renders the list nicely and Vladimir wants to see progress. Skip only for:

- Pure conversation with no tool use
- Single-step tasks
- When Vladimir explicitly asks not to

## Convention

Tasks should:

- Have an imperative subject ("Build X", "Verify Y")
- Have an `activeForm` for the spinner ("Building X", "Verifying Y")
- Include a verification step at the end of any non-trivial task — fact-check, run tests, take screenshots, double-check claims

## Status flow

`pending` → `in_progress` → `completed`. Use `deleted` for cancellations. Mark `in_progress` BEFORE starting work, `completed` only when fully done. Don't mark complete on partial implementation.

## Related

- [[02_Capabilities/tools/README]]
