---
name: optimizely-composition
description: Use when planning or configuring CMS SaaS Visual Builder Experiences, shared site content, component availability, blueprints, application preview, tenant synchronization or publication.
---
# Optimizely composition and delivery

Optimizely Specialist owns editorial architecture and CMS operations; Developer owns code. First retain the assigned mode and [approval contract](../optimizely-migration-workflow/references/operation-contract.md). Phase 2 is read-only toward repo/tenant and writes handoffs only. This skill does not authorize tenant writes.

| Current operation | Read only this reference |
|---|---|
| Field/instance/placement decisions, missing component picker | [Editorial architecture](references/editorial-architecture.md) |
| Tenant inventory, model/asset/content changes, publication | [Tenant batches](references/tenant-batches.md) |
| CMS-connected preview, shared rendering, failed Kajoo preview | [Preview and fallback](references/preview-and-fallback.md) |
| Evidence/provenance for API behavior | [Official source map](references/official-sources.md) |

Resolve real connector/tool capabilities once for the assigned operation; prefer typed supported operations. Existing Kajoo coordination tools do not imply an Optimizely connector exists. If absent, use an available authenticated approved API/CLI/UI route with exact capabilities; if none exists, record the specific blocker. Never invent tool names or mark remote work complete from a local file.

Reuse installed-SDK patterns and current scoped validation. No routine SDK/node_modules reading. Only a concrete unresolved API/type or model/manifest/CMS validation error permits a targeted lookup; new preparation uses official supplied references and existing project patterns, not broad package exploration.

Return actual changed CMS IDs/configuration, approval/batch receipt, readback, remaining gaps and the next operation. Separate draft composition, live editor verification and public publication. QA provides independent acceptance.

## Release 1.5.5 qualification
Carry visual appearance, component placement, media dependencies, delivery shape and preview context from the assigned handoff through implementation and tenant acceptance. Apply the detailed contracts in this skill only when relevant; preserve on-demand loading, routine SDK-read restrictions and manual implementation starts.
