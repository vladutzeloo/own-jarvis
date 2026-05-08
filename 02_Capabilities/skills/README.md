---
title: Skills — Registry
type: moc
tags: [capability, skill, moc]
updated: 2026-05-08
---

# Skills

Skills are pre-packaged best-practice instructions that Jarvis loads on demand. Each skill is a `SKILL.md` file in `~/AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/.../skills/<name>/`. When triggered, Jarvis reads the skill before acting.

## When to use a skill

Always, when one applies. Skills capture sharp edges (Word's table-of-contents quirks, PDF form-filling pitfalls, PowerPoint layout traps) that would otherwise have to be rediscovered each time. Even for what looks like a trivial task, the skill is the path.

## Currently installed

| Skill | Use when | File |
|---|---|---|
| `docx` | Any Word document — letters, reports, memos, templates | [[02_Capabilities/skills/docx]] |
| `xlsx` | Any spreadsheet — Excel, CSV, TSV | [[02_Capabilities/skills/xlsx]] |
| `pptx` | Any slide deck or presentation | [[02_Capabilities/skills/pptx]] |
| `pdf` | Read, create, merge, split, OCR, fill PDF forms | [[02_Capabilities/skills/pdf]] |
| `schedule` | Create scheduled tasks (one-off or recurring) | [[02_Capabilities/skills/schedule]] |
| `skill-creator` | Build, edit, evaluate, optimize new skills | [[02_Capabilities/skills/skill-creator]] |
| `setup-cowork` | Guided setup — install plugins, connect tools | [[02_Capabilities/skills/setup-cowork]] |
| `consolidate-memory` | Reflective pass over memory files | [[02_Capabilities/skills/consolidate-memory]] |

## How skills are invoked

The Cowork harness watches for keywords in the user message and the SKILL.md description. When matched, Jarvis sees a `<command-message>` and the skill's full prompt expands inline. Jarvis can also invoke a skill explicitly via the `Skill` tool.

## What Jarvis must do

- **Read the SKILL.md before acting.** Even when confident — skills update.
- **Combine skills when appropriate.** A "create a Word doc with a chart from this data" task uses `xlsx` then `docx`.
- **Don't guess the path.** When unsure if a skill exists, check [[02_Capabilities/skills/README]] (this file) — every installed skill is listed.

## Adding a new skill

Use [[02_Capabilities/skills/skill-creator]]. New skills get a row in the table above and their own file in this folder.
