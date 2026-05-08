---
title: Tool — Computer Use
type: capability
tags: [capability, tool, computer-use, desktop]
updated: 2026-05-08
---

# Computer Use

Take screenshots of Vladimir's desktop and control it with mouse, keyboard, and scroll.

## When to use

For native desktop apps (Maps, Notes, Finder, Photos, System Settings, third-party native apps) and cross-app workflows.

## When NOT to use

- The app has a dedicated MCP — use that instead. API > pixels.
- The target is a web app — use [[02_Capabilities/tools/claude-in-chrome]]. DOM-aware automation is much faster than clicking pixels.
- If a dedicated MCP errors out, debug it. Don't silently fall through to slower tiers.

## Access flow

Before any action, call `request_access` with the list of applications needed. The user approves each one explicitly.

## Tier system

The Cowork sandbox grants apps at one of three tiers based on category:

| Tier | What's allowed | Apps |
|---|---|---|
| `read` | Screenshots only — no clicks, no typing | Browsers (Safari, Chrome, Firefox, Edge, Arc) |
| `click` | Screenshots + left-click only | Terminals, IDEs (VS Code, JetBrains, iTerm, Terminal) |
| `full` | Everything | Most other apps |

For tier-`read` browsers, use [[02_Capabilities/tools/claude-in-chrome]] for interaction.
For tier-`click` IDEs, use [[02_Capabilities/tools/shell-bash]] for typing — clicks for buttons only.

## Look before you assert

When the user asks about app state ("what's open?", "is X running?"), take a screenshot. Don't answer from memory.

## Link safety

**Never click web links with computer-use.** If a native app shows a URL (in an email, message, PDF), open it via [[02_Capabilities/tools/claude-in-chrome]] instead. See the full URL before following.

## Financial actions

Budgeting and accounting apps are granted at full tier so Jarvis can categorize transactions and generate reports — but **never execute trades, place orders, send money, or initiate transfers**. Always ask Vladimir to perform those actions himself.

## Related

- [[02_Capabilities/tools/claude-in-chrome]]
- [[02_Capabilities/tools/README]]
