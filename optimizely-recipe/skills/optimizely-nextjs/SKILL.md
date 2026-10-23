---
name: optimizely-nextjs
description: Use when preparing the bundled template or implementing approved Optimizely CMS SaaS Next.js components, shared page layout, styling, routing, preview or frontend release.
---
# Optimizely Next.js implementation

First retain the assigned [operation mode](../optimizely-migration-workflow/references/operation-contract.md). Phase 2 writes handoffs only; code examples never activate implementation. Developer owns code; Optimizely Specialist owns CMS configuration, QA verifies and Orchestrator coordinates.

For bundled setup use [template setup](references/bundled-template.md) and [pnpm recovery](references/pnpm-bootstrap.md). Use supplied existing repositories directly with their own manager. No clone/scaffold replacement. Reuse the recorded absolute tool path and installed SDK/CLI qualification.

For authorized implementation read the assigned component handoff only, plus exact shared sections when needed. Follow [implementation entry](../optimizely-migration-workflow/references/implementation-entry.md): source edit and local check first; registry/discovery and manifest review follow. Routine node_modules/SDK reads remain prohibited; only a concrete unresolved failing API/property permits a targeted lookup. Missing tenant credentials do not block local edits or justify repeated dry runs.

Apply [shared rendering and preview](../optimizely-composition/references/preview-and-fallback.md). Production pages, CMS preview and fixture adapters share renderers, layout and CSS. Required styles, fonts and header/footer cannot live only in a demo route. Reuse exact CMS instance/default/variant decisions from the approved page architecture. Preserve content semantics, nullable mapping and accessible interactions.

Page assembly is explicit: combine all approved components and shared layout, real route/heading hierarchy, data adapters and required styles; compare source at scoped devices and fix with QA. Conditional references: [rendering](references/rendering.md), [design system](references/design-system.md), [model validation](../optimizely-saas-modeling/references/model-validation.md), [preview](references/preview.md). These are a menu, not startup reading.

Before any user-approved deployment prepare build identity, configuration, recovery and [batch receipt](../optimizely-migration-workflow/assets/approval-batch.template.md). Host deployment and content publication are separate. On failed Kajoo preview provide the documented runnable download; mark unverified CMS behavior pending. No secrets in exports.

## Resolve reference ownership
Resolve a relative link from the directory containing that link, preserving ../ segments. Do not resolve all references under the currently loaded skill. The implementation entry belongs to optimizely-migration-workflow/references/implementation-entry.md; preview-and-fallback belongs to optimizely-composition/references/preview-and-fallback.md. Use the actual installed skill location, not a hardcoded sandbox root.
On a missing reference, perform one focused lookup in its expected owning skill. If unavailable, report whether it blocks the next edit and continue independent work. Do not repeatedly retry the same missing path or reread scratch copies of its failure.

## Release 1.5.5 qualification
Carry visual appearance, component placement, media dependencies, delivery shape and preview context from the assigned handoff through implementation and tenant acceptance. Apply the detailed contracts in this skill only when relevant; preserve on-demand loading, routine SDK-read restrictions and manual implementation starts.
