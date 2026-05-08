import 'dotenv/config';
import express from 'express';
import { randomUUID } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initVault, readNote, writeNote, writeEpisode, listNotes, syncVault } from './vault.js';
import { createSession, getSession, listSessions, touchSession, addMessage, getMessages, deleteSession } from './db.js';
import { chat, healthCheck } from './ollama.js';
import { buildSystemPrompt } from './prompt.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JARVIS_SECRET;

if (!SECRET) {
  console.error('ERROR: JARVIS_SECRET env var is required');
  process.exit(1);
}

app.use(express.json({ limit: '2mb' }));
app.use(express.static(join(__dirname, '../public')));

// Auth middleware for all /api routes
app.use('/api', (req, res, next) => {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Health / status
app.get('/api/status', async (req, res) => {
  const ollama = await healthCheck();
  res.json({ ok: true, ollama });
});

// ── Chat ────────────────────────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  const { message, sessionId: clientSessionId } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: 'message required' });

  const sessionId = clientSessionId || randomUUID();
  touchSession(sessionId, message.slice(0, 60));
  addMessage(sessionId, 'user', message);

  // Build history for Ollama (last 20 messages)
  const history = getMessages(sessionId).slice(-20);
  const ollamaMessages = history.map((m) => ({ role: m.role, content: m.content }));

  // Inject system prompt
  const systemPrompt = await buildSystemPrompt();
  const messages = [{ role: 'system', content: systemPrompt }, ...ollamaMessages];

  try {
    const reply = await chat(messages);
    addMessage(sessionId, 'assistant', reply);

    // Auto-save episode if conversation is substantial
    maybeAutoSave(sessionId, message, reply);

    res.json({ reply, sessionId });
  } catch (err) {
    console.error('[chat] error:', err.message);
    res.status(502).json({ error: 'AI unavailable: ' + err.message });
  }
});

// Auto-save notable exchanges as vault episodes (fire and forget)
function maybeAutoSave(sessionId, userMsg, assistantMsg) {
  const lower = userMsg.toLowerCase();
  if (lower.includes('save this') || lower.includes('remember this') || lower.includes('note this')) {
    const title = userMsg.slice(0, 60).replace(/[^\w\s-]/g, '');
    const content = `**User:** ${userMsg}\n\n**Jarvis:** ${assistantMsg}`;
    writeEpisode(title, content).catch((e) => console.error('[episode] save failed:', e.message));
  }
}

// ── Sessions ────────────────────────────────────────────────────────────────

app.get('/api/sessions', (req, res) => {
  res.json(listSessions(50));
});

app.get('/api/sessions/:id', (req, res) => {
  const session = getSession(req.params.id);
  if (!session) return res.status(404).json({ error: 'Not found' });
  const messages = getMessages(req.params.id);
  res.json({ ...session, messages });
});

app.delete('/api/sessions/:id', (req, res) => {
  deleteSession(req.params.id);
  res.json({ ok: true });
});

// ── Vault ───────────────────────────────────────────────────────────────────

app.get('/api/vault', async (req, res) => {
  try {
    const notes = await listNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/vault/read', async (req, res) => {
  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'path required' });
  // Prevent path traversal
  if (path.includes('..')) return res.status(400).json({ error: 'invalid path' });
  try {
    const content = await readNote(path);
    res.json({ path, content });
  } catch {
    res.status(404).json({ error: 'Note not found' });
  }
});

app.post('/api/vault/write', async (req, res) => {
  const { path, content, commitMsg } = req.body;
  if (!path || !content) return res.status(400).json({ error: 'path and content required' });
  if (path.includes('..')) return res.status(400).json({ error: 'invalid path' });
  try {
    await writeNote(path, content, commitMsg);
    res.json({ ok: true, path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/vault/episode', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'title and content required' });
  try {
    const path = await writeEpisode(title, content);
    res.json({ ok: true, path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/vault/sync', async (req, res) => {
  try {
    await syncVault();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Boot ────────────────────────────────────────────────────────────────────

await initVault();
app.listen(PORT, () => console.log(`Jarvis API running on :${PORT}`));
