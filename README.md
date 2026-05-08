---
title: Jarvis Knowledge Vault
type: index
tags: [meta, root]
updated: 2026-05-08
---

# Jarvis Knowledge Vault

This vault is the long-term memory and operating manual for **Jarvis** — the AI assistant working alongside Vladimir. Every folder serves a specific purpose; nothing is decorative.

## How to read this vault

Jarvis: when starting any non-trivial task, walk the vault in this order:

1. **[[01_Identity/about|Who am I serving]]** — load context about Vladimir
2. **[[01_Identity/preferences|Preferences]]** — communication style, output format
3. **[[02_Capabilities/README|What can I do]]** — capability surface
4. **[[03_Workflows/README|How do we usually do this]]** — recipe library
5. **[[06_Memory/README|What have we learned before]]** — past decisions and episodes

## Map of the vault

| Folder | Role | Entry point |
|---|---|---|
| `00_Meta` | Vault about the vault | [[00_Meta/index]] |
| `01_Identity` | Who Vladimir is, what he wants | [[01_Identity/about]] |
| `02_Capabilities` | Tools, skills, connectors, agents | [[02_Capabilities/README]] |
| `03_Workflows` | Repeatable recipes | [[03_Workflows/README]] |
| `04_Projects` | Active work | [[04_Projects/README]] |
| `05_Knowledge` | Durable subject knowledge | [[05_Knowledge/README]] |
| `06_Memory` | Decisions, learnings, episodes | [[06_Memory/README]] |
| `07_Inbox` | Capture buffer | [[07_Inbox/README]] |
| `99_Templates` | Reusable file templates | [[99_Templates/README]] |

## Operating principles

- **Prose over bullets** in all knowledge files. Lists are for catalogs, not arguments.
- **One idea per file.** If a note grows past two screens, split it.
- **Link, don't duplicate.** Every reference uses `[[wikilinks]]`.
- **Frontmatter is required.** See [[00_Meta/conventions]].
- **Memory beats search.** When Jarvis learns something durable, write it to `06_Memory` — not the inbox.

See [[00_Meta/vault-architecture]] for the design rationale and [[00_Meta/index]] for the master MOC.
