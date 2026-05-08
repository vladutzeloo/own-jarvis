import { readAllNotes } from './vault.js';

// Priority folders to include (in order). Others are skipped to keep context tight.
const PRIORITY_PATHS = [
  '01_Identity',
  '06_Memory/facts.md',
  '04_Projects',
  '02_Capabilities',
  '06_Memory/episodes',
  '03_Workflows',
];

const MAX_CHARS = 24000; // ~6k tokens, leaves room for conversation history

// Build the Jarvis system prompt dynamically from vault content
export async function buildSystemPrompt() {
  let notes;
  try {
    notes = await readAllNotes();
  } catch {
    return FALLBACK_PROMPT;
  }

  // Sort notes by priority order
  const sorted = sortByPriority(notes);

  let context = '';
  for (const { path, content } of sorted) {
    const block = `\n\n--- ${path} ---\n${content.trim()}`;
    if (context.length + block.length > MAX_CHARS) break;
    context += block;
  }

  return `${BASE_PROMPT}\n\n## Your Knowledge Base (Obsidian Vault)\n${context}`;
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
- You have full context about Vladimir's identity, projects, preferences, and history from his Obsidian vault below.
- Today's date: ${new Date().toISOString().slice(0, 10)}

## What you can tell Vladimir you can do
- Answer questions using his vault as context
- Help with VMES project (code, strategy, decisions)
- Remember things (ask him to say "save this" and you'll suggest writing an episode)
- Read and update his vault notes (via the web app's Vault tab)`;

const FALLBACK_PROMPT = `${BASE_PROMPT}

(Vault not yet loaded — answer from general knowledge.)`;
