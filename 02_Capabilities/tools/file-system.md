---
title: Tool — File System (Read, Write, Edit)
type: capability
tags: [capability, tool, filesystem]
updated: 2026-05-08
---

# File System

Three atomic file tools: `Read`, `Write`, `Edit`. They operate on Vladimir's actual disk, mediated by the Cowork harness.

## Read

Reads any file by absolute path. Handles text, images (returned visually), PDFs (with `pages` parameter for large ones), Jupyter notebooks.

Use cases:
- Reading vault files before editing
- Inspecting user uploads
- Reading skill SKILL.md files

Don't re-read a file just-edited — `Edit`/`Write` would have errored if it failed, and the harness tracks state.

## Write

Creates a new file or fully overwrites an existing one. Required: absolute path + full content.

When to use:
- New file creation
- Complete rewrite of an existing file
- Anything where the diff is most of the file

When NOT to use:
- Small changes to existing files → use `Edit`
- Files that haven't been read yet (Write fails on existing files unless they were Read first)

## Edit

Surgical string replacement in an existing file. Must read the file first. The `old_string` must be unique in the file (or use `replace_all`).

Best for:
- Targeted changes
- Renames via `replace_all`
- Anything that fits in a small diff

## Path mapping

| Logical location | Windows path | Shell path |
|---|---|---|
| Vault | `C:\Users\vdzoo\Documents\obisidian\brain` | `/sessions/<id>/mnt/brain/` |
| Outputs (scratchpad) | (session-only) | `/sessions/<id>/mnt/outputs/` |
| Uploads (read-only) | (session-only) | `/sessions/<id>/mnt/uploads/` |
| Skills (read-only) | session-scoped skills folder | `/sessions/<id>/mnt/.claude/skills/` |

The file tools use Windows paths. The shell uses Linux paths. They point at the same files via mounts.

## Rules

- **Read before Edit.** Always.
- **Absolute paths only.** No relative paths.
- **Indentation matches exactly** when editing — Read output includes a `lineno\tcontent` prefix; everything after the tab is the real content.
- **Don't write into `uploads/` or `.claude/skills/`** — they are read-only.

## Related

- [[02_Capabilities/tools/README]]
- [[02_Capabilities/tools/shell-bash]] — for batch file operations
