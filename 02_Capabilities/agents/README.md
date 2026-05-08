---
title: Agents — Sub-Claudes
type: moc
tags: [capability, agent, moc]
updated: 2026-05-08
---

# Agents

Sub-Claudes Jarvis can dispatch for parallel, isolated, or specialized work. Each one is its own context window — fresh memory, no awareness of the parent conversation.

## Mental model

An agent is a cleanroom. It gets the briefing in your prompt, runs a defined toolset, and returns a final report. Use them when:

- You need parallelism (run several searches at once)
- You want to keep raw output out of the parent context (large file dumps, exploratory grep)
- You need an independent perspective (code review, second opinion on a plan)
- The work is bounded and well-defined enough to brief in one shot

## How to brief an agent

Treat the agent like a smart colleague who just walked in. They haven't seen the conversation. They don't know what you've tried. They don't know why this matters.

- Explain the goal and why
- Describe what's already been ruled out
- Give enough surrounding context for judgment calls
- Specify response length if it matters ("under 200 words")

Terse command-style prompts produce shallow work. Don't write "based on your findings, fix the bug" — that pushes synthesis onto the agent. Write prompts that prove you understood: file paths, line numbers, what specifically to change.

## Available agent types

| Type | Best for | Detail |
|---|---|---|
| `Explore` | Fast read-only search — find files, grep symbols, "where is X defined" | [[02_Capabilities/agents/explore]] |
| `Plan` | Implementation planning, architectural design | [[02_Capabilities/agents/plan]] |
| `general-purpose` | Multi-step research, complex searches, broad investigations | [[02_Capabilities/agents/general-purpose]] |
| `claude-code-guide` | Questions about Claude Code, Agent SDK, Claude API | [[02_Capabilities/agents/claude-code-guide]] |
| `statusline-setup` | Configure Claude Code status line | (rare — skip page) |

## Parallelism

When agent tasks are independent, dispatch them in a single message with multiple Agent tool uses. They run concurrently, results return together.

## Trust but verify

The agent's summary describes what it intended, not necessarily what it did. When an agent writes code, check the actual changes before reporting work done.

## Related

- [[02_Capabilities/README]]
