---
title: Skill — docx (Word documents)
type: capability
tags: [capability, skill, docx, word]
updated: 2026-05-08
---

# Skill: docx

Create, read, and edit Microsoft Word documents (.docx) with professional formatting.

## Triggers

- Any mention of "Word doc", "word document", ".docx"
- Requests for reports, memos, letters, templates with formal formatting
- Tables of contents, headings, page numbers, letterheads
- Find-and-replace in Word files, tracked changes, comments
- Inserting or replacing images in documents

## When to use

When the deliverable is a Word file. Default to docx for any "report" or "memo" request unless the user specifies otherwise.

## When NOT to use

- PDFs → use [[02_Capabilities/skills/pdf]]
- Spreadsheets → use [[02_Capabilities/skills/xlsx]]
- Slide decks → use [[02_Capabilities/skills/pptx]]
- Markdown notes for the vault — write directly, no skill needed

## Workflow

1. Skill auto-loads when triggered, or invoke via `Skill` tool with `skill: "docx"` (or `anthropic-skills:docx`).
2. Read the SKILL.md before generating any code or files.
3. Follow the skill's guidance for the specific task type — letterhead, TOC, tables, etc.
4. Save final output to `C:\Users\vdzoo\Documents\obisidian\brain\` or a project subfolder.

## Common patterns

- **Report:** prose-heavy, headings, optional TOC, page numbers in footer.
- **Memo:** "TO/FROM/DATE/RE" header block, tight prose, no TOC.
- **Letter:** sender block, date, recipient block, salutation, body, signature block.
- **Template:** placeholders the user can fill in — keep formatting, blank the content.

## Related

- [[02_Capabilities/skills/README]]
- [[03_Workflows/documents/create-report]]
