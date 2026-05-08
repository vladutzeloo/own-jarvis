---
title: Workflow — Create a Spreadsheet
type: workflow
tags: [workflow, documents, spreadsheet]
updated: 2026-05-08
---

# Create a Spreadsheet

Data table, financial model, tracker, or analysis output as Excel.

## Trigger

- "Make a spreadsheet for X"
- "Build a budget / model / tracker"
- "Clean up this CSV"

## Steps

**1. Read the xlsx skill.** Always. Invoke [[02_Capabilities/skills/xlsx]].

**2. Identify the type.** Different patterns:
   - **Tracker:** one row per item, status column, dates, conditional formatting
   - **Model:** assumptions sheet, calc sheet, summary sheet — colors distinguish input from formula
   - **Analysis:** raw sheet (untouched), clean sheet (typed), pivot/chart sheet
   - **Cleanup:** identify malformed rows, type mismatches, header issues *before* writing output

**3. Structure before populating.** Decide sheets, named ranges, validation rules first.

**4. Lock formulas, color inputs.** Standard convention: yellow fill for inputs, no fill for formulas, gray for derived.

**5. Charts and pivots last.** They depend on stable data — don't build them until the data layout is settled.

**6. Save it.** Project folder or vault root.

## Verification step

Pick one calculated cell at random and trace its inputs. If the dependency chain isn't clean, the model has rot.

## Related

- [[02_Capabilities/skills/xlsx]]
