---
title: Skill — xlsx (Spreadsheets)
type: capability
tags: [capability, skill, xlsx, excel, spreadsheet]
updated: 2026-05-08
---

# Skill: xlsx

Create, read, edit, and clean Excel spreadsheets and CSV/TSV files. Supports formulas, formatting, charts, and data analysis.

## Triggers

- Any mention of Excel, .xlsx, .xlsm, .csv, .tsv, "spreadsheet", "data table"
- Budgets, financial models, charts, graphs
- Cleaning messy tabular data
- Reference to a spreadsheet by name ("the xlsx in my downloads")

## When to use

Whenever the primary deliverable is a spreadsheet. Even quick tabular outputs benefit — proper column types, formatted headers, frozen panes.

## When NOT to use

- The deliverable is a Word doc with a small table → use [[02_Capabilities/skills/docx]]
- The deliverable is a Python script that just happens to output CSV → write the script, no skill
- Standalone database pipeline or Google Sheets API integration → out of scope

## Workflow

1. Skill auto-loads on trigger, or invoke via `Skill` tool with `skill: "xlsx"`.
2. Read SKILL.md before generating files.
3. For data cleaning: identify malformed rows, misplaced headers, type mismatches before writing the output.
4. For modeling: use named ranges, sheet-per-section, validation rules.
5. Save to `C:\Users\vdzoo\Documents\obsidian\brain\` or project folder.

## Common patterns

- **Budget / financial model:** assumptions sheet, calc sheet, summary sheet. Inputs colored, formulas locked.
- **Data analysis:** raw sheet (untouched), clean sheet (typed/normalized), pivot/chart sheet.
- **Tracker:** one row per item, status column with data validation, conditional formatting on dates.

## Related

- [[02_Capabilities/skills/README]]
- [[03_Workflows/documents/create-spreadsheet]]
