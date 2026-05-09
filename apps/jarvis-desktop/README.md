# Jarvis Desktop

A multi-page web app that surfaces the Obsidian vault at the repo root as a Jarvis-themed dashboard. Built with Vite + React + TypeScript + Tailwind. Design intelligence comes from the `ui-ux-pro-max` skill at `.claude/skills/ui-ux-pro-max/`.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** with a custom Jarvis dark palette (blue data + amber accent, Fira Code/Sans typography)
- **react-router-dom** for the multi-page nav shell
- **gray-matter** to parse vault frontmatter at build time

No shadcn-cli yet — small set of Tailwind component classes in `src/index.css` (`card`, `badge`, `stat-value`, `stat-label`) cover the v1 surface.

## Data flow

`scripts/build-manifest.mjs` walks the vault folders (`00_Meta` through `99_Templates` plus root markdown), parses YAML frontmatter, and writes `src/data/manifest.json`. The script runs automatically before `npm run dev` and `npm run build` (via `predev`/`prebuild` hooks). Pages import the manifest via `@/lib/utils` — no runtime fetch, no server.

The manifest is committed so a fresh checkout can run `npm run dev` without first running the builder.

## Run

```bash
cd apps/jarvis-desktop
npm install
npm run dev    # http://localhost:5173
npm run build  # static bundle in dist/
```

## Pages

| Route            | Source folder      | Content |
|------------------|--------------------|--------|
| `/`              | (aggregate)        | Stats + recent activity |
| `/projects`      | `04_Projects`      | Type-`project` notes grouped by status, plus supporting files |
| `/memory`        | `06_Memory`        | Decisions / learnings / episodes timeline |
| `/capabilities`  | `02_Capabilities`  | Skills, tools, connectors, integrations, agents — counts + previews |
| `/inbox`         | `07_Inbox`         | Capture buffer |

## Adding a new page

1. Create `src/pages/<Page>.tsx`.
2. Register the route in `src/main.tsx` and the nav entry in `src/components/Layout.tsx`.
3. Use `notesIn()` / `notesOfType()` / `notesWithTag()` helpers from `@/lib/utils`.

## Design system reference

Driven by the `ui-ux-pro-max` skill — re-run for revised recommendations:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "personal AI assistant admin dashboard analytics dark mode" \
  --design-system -p "Jarvis Desktop"
```

Current spec captured in `tailwind.config.js` (palette + fonts) and `src/index.css` (component classes).
