---
title: Skill — skill-creator (Build New Skills)
type: capability
tags: [capability, skill, meta]
updated: 2026-05-08
---

# Skill: skill-creator

Create, edit, evaluate, and optimize skills.

## Triggers

- "Make a new skill for X"
- "Improve the prompt of the Y skill"
- "Test how reliably this skill triggers"
- Any meta-work on skills themselves

## When to use

When Jarvis notices a class of task being repeated and the recipe should become a permanent capability. Three+ occurrences is a reasonable threshold.

## When NOT to use

- One-off task → just do it
- The recipe lives in this vault as a workflow ([[03_Workflows/README]]) — that's enough until it needs to be triggered automatically by keyword

## Workflow

1. Invoke via `Skill` tool with `skill: "skill-creator"`.
2. Define: skill name, description (used for triggering), trigger keywords, the actual instructions.
3. The description matters most — it's what the LLM uses to decide whether to trigger. Test with realistic phrasings.
4. Run evals to check trigger accuracy and content quality.

## Skill vs. workflow — when to escalate

A workflow ([[03_Workflows/README]]) is a recipe Jarvis reads when Vladimir explicitly invokes it. A skill triggers automatically when a keyword pattern matches. Promote workflow → skill when:

- The trigger is unambiguous from natural-language phrasing
- Vladimir asks for the same thing repeatedly without remembering the workflow name
- The recipe has gotchas Jarvis keeps forgetting between sessions

## Related

- [[02_Capabilities/skills/README]]
- [[03_Workflows/README]] — workflows are the lighter-weight alternative
