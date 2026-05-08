---
title: Tool — Web Search
type: capability
tags: [capability, tool, web]
updated: 2026-05-08
---

# Web Search

Search the live web for current information.

## When to use

- Anything time-sensitive (news, releases, current officeholders, recent events)
- Topics likely to have changed since the model's knowledge cutoff (end of May 2025)
- Verifying claims that matter — don't assert from training data when the cost of being wrong is real
- Looking up current product features, pricing, documentation versions

## When NOT to use

- Stable factual knowledge from before the cutoff (math, physics, well-known history)
- The user already provided the source material in the conversation
- Trivial questions where chat-only is faster and good enough

## How to use well

- **Start broad, narrow fast.** First query is for the lay of the land; second query is sharpened by what the first revealed.
- **Cite specifics.** When the user is making a decision based on web info, link the source(s) in the response.
- **Triangulate on contested claims.** One source is rarely enough for anything controversial.

## Limitations

- Some domains are blocked (legal/compliance restrictions). When `WebSearch` or `WebFetch` reports a domain blocked, do NOT try to retrieve it via shell `curl`/`wget` or other tools. The block applies to all fetching methods, not just these tools.
- Search results can be stale or SEO-spammed. Read past the first result.

## Related

- [[02_Capabilities/tools/web-fetch]] — pull a specific URL once you have it
- [[02_Capabilities/tools/README]]
