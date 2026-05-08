---
title: Git & Repo Conventions
type: spec
tags: [meta, conventions, git, repo]
updated: 2026-05-08
---

# Git & Repo Conventions

The vault is a git repository at `github.com/vladutzeloo/own-jarvis`. This file is the operating manual for any session — Jarvis or human — that touches git or GitHub for this repo.

For vault content rules (frontmatter, naming, links), see [[00_Meta/conventions]]. This file is strictly about version control.

## The repo

| Field | Value |
|---|---|
| Remote | `https://github.com/vladutzeloo/own-jarvis.git` |
| Default branch | `main` |
| Local working tree (Windows) | `C:\Users\vdzoo\Documents\obsidian\brain` |
| Local working tree (Claude Code web) | `/home/user/own-jarvis` |
| GitHub MCP scope | This repo only — calls to other repos are denied |

The bootstrap script `init-repo.ps1` is idempotent: safe to re-run on an already-initialized clone, will not wipe history.

## Branches

Branch names take the form `claude/<short-purpose>-<random6>` for any work Jarvis initiates — e.g. `claude/review-repo-bugs-n9L0B`. The random suffix avoids collisions when multiple sessions run concurrently.

For human-driven work, use `<initials>/<purpose>` or topic branches; the `claude/` prefix is reserved so Vladimir can grep for AI-authored branches at a glance.

Never push directly to `main`. Never force-push to `main` under any circumstances. Force-push to a feature branch is allowed only when the branch hasn't been reviewed yet, and never with `--no-verify`.

## Commits

Imperative subject, ≤ 70 characters, no trailing period. Body when the "why" isn't obvious from the diff. Wrap the body at ~80 characters.

Every commit Jarvis authors ends with a session footer:

```
<subject>

<body — explains why, not what>

https://claude.ai/code/session_<id>
```

Pre-commit hooks run; never bypass with `--no-verify` unless Vladimir says so explicitly. If a hook fails, fix the underlying issue and create a new commit — do not amend a hook-rejected commit.

Stage files by name (`git add path/to/file`), not `git add -A`, when the change is targeted. The vault has no secrets in tracked files, but the `.obsidian/` folder accumulates local state that should stay local.

## Pull requests

Every push that isn't going to `main` should have a PR. Open PRs as **draft by default**; promote to ready when Vladimir asks or when CI is green and the diff is final.

PR body template:

```
## Summary
- 1–3 bullets on what changed.

## Why
Short paragraph if the diff doesn't explain itself.

## Test plan
- [ ] Concrete checks the reviewer can run.

https://claude.ai/code/session_<id>
```

Title format mirrors the commit subject. PR titles are short; details belong in the body.

## Reviews

`gemini-code-assist[bot]` runs automatically on opened PRs. Treat its comments as a useful first pass — fix legitimate ones, push back on incorrect ones rather than silently dismissing them. Resolve threads when the underlying concern is addressed in a follow-up commit.

When a review comment is ambiguous, ask Vladimir before guessing. When it's wrong, reply with the reasoning rather than ignoring it.

## PR activity

A session can subscribe to a PR with `subscribe_pr_activity`. Once subscribed, CI failures and review comments arrive as `<github-webhook-activity>` events that wake the session — never poll, never `sleep` to wait for them.

Unsubscribe (or accept the auto-unsubscribe on merge/close) when the work is done.

## What does NOT belong in commits

- Secrets, tokens, `.env` files — gitignored, but verify before staging.
- The Obsidian local state files already excluded by `.gitignore` (`workspace.json`, `cache`, `data.json`).
- Generated artifacts that the vault treats as transient (`07_Inbox/` may contain noise; clean before committing).
- Large binaries — keep them on disk and link by path.

## Related

- [[00_Meta/conventions]] — vault content rules
- [[02_Capabilities/runtime]] — where the GitHub MCP fits in the runtime
- [[04_Projects/vmes/integrations/05-github-wiring]] — separate concern: wiring a *different* repo (vmes) into Jarvis
