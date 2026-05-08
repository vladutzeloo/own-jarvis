---
title: Workflow — Debug Session
type: workflow
tags: [workflow, development, debugging]
updated: 2026-05-08
---

# Debug Session

Systematic debugging. The goal is to find the root cause, not just make the symptom go away.

## Trigger

- "Why is X broken"
- "Help me debug Y"
- A bug report or error message

## Steps

**1. Reproduce.** If you can't reliably reproduce, that's the first problem to solve. A bug you can't trigger is a bug you can't fix.

**2. Read the actual error.** Stack trace, log line, browser console. Don't guess from the symptom — the error usually points at the layer.

**3. Bisect.**
   - In time: when did it last work? `git log` and `git bisect` if needed.
   - In space: comment out half the code path. Does it still fail?

**4. Form a hypothesis. Test it.** Don't change five things at once — you won't know what fixed it.

**5. Find the root cause, not just a fix.** A symptom-suppressing fix tends to come back as a different symptom.

**6. Write the learning.** Once fixed, file a note in `06_Memory/learnings/`. Especially if the bug was sneaky — the next session won't remember.

## Anti-patterns

- Adding `try/except` around the call site to make the error stop printing.
- "Restart the service and see if it comes back" without understanding why.
- Trusting a fix you don't understand.

## Related

- [[06_Memory/learnings/README]]
- [[02_Capabilities/agents/explore]] — for "where is this called from"
