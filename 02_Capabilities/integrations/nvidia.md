---
title: NVIDIA API (build.nvidia.com)
type: capability
tags: [capability, integration, nvidia, llm, inference]
updated: 2026-05-08
---

# NVIDIA API

NVIDIA's hosted inference catalog — a single OpenAI-compatible endpoint that fronts the NIM model catalog (Llama, Mixtral, Nemotron, embeddings, vision, ASR, TTS). Used when Jarvis needs an NVIDIA-served model rather than a Claude model — for benchmarking, multi-model agents, or workloads NVIDIA prices/serves better.

This is **not** an MCP connector and **not** a local GPU workload. It is a REST API call to `integrate.api.nvidia.com` and works from any surface with outbound HTTPS.

## Credentials

The key lives in `.env` at the repo root. The template is `.env.example`, which is committed; `.env` itself is gitignored and stays on the local machine.

```
NVIDIA_API_KEY=nvapi-...
NVIDIA_API_BASE=https://integrate.api.nvidia.com/v1
NVIDIA_DEFAULT_MODEL=meta/llama-3.1-70b-instruct
```

Get a key from [build.nvidia.com](https://build.nvidia.com/) — sign in, pick a model, click *Get API Key*. Personal-use keys come with a free tier; production usage requires an NVIDIA account with billing.

Each surface (Cowork on Windows, Claude Code on the web, CLI) keeps its own `.env`. Replicating the vault via `git pull` does **not** copy the secret — that is the point.

## Calling the API

The endpoint is OpenAI Chat Completions compatible, so any `openai`-style SDK works by overriding `base_url` and `api_key`.

### Python (openai SDK)

```python
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url=os.environ["NVIDIA_API_BASE"],
    api_key=os.environ["NVIDIA_API_KEY"],
)

resp = client.chat.completions.create(
    model=os.environ["NVIDIA_DEFAULT_MODEL"],
    messages=[{"role": "user", "content": "Summarise the VMES project in one line."}],
    temperature=0.2,
    max_tokens=200,
)
print(resp.choices[0].message.content)
```

Install: `pip install openai python-dotenv`.

### curl

```bash
set -a; source .env; set +a

curl -s "$NVIDIA_API_BASE/chat/completions" \
  -H "Authorization: Bearer $NVIDIA_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
        \"model\": \"$NVIDIA_DEFAULT_MODEL\",
        \"messages\": [{\"role\": \"user\", \"content\": \"hello\"}]
      }"
```

### PowerShell (Cowork on Windows)

```powershell
Get-Content .env | Where-Object { $_ -match '^[^#].+=' } | ForEach-Object {
    $name, $value = $_ -split '=', 2
    [Environment]::SetEnvironmentVariable($name, $value, 'Process')
}

Invoke-RestMethod -Uri "$env:NVIDIA_API_BASE/chat/completions" `
  -Method Post `
  -Headers @{ Authorization = "Bearer $env:NVIDIA_API_KEY" } `
  -ContentType 'application/json' `
  -Body (@{
      model    = $env:NVIDIA_DEFAULT_MODEL
      messages = @(@{ role = 'user'; content = 'hello' })
  } | ConvertTo-Json -Depth 5)
```

## Picking a model

`NVIDIA_DEFAULT_MODEL` is just the fallback. Override per call. Common picks:

| Use case | Model id |
|---|---|
| General reasoning | `meta/llama-3.1-70b-instruct` |
| Long context | `meta/llama-3.1-405b-instruct` |
| Cheap/fast | `meta/llama-3.1-8b-instruct` |
| Code | `nvidia/nemotron-4-340b-instruct` |
| Embeddings | `nvidia/nv-embedqa-e5-v5` |

Browse the live catalog at [build.nvidia.com/explore](https://build.nvidia.com/explore/discover) — model ids change as NVIDIA rotates the lineup. Don't pin an obsolete id in scripts; read it from `.env`.

## Egress and surface notes

- **Cowork (Windows)** and **Claude Code CLI** can call `integrate.api.nvidia.com` without restriction.
- **Claude Code on the web** uses an outbound allowlist (see [[02_Capabilities/runtime#Egress and network boundaries]]). NVIDIA's host has not been verified against that allowlist as of 2026-05-08 — if a call returns HTTP 403 with `x-deny-reason: host_not_allowed`, it is the sandbox proxy, not NVIDIA. Run the call from Cowork or the CLI in that case.

## Operational notes

- Treat the key like a Claude API key. Rotate via the NVIDIA dashboard if it leaks. Never paste it into a vault note, a chat, or a commit.
- Rate limits and quota live on the NVIDIA dashboard; surface them here only when Jarvis hits one.
- For function-calling and JSON mode, the OpenAI-compatible flags work on most chat models but not all — check the model card on build.nvidia.com before relying on them.

## Related

- [[02_Capabilities/runtime]] — egress rules per surface
- [[02_Capabilities/integrations/_index]] — sibling integrations
- [[02_Capabilities/connectors/README]] — MCP-based alternatives
