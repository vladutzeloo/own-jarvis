---
title: Tool — Web Fetch
type: capability
tags: [capability, tool, web]
updated: 2026-05-08
---

# Web Fetch

Pull a specific URL and parse its content.

## When to use

- The user provided a URL to read or summarize
- Following up on a search result with a specific page
- Reading documentation, blog posts, articles

## When NOT to use

- For navigating a web app (logging in, clicking buttons) → use [[02_Capabilities/tools/claude-in-chrome]]
- For pages that require authentication
- For pages that render content client-side without server-rendered text — these will look empty to the fetcher

## Behavior

Returns the page's main content as text/markdown. Strips most chrome (headers, footers, ads). Reasonable handling of articles and documentation.

## Restrictions

Some domains are blocked for legal reasons. The block applies to all fetch methods — do NOT fall back to `curl`, `wget`, Python's `requests`, or any other library to bypass it. If a fetch fails, report it to the user and offer alternative sources.

## Related

- [[02_Capabilities/tools/web-search]] — find the URL first
- [[02_Capabilities/tools/claude-in-chrome]] — for interactive browser tasks
- [[02_Capabilities/tools/README]]
