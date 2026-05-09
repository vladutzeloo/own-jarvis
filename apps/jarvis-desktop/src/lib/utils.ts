import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import manifestData from "@/data/manifest.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface VaultNote {
  path: string;
  folder: string;
  slug: string;
  title: string;
  type: string | null;
  tags: string[];
  status: string | null;
  updated: string | null;
  aliases: string[];
  excerpt: string;
  wordCount: number;
}

export interface VaultManifest {
  generatedAt: string;
  vaultRoot: string;
  counts: Record<string, number>;
  total: number;
  notes: VaultNote[];
}

export const manifest = manifestData as VaultManifest;

export function notesIn(folder: string): VaultNote[] {
  return manifest.notes.filter((n) => n.folder === folder);
}

export function notesOfType(...types: string[]): VaultNote[] {
  return manifest.notes.filter((n) => n.type && types.includes(n.type));
}

export function notesWithTag(tag: string): VaultNote[] {
  return manifest.notes.filter((n) => n.tags.includes(tag));
}

export function recentNotes(limit = 8): VaultNote[] {
  return [...manifest.notes]
    .filter((n) => n.updated)
    .sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? ""))
    .slice(0, limit);
}
