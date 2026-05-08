---
title: Integrations
type: moc
tags: [capability, integration, moc]
updated: 2026-05-08
---

# Integrations

External APIs Jarvis can call directly from a script, agent, or shell — distinct from [[02_Capabilities/connectors/README|connectors]] (MCP servers wired into Cowork) and [[02_Capabilities/tools/README|tools]] (atomic primitives baked into the surface).

An integration here is a hosted REST/SDK endpoint that needs:

- **A credential** stored in `.env` at the repo root (gitignored). Template at `.env.example`.
- **A short doc in this folder** describing the auth shape, the call shape, and any quirks Jarvis should remember.

Anything that ships an MCP server belongs under [[02_Capabilities/connectors/README]] instead.

## Index

| Integration | Used for | File |
|---|---|---|
| NVIDIA API | Hosted NIM model inference (Llama, Mixtral, Nemotron, etc.) | [[02_Capabilities/integrations/nvidia]] |
| Google Jules API | Dispatch async coding tasks to Jules' autonomous agent (stub — confirm endpoint before first call) | [[02_Capabilities/integrations/jules]] |

## Adding a new integration

1. Add the credential variable to `.env.example` with a comment block explaining where to obtain it.
2. Create a sibling file in this folder following the NVIDIA doc as a template.
3. Add a row to the index table above.
4. If the integration is the first call from a new language (Python, Node, PowerShell), also add a runnable snippet to the doc.

## Related

- [[02_Capabilities/runtime]] — surfaces and egress rules
- [[02_Capabilities/connectors/README]] — the MCP-based equivalent
- [[00_Meta/conventions]] — note: secrets never go inside the vault folders
