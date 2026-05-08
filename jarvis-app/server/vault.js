import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, relative, extname } from 'path';
import { execSync, exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const VAULT_PATH = process.env.VAULT_PATH || '/var/jarvis/vault';
const VAULT_REPO = process.env.VAULT_REPO || 'https://github.com/vladutzeloo/own-jarvis.git';
const SYNC_INTERVAL = parseInt(process.env.VAULT_SYNC_INTERVAL || '600000', 10);

// Clone vault if not present, then start periodic pull
export async function initVault() {
  if (!existsSync(VAULT_PATH)) {
    console.log(`[vault] Cloning ${VAULT_REPO} → ${VAULT_PATH}`);
    await execAsync(`git clone "${VAULT_REPO}" "${VAULT_PATH}"`);
    console.log('[vault] Clone complete');
  } else {
    await syncVault();
  }
  setInterval(syncVault, SYNC_INTERVAL);
}

export async function syncVault() {
  try {
    const { stdout } = await execAsync('git pull --rebase', { cwd: VAULT_PATH });
    if (!stdout.includes('Already up to date')) {
      console.log('[vault] Pulled updates:', stdout.trim());
    }
  } catch (err) {
    console.error('[vault] git pull failed:', err.message);
  }
}

// Recursively read all .md files; returns [{path, content}]
export async function readAllNotes() {
  const notes = [];
  await walk(VAULT_PATH, notes);
  return notes;
}

async function walk(dir, acc) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, acc);
    } else if (extname(entry.name) === '.md') {
      try {
        const content = await readFile(full, 'utf8');
        acc.push({ path: relative(VAULT_PATH, full), content });
      } catch {}
    }
  }
}

// Read a single note by vault-relative path
export async function readNote(relPath) {
  const full = join(VAULT_PATH, relPath);
  return readFile(full, 'utf8');
}

// Create or overwrite a note, then commit + push
export async function writeNote(relPath, content, commitMsg) {
  const full = join(VAULT_PATH, relPath);
  await mkdir(join(full, '..'), { recursive: true });
  await writeFile(full, content, 'utf8');
  await gitCommitPush(relPath, commitMsg || `update: ${relPath}`);
}

// Append a new episode to 06_Memory/episodes/
export async function writeEpisode(title, content) {
  const date = new Date().toISOString().slice(0, 10);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
  const relPath = `06_Memory/episodes/${date}-${slug}.md`;
  const body = `# ${title}\n\n*${new Date().toISOString()}*\n\n${content}\n`;
  await writeNote(relPath, body, `memory: add episode "${title}"`);
  return relPath;
}

async function gitCommitPush(relPath, msg) {
  try {
    await execAsync(`git add "${relPath}" && git commit -m "${msg}" && git push`, {
      cwd: VAULT_PATH,
    });
    console.log(`[vault] Pushed: ${msg}`);
  } catch (err) {
    console.error('[vault] git commit/push failed:', err.message);
  }
}

// List all notes with title (first # heading or filename)
export async function listNotes() {
  const notes = await readAllNotes();
  return notes.map(({ path, content }) => {
    const titleMatch = content.match(/^#\s+(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : path;
    return { path, title };
  });
}
