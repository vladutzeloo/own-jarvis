---
title: NVIDIA API Integration
type: capability
tags: [capability, connector, nvidia, api, integration]
updated: 2026-05-08
---

# NVIDIA API Integration

## Overview
Own-Jarvis will use NVIDIA API Catalog (hosted NIM models) for:
- High-performance inference (Llama 3.1, Mixtral, etc.)
- Provider abstraction layer for future Claude/Gemini/OpenAI swap
- Chat completions, embeddings, reranking capabilities

## Secret Management
Generate at: https://build.nvidia.com/settings/api-keys
Variable name: NVIDIA_API_KEY
NEVER commit real keys to GitHub/markdown/JSON/.env files
Store in local environment only
Reference only by variable name in all code/docs

## Environment Setup

**Windows PowerShell:**
```powershell
$env:NVIDIA_API_KEY="nvapi-xxx..."
```

**Linux/macOS:**
```bash
export NVIDIA_API_KEY="nvapi-xxx..."
```

## Example API Call
```python
import os
import requests

api_key = os.environ["NVIDIA_API_KEY"]
url = "https://integrate.api.nvidia.com/v1/chat/completions"

payload = {
    "model": "meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Summarize my notes into action items."}],
    "temperature": 0.2,
    "max_tokens": 300
}

response = requests.post(
    url,
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    },
    json=payload,
    timeout=60
)

print(response.json())
```

## LangChain Integration
```bash
pip install langchain-nvidia-ai-endpoints
```

```python
from langchain_nvidia_ai_endpoints import ChatNVIDIA
llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
```

## Future Implementation Path
```text
app/
├── integrations/
│   └── nvidia.py          # Provider class
│   └── provider_base.py   # Abstract base
├── backend/
│   └── llm_router.py      # Model selection
└── config/
    └── providers.json     # Model configs (no secrets)
```

## Test Checklist
- [ ] Key generated from build.nvidia.com
- [ ] Environment variable set (`echo $NVIDIA_API_KEY`)
- [ ] Test request returns 200 (use example above)
- [ ] LangChain init succeeds
- [ ] Rate limits understood (60 RPM free tier)
