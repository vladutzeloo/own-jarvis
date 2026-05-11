const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5-coder:7b';

// Send messages to Ollama and return the assistant reply text
export async function chat(messages, { stream = false } = {}) {
  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream,
      options: {
        temperature: 0.7,
        num_ctx: 8192,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ollama error ${res.status}: ${text}`);
  }

  if (stream) {
    return res.body; // caller handles the stream
  }

  const data = await res.json();
  return data.message?.content || '';
}

// Check Ollama is reachable and the model is available
export async function healthCheck() {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`);
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = await res.json();
    const models = data.models?.map((m) => m.name) || [];
    const modelAvailable = models.some((m) => m.startsWith(OLLAMA_MODEL.split(':')[0]));
    return { ok: true, models, modelAvailable, using: OLLAMA_MODEL };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
