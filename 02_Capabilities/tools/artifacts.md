---
title: Tool — Artifacts (Live HTML Views)
type: capability
tags: [capability, tool, artifact]
updated: 2026-05-08
---

# Artifacts

Persistent, self-contained HTML pages that pull fresh data from connectors each time they're opened. Saved across sessions.

## Mental model

An artifact is a page Vladimir can re-open whenever he wants the latest view. Built once, refreshed on each open. Think of it as turning a one-shot answer into a living dashboard.

## When to use

When Vladimir would want to look at this view again, and the underlying data changes. Examples:

- Status pages or trackers (project board, hiring pipeline, support queue)
- Recurring reports (weekly metrics, team digest)
- Interactive explorers over connector data
- Anything that would otherwise be a markdown table he'd ask for again next week

## When NOT to use

- One-shot answers that won't be revisited
- Pure explanations with no live data
- Anything where the data won't change

## What's available inside the page

- `window.cowork.callMcpTool(name, args)` — call any connector tool listed in `mcp_tools`
- `window.cowork.askClaude(prompt, data[])` — quick Haiku inference for summaries/classification
- `window.cowork.runScheduledTask(taskId)` — trigger a scheduled task (requires user activation)
- Reads are cached transparently
- The header has a Reload button — don't add your own
- `localStorage` works — persist filter/sort choices

## Allowed CDN libraries

Chart.js, Grid.js, and Mermaid only. Anything else must be inlined.

## Before building

Call the connector tool once in chat first. Look at the actual response shape. MCP wrappers often rename parameters and reshape output relative to the underlying API — build the artifact's parser around what you observed, not what you assumed.

## Offering one without being asked

After answering a question by calling a connector and rendering a list/table in chat, suggest: "Turn this into a live artifact I can re-open later." If Vladimir says yes, build it.

## Related

- [[02_Capabilities/tools/README]]
- [[02_Capabilities/connectors/README]] — what data the artifact can pull
