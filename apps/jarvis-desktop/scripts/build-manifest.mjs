#!/usr/bin/env node
// Walk the Obsidian vault (../../) and emit a JSON manifest the app reads.
// Every committed .md file with frontmatter contributes one entry.

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VAULT_ROOT = path.resolve(__dirname, "../../..");
const OUT = path.resolve(__dirname, "../src/data/manifest.json");

const VAULT_FOLDERS = [
  "00_Meta",
  "01_Identity",
  "02_Capabilities",
  "03_Workflows",
  "04_Projects",
  "05_Knowledge",
  "06_Memory",
  "07_Inbox",
  "99_Templates",
];

const SKIP_DIRS = new Set([".git", ".obsidian", ".claude", "node_modules", ".trash"]);

function normalizeUpdated(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

async function walk(dir, root, acc = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, root, acc);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const rel = path.relative(root, full).split(path.sep).join("/");
      const raw = await fs.readFile(full, "utf8");
      const parsed = matter(raw);
      const fm = parsed.data ?? {};
      acc.push({
        path: rel,
        folder: rel.split("/")[0],
        slug: rel.replace(/\.md$/, ""),
        title: fm.title ?? path.basename(rel, ".md"),
        type: fm.type ?? null,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        status: fm.status ?? null,
        updated: normalizeUpdated(fm.updated),
        aliases: fm.aliases ?? [],
        excerpt: parsed.content.trim().split("\n").slice(0, 3).join(" ").slice(0, 240),
        wordCount: parsed.content.trim().split(/\s+/).filter(Boolean).length,
      });
    }
  }
  return acc;
}

async function main() {
  const all = [];
  for (const folder of VAULT_FOLDERS) {
    await walk(path.join(VAULT_ROOT, folder), VAULT_ROOT, all);
  }
  const root = await fs.readdir(VAULT_ROOT, { withFileTypes: true });
  for (const entry of root) {
    if (entry.isFile() && entry.name.endsWith(".md")) {
      const full = path.join(VAULT_ROOT, entry.name);
      const raw = await fs.readFile(full, "utf8");
      const parsed = matter(raw);
      const fm = parsed.data ?? {};
      all.push({
        path: entry.name,
        folder: "_root",
        slug: entry.name.replace(/\.md$/, ""),
        title: fm.title ?? path.basename(entry.name, ".md"),
        type: fm.type ?? null,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        status: fm.status ?? null,
        updated: normalizeUpdated(fm.updated),
        aliases: fm.aliases ?? [],
        excerpt: parsed.content.trim().split("\n").slice(0, 3).join(" ").slice(0, 240),
        wordCount: parsed.content.trim().split(/\s+/).filter(Boolean).length,
      });
    }
  }

  all.sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? ""));

  const counts = all.reduce((acc, n) => {
    acc[n.folder] = (acc[n.folder] ?? 0) + 1;
    return acc;
  }, {});

  const manifest = {
    generatedAt: new Date().toISOString(),
    vaultRoot: path.basename(VAULT_ROOT),
    counts,
    total: all.length,
    notes: all,
  };

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(
    `Wrote ${all.length} notes across ${Object.keys(counts).length} folders to ${path.relative(process.cwd(), OUT)}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
