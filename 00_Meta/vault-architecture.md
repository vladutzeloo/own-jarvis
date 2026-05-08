---
title: Vault Architecture
type: spec
tags: [meta, architecture]
updated: 2026-05-08
---

# Vault Architecture

The vault is organized as a layered system, not a flat list of folders. Each layer answers one question Jarvis asks before acting.

## The five layers

The numbered prefixes are not aesthetic — they encode load order. When Jarvis approaches a new task, it reads top to bottom:

The **identity layer** (`01_Identity`) answers *who am I serving*. It contains durable facts about Vladimir — role, goals, values, preferences. These rarely change, but they color every recommendation Jarvis makes. Without them, Jarvis is generic.

The **capability layer** (`02_Capabilities`) answers *what tools do I have*. It is a live registry of skills, MCP connectors, sub-agents, and built-in tools. When Vladimir asks for something Jarvis can't do, the answer goes here as a gap — turning the vault into a specification of the assistant's growing reach.

The **workflow layer** (`03_Workflows`) answers *how do we usually do this*. Recipes for repeatable tasks — research, document creation, weekly reviews. A workflow is just a checklist with judgment baked in. It's the difference between an LLM that re-invents how to write a report each time and one that knows how Vladimir wants reports written.

The **active state layer** (`04_Projects` and `07_Inbox`) is the working set — things in flight. Projects have structure; the inbox does not. Both get pruned regularly.

The **long-term layer** (`05_Knowledge` and `06_Memory`) is the archive. Knowledge is *what's true* — durable facts about domains Vladimir works in. Memory is *what happened* — decisions made, lessons learned, notable episodes. The split matters: knowledge ages on the scale of a field; memory ages on the scale of a life.

## Why this shape

A flat vault decays. PARA-style folders (Projects, Areas, Resources, Archives) work for personal note-taking but don't tell an AI what to do. The Jarvis vault separates **identity** (rarely written, always read), **capabilities** (a registry, not a journal), **workflows** (executable recipes), and **memory** (append-only) precisely because each has different read/write patterns.

The numbered prefixes serve two purposes: stable sort order in any file browser, and a mental hierarchy when grepping. `00_` is meta about the vault itself. `99_` is templates — last because they're support, not content.

## What lives where: the test

If you're not sure where a note belongs, ask:

- *Is it about Vladimir personally?* → `01_Identity`
- *Does it describe a tool or capability?* → `02_Capabilities`
- *Is it a step-by-step recipe?* → `03_Workflows`
- *Is it an active piece of work with a deadline or outcome?* → `04_Projects`
- *Is it a domain fact that will outlive this project?* → `05_Knowledge`
- *Is it a record of something that already happened?* → `06_Memory`
- *Is it a quick capture you'll process later?* → `07_Inbox`

If two folders both seem right, the higher-numbered one usually wins (specificity beats generality).

## Growth patterns

The vault should grow in three ways:

**Capabilities** grow when new tools, skills, or connectors come online. Each addition gets a file in `02_Capabilities` describing what it is, when to use it, and any gotchas.

**Workflows** grow when the same task is repeated and Jarvis notices a pattern. The first time Vladimir asks for a quarterly review, do it from scratch. The second time, write it down in `03_Workflows`. The third time, refine the existing recipe.

**Memory** grows continuously and is never pruned without ceremony. Decisions, learnings, and episodes are append-only; mistakes are kept as much as wins.

See [[00_Meta/conventions]] for file-level rules.
