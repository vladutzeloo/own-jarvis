import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, relative, extname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Primary vault — own-jarvis (this repo)
const VAULT_PATH = process.env.VAULT_PATH || '/var/jarvis/vault';
const VAULT_REPO = process.env.VAULT_REPO || 'https://github.com/vladutzeloo/own-jarvis.git';

// Optional second vault (e.g. a second Obsidian vault or app folder on Windows, synced via GitHub)
const VAULT2_PATH = process.env.VAULT2_PATH || '';
const VAULT2_REPO = process.env.VAULT2_REPO || '';

const SYNC_INTERVAL = parseInt(process.env.VAULT_SYNC_INTERVAL || '600000', 10);

// Clone a vault if not present, then sync it
async function ensureVault(repoUrl, localPath, label) {
  if (!localPath) return;
  if (!existsSync(localPath)) {
    console.log(`[vault:${label}] Cloning ${repoUrl} → ${localPath}`);
    await execAsync(`git clone "${repoUrl}" "${localPath}"`);
    console.log(`[vault:${label}] Clone complete`);
  } else {
    await syncOne(localPath, label);
  }
}

async function syncOne(localPath, label) {
  if (!localPath || !existsSync(localPath)) return;
  try {
    const { stdout } = await execAsync('git pull --rebase', { cwd: localPath });
    if (!stdout.includes('Already up to date')) {
      console.log(`[vault:${label}] Pulled updates:`, stdout.trim());
    }
  } catch (err) {
    console.error(`[vault:${label}] git pull failed:`, err.message);
  }
}

export async function initVault() {
  await ensureVault(VAULT_REPO, VAULT_PATH, 'primary');
  if (VAULT2_REPO && VAULT2_PATH) {
    await ensureVault(VAULT2_REPO, VAULT2_PATH, 'secondary');
  }
  setInterval(syncVault, SYNC_INTERVAL);
}

export async function syncVault() {
  await syncOne(VAULT_PATH, 'primary');
  if (VAULT2_PATH) await syncOne(VAULT2_PATH, 'secondary');
}

// Recursively read all .md files from a directory; returns [{path, content, vault}]
async function walk(dir, acc, vaultLabel) {
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
      await walk(full, acc, vaultLabel);
    } else if (extname(entry.name) === '.md') {
      try {
        const content = await readFile(full, 'utf8');
        const basePath = vaultLabel === 'primary' ? VAULT_PATH : VAULT2_PATH;
        acc.push({ path: relative(basePath, full), content, vault: vaultLabel });
      } catch {}
    }
  }
}

// Read all notes from all configured vaults
export async function readAllNotes() {
  const notes = [];
  await walk(VAULT_PATH, notes, 'primary');
  if (VAULT2_PATH && existsSync(VAULT2_PATH)) {
    await walk(VAULT2_PATH, notes, 'secondary');
  }
  return notes;
}

// Read a single note by vault-relative path (primary vault only)
export async function readNote(relPath) {
  const full = join(VAULT_PATH, relPath);
  return readFile(full, 'utf8');
}

// Create or overwrite a note in the primary vault, then commit + push
export async function writeNote(relPath, content, commitMsg) {
  const full = join(VAULT_PATH, relPath);
  await mkdir(join(full, '..'), { recursive: true });
  await writeFile(full, content, 'utf8');
  await gitCommitPush(VAULT_PATH, relPath, commitMsg || `update: ${relPath}`);
}

// Append a new episode to 06_Memory/episodes/ in the primary vault
export async function writeEpisode(title, content) {
  const date = new Date().toISOString().slice(0, 10);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
  const relPath = `06_Memory/episodes/${date}-${slug}.md`;
  const body = `---\ntitle: "${title}"\ntype: episode\ndate: ${date}\n---\n\n# ${title}\n\n*${new Date().toISOString()}*\n\n${content}\n`;
  await writeNote(relPath, body, `memory: add episode "${title}"`);
  return relPath;
}

async function gitCommitPush(vaultPath, relPath, msg) {
  try {
    await execAsync(`git add "${relPath}" && git commit -m "${msg}" && git push`, {
      cwd: vaultPath,
    });
    console.log(`[vault] Pushed: ${msg}`);
  } catch (err) {
    console.error('[vault] git commit/push failed:', err.message);
  }
}

// List all notes with title (first # heading or filename)
export async function listNotes() {
  const notes = await readAllNotes();
  return notes.map(({ path, content, vault }) => {
    const titleMatch = content.match(/^#\s+(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : path;
    return { path, title, vault };
  });
}
