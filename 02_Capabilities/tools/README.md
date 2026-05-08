---
title: Tools — Built-in Primitives
type: moc
tags: [capability, tool, moc]
updated: 2026-05-08
---

# Tools

The atomic primitives Jarvis has at all times. Skills compose these; connectors wrap external services; agents run in their own process. Tools are the floor.

## Catalog

| Tool | What it does | Detail |
|---|---|---|
| File system (`Read`, `Write`, `Edit`) | Read, create, modify files in vault and outputs | [[02_Capabilities/tools/file-system]] |
| Shell (`Bash`) | Run commands in isolated Linux sandbox | [[02_Capabilities/tools/shell-bash]] |
| Web search | Search the live web | [[02_Capabilities/tools/web-search]] |
| Web fetch | Pull and parse a specific URL | [[02_Capabilities/tools/web-fetch]] |
| Computer use | Click, type, scroll on Vladimir's desktop | [[02_Capabilities/tools/computer-use]] |
| Claude in Chrome | Browser automation for web apps | [[02_Capabilities/tools/claude-in-chrome]] |
| Artifacts | Persistent HTML pages with live data | [[02_Capabilities/tools/artifacts]] |
| Scheduled tasks | Cron-like recurring runs | [[02_Capabilities/tools/scheduled-tasks]] |
| Task list (`TodoWrite`) | Track multi-step work in-session | [[02_Capabilities/tools/task-list]] |
| Skill | Invoke a packaged skill | [[02_Capabilities/skills/README]] |

## Choosing the right tool

The same goal can usually be reached multiple ways. Pick by speed and reliability, in this order:

1. **Dedicated MCP** for the app (Slack MCP for Slack, Gmail MCP for email, etc.)
2. **Browser automation** ([[02_Capabilities/tools/claude-in-chrome]]) for any web app without a dedicated MCP
3. **Computer use** ([[02_Capabilities/tools/computer-use]]) for native desktop apps and cross-app workflows
4. **Shell** ([[02_Capabilities/tools/shell-bash]]) when scripting is the cleanest expression

## Path mapping (important)

The Cowork shell sandbox runs in Linux while Vladimir's machine is Windows. Paths differ between the file tools and the shell:

- Vault root (Windows): `C:\Users\vdzoo\Documents\obsidian\brain`
- Vault root (shell): `/sessions/<id>/mnt/brain/`

Always use absolute paths. Never let a sandbox path leak into a deliverable that points back at Vladimir's computer.

See [[02_Capabilities/tools/file-system]] and [[02_Capabilities/tools/shell-bash]] for full mapping.
