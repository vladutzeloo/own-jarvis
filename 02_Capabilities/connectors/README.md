---
title: Connectors — MCP Servers
type: moc
tags: [capability, connector, mcp, moc]
updated: 2026-05-08
---

# Connectors

MCP (Model Context Protocol) servers that expose third-party services as tools. Slack, Gmail, Calendar, Linear, Asana, Notion, etc.

## How connectors work

Each connector is an MCP server installed via Cowork. When connected, Jarvis sees the connector's tools (`mcp__<server>__<tool>`) and can call them like any built-in tool. Authentication and rate limits are handled by the connector.

## Discovery flow

When Vladimir asks for something that lives in an external app:

1. Check what's already installed (`list_connectors` or scan available tools).
2. If a relevant connector exists — use it.
3. If not, search the registry: `mcp__mcp-registry__search_mcp_registry` with relevant keywords.
4. If a match exists in the registry — `mcp__mcp-registry__suggest_connectors` to install it.
5. If nothing exists — fall back to [[02_Capabilities/tools/claude-in-chrome]] for web apps, or computer-use for native apps.

## Examples of when to suggest a connector

| Vladimir says... | Search keywords |
|---|---|
| "What's on my plate this sprint" | asana, jira, linear, project-management |
| "Ping the team that the build is green" | slack, teams, discord, chat |
| "Who's on call this week" | pagerduty, opsgenie, on-call |
| "Email Sarah about the meeting" | gmail, outlook, email |
| "What's on my calendar" | google-calendar, outlook-calendar |
| "Make a Canva design" | canva, design |

## Currently connected

> *Update this when adding/removing connectors.*

| Connector | Used for | Notes |
|---|---|---|
| _(none yet — see suggestions below)_ | | |

## First-party surfaces (Vladimir's own systems)

These aren't third-party MCPs — they're Vladimir's own products. Documented here because Jarvis still needs to know they exist and how to reach them.

| Surface | URL | Status | Project file |
|---|---|---|---|
| VMES marketing site | https://vmes.ro | Live, fetchable | [[04_Projects/vmes/site/_index]] |
| VMES CRM | https://crm.vmes.ro | Cert invalid — unreachable | [[04_Projects/vmes/crm/_index]] |
| VMES source repo | GitHub (URL pending) | URL not yet captured | [[04_Projects/vmes/repo/_index]] |
| NVIDIA API | https://build.nvidia.com | Planned integration | [[02_Capabilities/connectors/nvidia-api]] |

For the integration plan, see [[04_Projects/vmes/integrations/_index]].

## Suggested next connectors

Discussed with Vladimir 2026-05-08:

- **Notion** — docs and notes
- **Google Drive** — files
- **Microsoft 365** — SharePoint/OneDrive/Outlook/Teams (highest leverage for team-operating context)
- **Atlassian Rovo** — Jira + Confluence
- **Linear** — issues
- **Attio** — CRM (if not relying on crm.vmes.ro)

GitHub MCP did not appear in the Cowork registry under common search terms; see [[04_Projects/vmes/integrations/05-github-wiring]] for workarounds.

## Connector hygiene

- **Probe before automating.** Call a connector tool once in chat and inspect the response shape before building an artifact or workflow that depends on it.
- **Document quirks here.** When a connector's behavior surprises Jarvis, add a note. The next session won't remember without it.

## Related

- [[02_Capabilities/README]]
- [[02_Capabilities/tools/artifacts]] — common consumer of connector data
