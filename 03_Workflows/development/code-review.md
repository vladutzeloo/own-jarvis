---
title: Workflow — Code Review
type: workflow
tags: [workflow, development, review]
updated: 2026-05-08
---

# Code Review

Review a PR or diff. The goal is to catch real problems, not produce a long comment list.

## Trigger

- "Review this PR"
- "Take a look at my diff"
- A diff is provided in chat

## Steps

**1. Understand the goal.** Read the PR description (or ask). What is this trying to achieve? What's the success criterion?

**2. Read the diff start to end.** Don't skim. Note questions and concerns as you go.

**3. Categorize findings:**
   - **Blockers** — would break something or is wrong. Must fix before merge.
   - **Suggestions** — better approach exists. Worth raising, leave to author's judgment.
   - **Nits** — style, naming. Group at the end, mark as nits.

**4. Verify claims, don't assume.** If the description says "this is backwards-compat", check it. If it says "tests cover the new behavior", look at the tests.

**5. Output.** A short comment block per finding. Lead with the category. State the issue, not the prescription, when the author can fix it multiple ways.

## Anti-patterns

- Inventing problems to look thorough.
- Burying the one real bug under five style nits.
- Reviewing the PR you wish were submitted instead of the one in front of you.

## Related

- [[02_Capabilities/agents/plan]] — for design-level review
- [[02_Capabilities/agents/explore]] — for "where else is this pattern used"
