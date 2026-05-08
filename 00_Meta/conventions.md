---
title: Vault Conventions
type: spec
tags: [meta, conventions]
updated: 2026-05-08
---

# Vault Conventions

Conventions exist so any file can be read, linked, or rewritten without surprises. Follow them strictly.

## Frontmatter

Every markdown file starts with a YAML block:

```yaml
---
title: Human-readable title
type: one of [index, moc, spec, capability, workflow, project, knowledge, decision, learning, episode, template, note]
tags: [list, of, tags]
updated: YYYY-MM-DD
---
```

The `type` field is what tooling and Jarvis use to classify the file. Use it consistently.

Optional fields:

- `aliases` — alternate names for backlinks
- `status` — for projects: `active`, `paused`, `done`, `archived`
- `related` — explicit list of related files when wikilinks aren't enough
- `source` — for knowledge notes derived from external material

## Naming files

Files use lowercase with hyphens: `daily-review.md`, not `Daily Review.md` or `daily_review.md`. Exception: top-level READMEs, which stay capitalized for visibility.

Project files are prefixed with status when archived: `archive/2025-q4-website-redesign.md`.

Decisions, learnings, and episodes get an ISO date prefix: `2026-05-08-switched-to-uv.md`. This makes them sortable and unambiguous.

## Wikilinks

Use `[[path/to/file]]` for links inside the vault. Use `[[path/to/file|display text]]` when the display name should differ.

Avoid relative paths (`../`). Always use the vault-root-relative form. Obsidian resolves both, but the absolute form survives reorganization.

External links use standard markdown: `[label](https://...)`.

## Tags

Tags are lowercase, hyphenated, and additive — they describe attributes, not folders. Common tags:

- `meta`, `moc`, `index` — structural
- `capability`, `tool`, `skill`, `connector`, `agent`
- `workflow`, `recipe`
- `project`, `active`, `paused`, `archived`
- `decision`, `learning`, `episode`
- `domain/<name>` — knowledge domains, e.g. `domain/legal`, `domain/finance`

A file can have many tags. A folder can only have one location.

## Lists vs. prose

Default to prose. Use lists when the content is genuinely a list — capabilities catalog, file index, MOC. Avoid bulleted "explanations" — they almost always lose meaning.

In tables, keep cells short. If a cell needs a paragraph, it belongs in prose.

## Length

If a note runs longer than two screens, split it. The split is itself a useful thinking exercise — it forces the question "what is this note actually about?"

## Updating

When a file is meaningfully edited, bump the `updated` field. Don't bump for typo fixes.

When archiving, move the file (don't copy) and add an `archived` tag. Update any backlinks.

## What does NOT belong in the vault

- Secrets, API keys, passwords (use a password manager)
- Large binary blobs (link to them on disk or cloud)
- Generated artifacts that can be reproduced from inputs (regenerate as needed)
- Transient scratch (use `07_Inbox` and prune weekly)
