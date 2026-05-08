---
title: Workflow — Create a Report
type: workflow
tags: [workflow, documents, report]
updated: 2026-05-08
---

# Create a Report

Word document with formal structure — executive summary, sections, conclusions.

## Trigger

- "Write a report on X"
- "Put together a report for the meeting"
- "Document the findings from Y"

## Steps

**1. Read the docx skill.** Always — even for "simple" reports. Invoke [[02_Capabilities/skills/docx]].

**2. Clarify scope.** Audience (technical, executive, public?), length target, formality, deadline. If unclear, ask once.

**3. Outline first.** Title, executive summary (1 paragraph), sections, conclusion. Get this right before generating prose — it's much cheaper to fix the outline than the doc.

**4. Generate the doc.** Follow the docx skill's guidance for headings, page numbers, TOC, letterheads as appropriate.

**5. Save it.** Default location: a project subfolder under [[04_Projects/README]] if it's project-bound, or `C:\Users\vdzoo\Documents\obsidian\brain` for general work.

**6. Surface the link.** Use a `computer://` link so Vladimir can open it directly.

## Verification step

Open the generated doc and skim it before declaring done. Check: TOC matches headings, no template placeholders left in, page numbers render, no broken cross-references.

## Common patterns

- **Executive summary first.** Even when the report is short. The summary is what gets read.
- **One claim per paragraph.** Resist multi-claim mega-paragraphs.
- **Charts in appendix unless central.** Don't bury the prose under graphics.

## Related

- [[02_Capabilities/skills/docx]]
- [[03_Workflows/documents/create-spreadsheet]] — when data needs more than a table
