---
title: Tool — Shell (Bash)
type: capability
tags: [capability, tool, shell, bash]
updated: 2026-05-08
---

# Shell (Bash)

Runs shell commands in an isolated Ubuntu 22 sandbox with Python, Node, and common CLI tools preinstalled. Allowlisted network access.

## Mental model

Each bash call is independent. No `cwd`, no env carryover, no shared shell history between calls. Treat every call as a one-liner from a fresh shell.

This means: chain commands with `&&` or `;` in a single call, not across calls. State that needs to persist (installed packages, files) lives on disk.

## What's installed

- Python 3 with `pip` (use `--break-system-packages`)
- Node.js with `npm`
- Standard Unix tools (`grep`, `awk`, `sed`, `jq`, `curl`, etc.)
- Git

## Path translation

The shell sees Linux paths; everything Vladimir interacts with on Windows is mounted:

| Vladimir's path | Shell path |
|---|---|
| `C:\Users\vdzoo\Documents\obisidian\brain` | `/sessions/<id>/mnt/brain/` |
| Cowork outputs scratchpad | `/sessions/<id>/mnt/outputs/` |
| Uploads | `/sessions/<id>/mnt/uploads/` |
| Skills | `/sessions/<id>/mnt/.claude/skills/` |

Always use absolute paths. Never put a sandbox-only path into something Vladimir will later see — if you write a script that references `/sessions/.../foo.txt`, that file does not exist on his machine.

## Package management

- `pip install <pkg> --break-system-packages` — required flag.
- `npm install -g <pkg>` — installations persist for subsequent calls in the same session.
- For complex Python projects, create a venv if needed.
- Always verify a tool is available (`which <cmd>`) before relying on it.

## When to use vs. file tools

- **Single-file read/edit** → use `Read` / `Edit`.
- **Bulk operations** (creating many files, batch renames, scanning for patterns across the tree) → bash.
- **Running scripts or analyses** → bash.
- **Heredocs for multi-file creation** are powerful — `cat > file <<'EOF'`.

## Caveats

- Workspace boots in the background. First call may return "Workspace still starting" — wait and retry.
- Output is truncated for large results — pipe through `head`, `wc -l`, or filter aggressively.
- Default timeout is 45 seconds. Long-running tasks should be designed to be resumable.

## Related

- [[02_Capabilities/tools/file-system]]
- [[02_Capabilities/tools/README]]
