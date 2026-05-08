---
title: Skill — pdf (PDF Processing)
type: capability
tags: [capability, skill, pdf]
updated: 2026-05-08
---

# Skill: pdf

Comprehensive PDF manipulation — extract text/tables, create new PDFs, merge/split, fill forms, OCR scanned PDFs.

## Triggers

- Any mention of PDF or .pdf files
- Form filling, merge, split, rotate, watermark, encrypt/decrypt
- Extract text or tables from PDFs
- OCR on scanned PDFs

## When to use

Any PDF task. The skill knows the right libraries to use (notably: not `pypdf`) and how to handle forms.

## When NOT to use

- Reading a PDF's content for chat-only response when the file is small enough that the harness already shows it as an image — Jarvis can read it directly. Use the skill when manipulating or producing a PDF.

## Workflow

1. Skill auto-loads on trigger, or invoke via `Skill` tool with `skill: "pdf"`.
2. Read SKILL.md before any PDF code.
3. For OCR: confirm the source is actually scanned (not just a text-PDF without a font subset) before throwing OCR at it.
4. For forms: extract form fields first, fill, save as new file (don't overwrite original).
5. Save outputs to `C:\Users\vdzoo\Documents\obsidian\brain\` or project folder.

## Common patterns

- **Merge:** combine N PDFs into one, preserving bookmarks if present.
- **Split:** by page range, by bookmark, or one-per-page.
- **Form fill:** read fields → populate from data source → save filled copy.
- **Extract tables:** for clean PDFs, parse directly. For scans, OCR first.

## Related

- [[02_Capabilities/skills/README]]
- [[02_Capabilities/skills/docx]] — sometimes content is better as a Word doc
