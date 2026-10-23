---
name: optimizely-saas-modeling
description: Use when learning CMS terminology, creating code-first models or designing or changing Optimizely CMS SaaS content models, contracts, Visual Builder sections, assets, taxonomy, access, localization, publishing or repeatable migration imports.
---
# Optimizely CMS SaaS modeling

In recipe 1.5.0 follow the [operation contract](../optimizely-migration-workflow/references/operation-contract.md). Phase 2 writes documentation only. Use [field selection](references/field-selection.md) and optimizely-composition for placement/shared-instance/blueprint decisions. Handoff field tables lead with plain-language types and rationale; technical examples do not authorize source edits.


Developer owns model code; Optimizely Specialist reviews editorial architecture and owns approved tenant batches; QA independently verifies; Orchestrator owns scope and approvals. Target CMS SaaS and Next.js. The normal path is controlled Visual Builder composition: editors change content and add/reorder approved sections. A fixed content area is an alternative requiring a recorded scope decision, not a silent substitute.

For an explicit implementation request from approved artifacts, use [implementation-only entry](../optimizely-migration-workflow/references/implementation-entry.md): reuse the semantic model and supplied SDK pattern, then write/type-check the first required model. Do not inspect node_modules or SDK documentation before that edit; only an actual SDK API/type compiler error or model/manifest/CMS validation error permits a targeted declaration/schema lookup. Record the correction and continue; report modeling conflicts without blocking independent work. Renderer-only corrections do not require a model rewrite. Consult [code-first modeling](references/saas/code-first-modeling.md) for the next operation; generate/review the manifest after code exists and before tenant synchronization.

During initial preparation, use the [shared CMS glossary](references/common/cms-glossary.md), [model/config example](assets/code-first/README.md) and [pinned source ledger](references/sdk-source-ledger.md) as needed. A recorded qualification replaces repeated background reading; load a topic below only for a concrete decision or API gap.

Read [architecture](references/architecture.md) and the [migration contract](references/migration-contract.md) when designing a new model. An already reviewed model supplies those decisions during implementation. Read existing tenant definitions before synchronization; missing tenant access does not block local model/UI work. Separate semantic units, shared types, shared instances and React primitives; reuse the approved four mapped trees. Model only observed or approved capabilities.

## Topic guide

Prepare component contracts using the [supported modeling contract](references/supported-model-contract.md); embed the applicable verified subset in the component handoff. This covers property grammar, arrays, ownership, defaults/enforcement and SDK-version mismatch. It is not an extra full-document startup read. After editing models, use [model validation](references/model-validation.md) to distinguish local preflight, full schema checks and tenant acceptance. Unknown property keys must fail checks rather than be hidden by type casts. Routine SDK reading stays prohibited after the first edit; unresolved concrete errors permit only the relevant lookup.

| Decision | Read |
|---|---|
| Optimizely SaaS architecture, content concepts, ownership and four trees | [Architecture](references/architecture.md), [modeling decisions](references/modeling.md) |
| Type/instance identity and editorial granularity | [Content model](references/common/content-model-overview.md) |
| Field choices, validation, links, rich text and indexing | [Properties](references/common/properties-and-property-types.md), [field worksheet](references/properties.md) |
| REST definitions versus SDK declarations versus Graph results | [Defining types](references/saas/defining-content-types-saas.md) |
| Shared SEO fields and official SDK contract / extends | [Contracts](references/saas/contracts-and-shared-fields.md) |
| Approved sections, elements, styles, blueprints and restriction evidence | [Visual Builder](references/saas/presentation-and-visual-builder-saas.md) |
| Media identity, alt text, crops and delivery | [Assets](references/saas/media-and-assets-saas.md) |
| Delivery schema, indexing, queries and preview/public separation | [Graph](references/saas/content-graph-and-delivery-api-saas.md) |
| Classification and filters | [Taxonomy](references/common/taxonomies-and-categories.md) |
| Variations and audience selection | [Personalization](references/common/personalization-and-visitor-groups.md) |
| Authoring, creation, delivery and API authority | [Permissions](references/common/permissions-and-access-rights.md) |
| Draft, review, publication, schedule and recovery | [Lifecycle](references/common/workflows-and-versioning.md) |
| Application roots, hosts, routes and locales | [Multisite/localization](references/common/multisite-and-localization.md) |
| Scoped writes and interrupted imports | [Management](references/management.md), [evolution/import](references/schema-evolution-and-import.md) |
| Verification boundaries and source conflicts | [Adaptation notes](references/adaptation-notes.md), [source ledger](references/sources.md) |

Return the model/route matrices, restriction evidence and version record defined in the migration contract. Official SDK syntax is documented; whether it compiles and serializes correctly is established only against pinned project packages. SDK examples use `isRequired` and `isLocalized` for the inspected implementation. Inherited direct-REST payload spellings remain unverified until the target API is qualified; the source ledger records the conflicting schemas. Do not mix representations or assume SDK and REST defaults agree.

Read tenant state before scoped tenant writes, reuse existing authorization, preserve unrelated content, and checkpoint identities. Verify management readback, Graph data, editor behavior and deployed output separately. Without a tenant, implement authorized local models/renderers and report integration checks blocked; deliver a proposal when design is the requested scope. Continue the complete block path in optimizely-nextjs and acceptance in website-visual-qa. PaaS references are optional historical comparisons only.

When authoring a new screenshot handoff, Developer fills the complete model inventory, supporting types/contracts and property tables in the [handoff template](../website-visual-qa/assets/implementation-handoff.template.md), following its [contract](../website-visual-qa/references/implementation-handoff.md). QA supplies visual evidence, not approval of hidden CMS semantics. During implementation, consume existing approved definitions directly; reuse recorded semantic-to-SDK mappings. New mapping research belongs to documentation/preparation; during implementation follow the concrete-error-only lookup policy above, not qualification per property or occurrence.

## Version namespaces

Recipe/skills release versions (for example 1.3.6 or 1.3.7) are independent of Optimizely SDK and CLI package versions. Never compare them or raise a compatibility blocker from their numeric difference. Record recipeVersion separately from sdkPackage/sdkResolvedVersion and cliPackage/cliResolvedVersion, using repository dependency records during preparation. During implementation reuse the recorded versions; package fingerprinting is not an exception to the prohibition on routine node_modules reading. A fingerprint records provenance, not proof of compatibility. Reuse qualified repository patterns. A concrete unsupported API, property or validation error can block its affected operation; a different recipe number cannot. A pattern verified against SDK 3 is not automatically verified against SDK 2 either. Record the exact affected mapping, evidence and independent next action instead of a blanket version blocker. No dependency upgrade or broad SDK exploration follows from a version difference.

## Property-specific requiredness

Common metadata is not universally valid for every property kind. Omit `isRequired` on `component` properties; apply approved requiredness to supported child fields and track component presence separately. Use the supplied correction and current generated-manifest preflight without routine SDK reading.

## Validation coverage matrix

Use [the versioned matrix](references/validation-matrix.md) during preparation or exact-error recovery. Embed relevant rules in component handoffs; do not introduce a mandatory startup reread. Report path-level unvalidated constraints alongside preflight errors.


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.

## Release 1.5.5 qualification
Carry visual appearance, component placement, media dependencies, delivery shape and preview context from the assigned handoff through implementation and tenant acceptance. Apply the detailed contracts in this skill only when relevant; preserve on-demand loading, routine SDK-read restrictions and manual implementation starts.
