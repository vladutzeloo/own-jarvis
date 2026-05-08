---
title: Workflows — Recipe Library
type: moc
tags: [workflow, moc]
updated: 2026-05-08
---

# Workflows

Recipes for tasks that get done more than once. Each workflow is a step-by-step playbook with judgment calls noted explicitly. When Vladimir asks for one of these, Jarvis follows the recipe rather than reinventing.

## When something becomes a workflow

The first time → just do it.
The second time → consider writing it down.
The third time → definitely write it down.

If a workflow is invoked frequently and unambiguously, promote it to a [[02_Capabilities/skills/skill-creator|skill]] so it triggers automatically.

## Catalog

### Research
- [[03_Workflows/research/deep-research]] — multi-source investigation with synthesis
- [[03_Workflows/research/quick-lookup]] — fast factual answers

### Documents
- [[03_Workflows/documents/create-report]] — Word doc reports
- [[03_Workflows/documents/create-presentation]] — slide decks
- [[03_Workflows/documents/create-spreadsheet]] — data tables and models

### Productivity
- [[03_Workflows/productivity/daily-review]] — morning planning
- [[03_Workflows/productivity/weekly-review]] — Friday retrospective + next-week plan
- [[03_Workflows/productivity/inbox-zero]] — process the capture buffer
- [[03_Workflows/productivity/meeting-prep]] — prep for a specific meeting

### Communication
- [[03_Workflows/communication/draft-email]] — write an email in Vladimir's voice
- [[03_Workflows/communication/summarize-thread]] — distill a long thread

### Development
- [[03_Workflows/development/code-review]] — review a PR or diff
- [[03_Workflows/development/debug-session]] — systematic debugging

## How to add a new workflow

1. Pick the right subfolder (or create one if none fit).
2. Use the structure: trigger / when to use / when not to / steps / verification / related.
3. Add a row in the catalog above.
4. Cross-link to relevant capabilities in `02_Capabilities`.
