import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';
import { join } from 'path';

const DB_DIR = process.env.DB_PATH || '/var/jarvis/data';
mkdirSync(DB_DIR, { recursive: true });

const db = new Database(join(DB_DIR, 'jarvis.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL REFERENCES sessions(id),
    role TEXT NOT NULL CHECK(role IN ('user','assistant')),
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

export function createSession(id, title) {
  const now = Date.now();
  db.prepare(
    'INSERT INTO sessions (id, title, created_at, updated_at) VALUES (?, ?, ?, ?)'
  ).run(id, title, now, now);
  return { id, title, created_at: now, updated_at: now };
}

export function getSession(id) {
  return db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
}

export function listSessions(limit = 50) {
  return db
    .prepare('SELECT * FROM sessions ORDER BY updated_at DESC LIMIT ?')
    .all(limit);
}

export function touchSession(id, title) {
  const now = Date.now();
  const existing = getSession(id);
  if (existing) {
    db.prepare('UPDATE sessions SET updated_at = ? WHERE id = ?').run(now, id);
  } else {
    createSession(id, title || 'Untitled');
  }
}

export function addMessage(sessionId, role, content) {
  const now = Date.now();
  db.prepare(
    'INSERT INTO messages (session_id, role, content, created_at) VALUES (?, ?, ?, ?)'
  ).run(sessionId, role, content, now);
}

export function getMessages(sessionId) {
  return db
    .prepare('SELECT role, content, created_at FROM messages WHERE session_id = ? ORDER BY created_at ASC')
    .all(sessionId);
}

export function deleteSession(id) {
  db.prepare('DELETE FROM messages WHERE session_id = ?').run(id);
  db.prepare('DELETE FROM sessions WHERE id = ?').run(id);
}

export default db;
