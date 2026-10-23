# Modeling deliverables and Hero walkthrough

## Required model outputs

Developer produces this contract from the current approved requirements; QA validates editorial semantics and Orchestrator records the revision. For implementation-only work, reuse the approved design and fill code/check/manifest/readback evidence as it becomes available. Unknown design fields are explicit decisions to resolve for affected units; future integration evidence is pending, not a blocker to unrelated local coding. Do not invent content or passed checks.

| Artifact | Required content |
|---|---|
| Version record | Environment/application, REST schema revision, selected SDK/starter/package pins, source checked date and verification level |
| Block catalogue | Type ID distinct from occurrence IDs, source evidence, business meaning, editor and independent/shared identity |
| Model matrix | Stable type key/base type, fields, required/localized decisions, constraints, relationships, count/order, indexing, lifecycle |
| Four views | Public routes, CMS editorial tree, composition tree and React tree with mappings |
| Route/asset maps | Site/root/host/locale, content keys, redirects, source assets, provenance/hash, alt/crop ownership |
| Authoring contract | Approved sections/settings, exact restriction mechanism, enforcement tests, unresolved capability gaps |
| Implementation mapping | Type → query/model selection → registry/renderer → deployed route → QA check |
| Import/change ledger | Source/target identities, before/after versions, operations, checkpoints and recovery |

A usable record distinguishes proposed design, source-checked syntax, compiled code, tenant readback and independent deployed tests. One status cannot stand in for all five.

## Worked decision: campaign Hero

Assume approved discovery identifies home and campaign Heroes with a heading, optional formatted body, image and CTA. This is an original illustrative scenario; remove any field not in actual evidence. Both occurrences share `MigrationHero` and its renderer, with independent content values. Navigation is site-shared. The campaign experience orders Hero, Card Grid and FAQ; React Button remains a design primitive.

The model has semantic fields heading/body/image/imageAlt/ctaLabel/ctaUrl. Alignment/theme/spacing belong in bounded display templates. The [contracts example](saas/contracts-and-shared-fields.md) supplies shared SEO field definitions on page/experience types, not shared SEO values and not an editor-tab workaround.

## SDK declaration

Source boundary: official [SDK modeling](https://github.com/episerver/content-js-sdk/blob/main/docs/3-modelling.md) and [experiences](https://github.com/episerver/content-js-sdk/blob/main/docs/8-experience.md), moving main checked 2026-09-18. Original illustrative TypeScript, not compiled or synchronized. Pin the selected package and verify property options/serialization before use.

```ts
import { contentType } from '@optimizely/cms-sdk';

export const MigrationHeroType = contentType({
  key: 'MigrationHero',
  displayName: 'Hero',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    heading: { type: 'string', isRequired: true },
    body: { type: 'richText', editorSettings: { preset: 'minimal' } },
    image: { type: 'contentReference', allowedTypes: ['_image'] },
    imageAlt: { type: 'string' },
    ctaLabel: { type: 'string' },
    ctaUrl: { type: 'url' },
  },
});
```

The omission of localization/indexing options above is not a default recommendation. Fill the field matrix and verify the pinned SDK can serialize those decisions; use an explicit setting where supported. Define CTA pair validation and missing-image behavior separately. The [inherited REST illustration](saas/defining-content-types-saas.md) has an unresolved flag-spelling conflict; use the [code-first procedure](saas/code-first-modeling.md) for the qualified SDK representation.

Section eligibility does not prove arbitrary layouts are locked. Qualify the exact Hero and proposed Card Grid/FAQ shapes using the [restriction matrix](saas/presentation-and-visual-builder-saas.md), including attempts to add unapproved nodes.

## REST content values, separately

Source boundary: [content REST guide](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-content-using-the-rest-api), checked 2026-09-18, REST v1. Original JSON demonstrates `POST /v1/content` initial-version/value wrappers. The all-zero container is a conspicuous illustrative identity and must be replaced; this request was not sent.

```json
{
  "contentType": "MigrationHero",
  "container": "00000000000000000000000000000000",
  "initialVersion": {
    "displayName": "Campaign Hero",
    "locale": "en",
    "properties": {
      "heading": { "value": "Explore the campaign" },
      "imageAlt": { "value": "" },
      "ctaLabel": { "value": "Read the story" },
      "ctaUrl": { "value": "/campaign/story" }
    }
  }
}
```

This creates a component instance shape, not an experience composition. The actual experience may store section content locally or reference an independently created item according to supported composition semantics. Choose one during qualification; do not create a duplicate standalone Hero if the intended authoring path stores it locally. Capture a known-good composition/readback or supported SDK serializer before generating layout nodes. Do not invent a `sections` REST property.

Upload authorized media first using [assets](saas/media-and-assets-saas.md), then set image/body values using the verified property-value format. Rewrite the CTA through the route map. Omit status when creating the initial draft; publication is a separate authorized transition.

## Delivery and renderer contract

Inspect the indexed schema/generated query for the actual Hero representation. It should deliver the selected content fields and composition/display metadata the renderer needs. A Graph image reference may expose identity/URL information without complete image data; resolve it through the pinned SDK path. REST `{ value: ... }` wrappers must not appear in frontend props unless a deliberate adapter defines them.

The renderer registers for `MigrationHero`, implements semantic heading/link/image behavior, maps approved style values to tokens, and binds editable fields using the selected SDK preview mechanism. It renders approved absent/long values without hardcoded source copy. Follow the connected [Next.js Hero walkthrough](../../optimizely-nextjs/references/block-walkthrough.md) for concrete registry, rendering, preview and deployment steps.

## Prove the whole path

| Check | Expected evidence |
|---|---|
| Schema | Readback shows correct fields/constraints and intended locale/indexing decisions |
| Ownership | Home Hero edit leaves campaign Hero unchanged; navigation edit affects both |
| Composition | Actual editor adds/reorders approved sections; rejected layouts are recorded |
| Rendering | Correct query/registry selection, responsive image/copy/CTA and optional values |
| Preview | Saved draft visible on deployed preview; anonymous public route unchanged |
| Publication | Authorized transition, published version in Graph, measured deployed freshness |
| Repeatability | Resume uses same target identities; conflicts do not overwrite edits |
| Independent QA | Matched desktop/mobile and editorial tests with actual evidence and status |

Publish the authorized fixture, observe the live route, then retain or restore it according to the release plan. Until executed, all tenant/editor/deployment rows remain unverified or blocked. Documentation-checked syntax is useful evidence, but it is not a successful migration.

## Consolidated implementation contract

For new screenshot documentation, populate the model portion of the [handoff template](../../website-visual-qa/assets/implementation-handoff.template.md): inventory, supporting types, complete property table, relationships, composition enforcement, display settings and renderer/delivery mapping. Link the exact approved model revision when already documented; avoid competing copies. SDK qualification fields may remain explicitly pending during semantic design. Resolve only the API pattern needed for the next edit, and inspect emitted flags before synchronization.

## Approved element coverage

Reconcile each approved annotation element ID or explicit occurrence field set with a model property, justified presentation/behavior-only role, or scoped unresolved mapping. Preserve exact observed content, ownership of section versus item actions and variant differences. Repeated content uses reusable definitions/collections; globally shared CMS instances are a separate approved decision. Do not invent properties because a generic example has them. Record mappings in the existing per-component handoff; no routine SDK exploration or new startup document.


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
