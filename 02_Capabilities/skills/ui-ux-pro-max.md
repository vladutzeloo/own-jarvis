---
title: UI/UX Pro Max — Design Intelligence
type: capability
tags: [capability, skill, ui, ux, design]
updated: 2026-05-08
source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
---

# UI/UX Pro Max

Project-scoped Claude skill that provides design intelligence for web and mobile UI work — 67 styles, 161 colour palettes, 57 font pairings, 161 product types with reasoning rules, 99 UX guidelines, and 25 chart types across 10 stacks. Lives at `.claude/skills/ui-ux-pro-max/` in this repo, so it loads automatically on Claude Code on the web and travels with the vault to Cowork and the CLI when they pull.

The skill is not an MCP connector and not a hosted API — it is a directory of CSV catalogs, Markdown rule files, and a Python script (`scripts/search.py`) that ranks recommendations by query.

## When to invoke

Run the skill any time the task changes how a feature **looks, feels, moves, or is interacted with** — designing a new page, refactoring a component, picking a colour scheme, reviewing UI for accessibility. The full activation rules live in `SKILL.md`'s "When to Apply" section; the short form:

- Page or component design (landing, dashboard, admin, modal, form, table, chart)
- Colour, typography, spacing, layout decisions
- Accessibility / contrast / keyboard-nav reviews
- Style selection ("which aesthetic fits this product?")

Skip it for backend, infra, or pure data work where no surface changes.

## How to call it

The skill exposes a CLI. Run from the repo root so the relative `data/` and `scripts/` paths resolve:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "<product-type> <industry> <keywords>" \
  --design-system -p "Project Name"
```

The output is a single ASCII panel with a recommended pattern, style, palette, typography, key effects, anti-patterns, and a pre-delivery checklist.

Domain-scoped variants (no full design system, just one slice):

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --stack react
```

Available `--domain` values map to the CSVs under `.claude/skills/ui-ux-pro-max/data/`: `style`, `color`, `typography`, `ux`, `product`, `landing`, `app-interface`, `charts`, `icons`.

## What we used it for

The first internal consumer is `apps/jarvis-desktop/`. We queried it with `"personal AI assistant admin dashboard analytics dark mode"`, captured the recommended palette (blue data + amber accent on near-black), typography (Fira Code / Fira Sans), and key effects (minimal glow, dark-to-light transitions), then translated that into `tailwind.config.js` and `src/index.css`. Rerun the same query when revising the system; record the new output as a follow-up entry to this section.

## Layout on disk

```
.claude/skills/ui-ux-pro-max/
├── SKILL.md          # full activation rules and CLI reference
├── skill.json        # manifest (name, version, platforms)
├── LICENSE           # MIT — Next Level Builder
├── data/             # CSV catalogs (styles, colors, fonts, products, ...)
└── scripts/
    ├── core.py
    ├── design_system.py
    └── search.py     # entry point
```

The upstream repo ships six sibling skills (`brand`, `design-system`, `design`, `slides`, `ui-styling`, `banner-design`) that we have **not** installed. Add them in a follow-up if a task actually needs them — installing all of them blindly would add ~4.9MB and seven extra activation surfaces for no benefit today.

## Updating

When the upstream skill releases a new version:

1. `git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill /tmp/uupm`
2. Replace `.claude/skills/ui-ux-pro-max/` with the new `/tmp/uupm/.claude/skills/ui-ux-pro-max/` plus the materialised `data/` and `scripts/` from `/tmp/uupm/src/ui-ux-pro-max/`. Symlinks should be expanded back into real files (the upstream uses symlinks that don't survive cleanly into our flat layout).
3. Bump the `updated:` field on this note and commit.

## Related

- [[02_Capabilities/skills/README]] — skills MOC
- [[02_Capabilities/runtime]] — surfaces and how skills load
- [[00_Meta/conventions]] — frontmatter expectations these CSVs are queried for
- `apps/jarvis-desktop/README.md` — the first project consuming this skill
