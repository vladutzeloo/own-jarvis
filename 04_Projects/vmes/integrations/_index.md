---
title: VMES — Integration Roadmap
type: project
tags: [project, vmes, integration]
updated: 2026-05-08
---

# VMES — Integration Roadmap

Five tracks for linking the vault to VMES. Sequenced by dependency.

## Tracks

| # | Track | Dependency | Status |
|---|---|---|---|
| 1 | Track as project | None | ✅ Done — folder exists |
| 2 | [[04_Projects/vmes/integrations/02-monitor-live-site\|Monitor live site]] | None | Spec ready, needs scheduled task |
| 3 | [[04_Projects/vmes/integrations/03-publish-vault-to-site\|Publish vault to site]] | Repo URL + decision on multi-page | Spec ready, blocked |
| 4 | [[04_Projects/vmes/integrations/04-pull-data-to-vault\|Pull live data to vault]] | CRM cert fix + API decision | Spec ready, blocked |
| 5 | [[04_Projects/vmes/integrations/05-github-wiring\|GitHub repo wiring]] | Repo URL | Spec ready, blocked |

## Sequencing

The dependency-respecting order: **2 → 5 → 3 → 4**.

Track 2 (monitoring) ships first because it has no dependencies — it just needs a scheduled task.

Track 5 (GitHub) ships second because the repo URL unlocks both 3 (publishing) and the metadata layer for 4.

Track 3 (publishing) ships third — needs the repo + a decision on whether vmes.ro stays single-page or grows.

Track 4 (data pull) ships last — needs the cert fix on crm.vmes.ro and a decision on what API surface to expose.

## Cross-cutting concerns

- **Secrets handling.** No API tokens, DB credentials, or production access tokens in the vault. Use a real secrets manager. Vault stores *the fact that* a credential exists and where it lives.
- **PII discipline.** Customer data pulled from the CRM should not be checked into the vault verbatim. Anonymize or aggregate before persisting.
- **Reversibility.** Each track should be undoable cleanly — disable the scheduled task, remove the publish hook, revoke the read-only credential — without breaking VMES itself.

## Related

- [[04_Projects/vmes/_index]]
