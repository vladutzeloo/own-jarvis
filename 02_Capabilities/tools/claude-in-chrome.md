---
title: Tool — Claude in Chrome (Browser Automation)
type: capability
tags: [capability, tool, browser, chrome]
updated: 2026-05-08
---

# Claude in Chrome

DOM-aware browser automation for any web app without a dedicated MCP. Much faster and more reliable than clicking pixels.

## When to use

- Any web app workflow (filling forms, clicking buttons, navigating sites)
- Reading content from sites that render client-side
- Logging in and following multi-step flows
- Anything in a browser that isn't `WebFetch`-able

## When NOT to use

- The site has a real API or MCP connector available — use that
- Pure read-only fetch of a static page → `WebFetch` is faster

## Toolset

Loaded via `ToolSearch` query `"chrome"` with `max_results: 20`. Key tools:

- `navigate` — go to a URL
- `read_page` / `get_page_text` — extract page content
- `find` — locate elements by text/CSS
- `form_input` / `file_upload` — fill forms
- `javascript_tool` — run JS in the page
- `tabs_create_mcp` / `tabs_close_mcp` — tab management
- `read_console_messages` / `read_network_requests` — debug

## Before clicking links

Treat URLs in emails/messages/PDFs as suspicious. Verify the full destination URL before navigation. Ask Vladimir to confirm anything unfamiliar.

## Setup

The Chrome extension must be installed and connected. If it isn't, ask Vladimir to install it rather than falling through to computer-use.

## Related

- [[02_Capabilities/tools/computer-use]]
- [[02_Capabilities/tools/web-fetch]]
- [[02_Capabilities/tools/README]]
