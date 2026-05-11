import { readAllNotes } from './vault.js';

// Priority folders/files to include first (checked against vault-relative path)
const PRIORITY_PATHS = [
  '01_Identity',
  '06_Memory/facts.md',
  '04_Projects',
  '02_Capabilities',
  '06_Memory/episodes',
  '03_Workflows',
];

const MAX_CHARS = 24000; // ~6k tokens, leaves room for conversation history

export async function buildSystemPrompt() {
  let notes;
  try {
    notes = await readAllNotes();
  } catch {
    return FALLBACK_PROMPT;
  }

  const sorted = sortByPriority(notes);

  // Group by vault label so context is clearly sectioned
  const primary = sorted.filter((n) => n.vault !== 'secondary');
  const secondary = sorted.filter((n) => n.vault === 'secondary');

  let context = buildSection('Primary Vault (own-jarvis)', primary, MAX_CHARS);
  if (secondary.length) {
    const remaining = MAX_CHARS - context.length;
    if (remaining > 500) {
      context += buildSection('Secondary Vault', secondary, remaining);
    }
  }

  return `${BASE_PROMPT}\n\n## Your Knowledge Base\n${context}`;
}

function buildSection(label, notes, maxChars) {
  let section = `\n\n### ${label}\n`;
  for (const { path, content } of notes) {
    const block = `\n--- ${path} ---\n${content.trim()}\n`;
    if (section.length + block.length > maxChars) break;
    section += block;
  }
  return section;
}

function sortByPriority(notes) {
  const getPriority = (path) => {
    for (let i = 0; i < PRIORITY_PATHS.length; i++) {
      if (path.startsWith(PRIORITY_PATHS[i])) return i;
    }
    return PRIORITY_PATHS.length;
  };
  return [...notes].sort((a, b) => getPriority(a.path) - getPriority(b.path));
}

const BASE_PROMPT = `You are Jarvis, Vladimir's personal AI assistant.

## Core rules
- Address Vladimir directly. Be concise and direct — no padding, no filler.
- Never use emojis unless Vladimir uses them first.
- Output markdown. Use headers, bullets, and code blocks where helpful.
- When you don't know something, say so clearly instead of guessing.
- You have full context about Vladimir's identity, projects, preferences, and history from his Obsidian vault(s) below.
- Today's date: ${new Date().toISOString().slice(0, 10)}

## What you can do
- Answer questions using the vault as context
- Help with VMES project (code, strategy, decisions)
- Remember things — say "save this" or "remember this" to write an episode to the vault
- Read and update vault notes (via the Vault tab)
- Sessions sync between phone and jarvis.exe — continue a conversation on either device`;

const FALLBACK_PROMPT = `${BASE_PROMPT}

(Vault not yet loaded — answering from general knowledge.)`;
