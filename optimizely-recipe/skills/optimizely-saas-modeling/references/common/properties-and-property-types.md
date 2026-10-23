# SaaS properties and property choices

## Choose from the editorial task

The following is design guidance. For every field record business meaning, storage type, requiredness, locale ownership, validation, indexing intent, null behavior and renderer. “Looks like a card” does not settle any of those decisions.

| Need | Candidate | Decision to settle |
|---|---|---|
| Short semantic copy | string | Plain text, meaningful length and whitespace policy |
| Formatted body | richText | Allowed formatting and supported JSON/HTML renderer |
| Link destination only | url | Internal rewrite, external schemes and locale routing |
| Link plus title/text/target | link | Actual management value and delivery shapes |
| Asset/independent item identity | contentReference | Allowed targets and data expansion |
| Inline or referenced content | content | Reuse, lifecycle and composition compatibility |
| Fixed embedded schema | component | Local ownership and nesting eligibility |
| Ordered values | array with items | Item type, count and ordering |
| Choice or measurement | enum/scalar | Business meaning versus presentation setting |
| Arbitrary external structure | json | Explicit schema/validation owner; avoid hidden CMS fields |

Source boundary: type names and validation vocabulary follow [SaaS content types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-saas), checked 2026-09-18, namespace v1.0.0-CMS-SaaS. Candidate availability is not proof that a property works in every section/element context.

## Validation that describes intent

Select field spellings for the actual representation: inspected SDK code uses `isRequired`/`isLocalized`; inherited direct-REST examples are unverified until the target schema is qualified. See [definition conflicts](../saas/defining-content-types-saas.md) and [source evidence](../sdk-source-ledger.md). Use string bounds/patterns for textual rules, numeric/date bounds for measured values, and `minItems`/`maxItems` for arrays. A required CTA URL and optional label is usually an incoherent business rule: define pair behavior and verify where cross-field validation can actually run. Do not invent a tenant validator plug-in.

Set constraints on array items as well as the collection. For a referenced card list, restrict item targets to approved types. Different SDK versions may validate constraints more strictly than REST. Current official SDK guidance requires constrained content relationships; compile and inspect the pinned SDK's output instead of copying a permissive REST example. Source: [SDK modeling](https://github.com/episerver/content-js-sdk/blob/main/docs/3-modelling.md), main checked 2026-09-18, uncompiled.

## Rich text, links and optional data

Keep rich text only where formatting is needed. Test lists, emphasis, internal links and any approved embedded content. Select a rich-text representation supported by the pinned renderer; do not query HTML and then pass it to a JSON renderer. The SDK guide describes changed v3 defaults, so preserve the selected package's convention.

A Graph Link has structured URL metadata; ContentReference contains identity/URL information and does not imply every target field is expanded. Source: [Graph property schemas](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/property-schemas-saas), checked 2026-09-18, documentation-level only. These output objects are not REST property definitions or content value wrappers.

For missing optional image, render the approved text-only layout. For an optional CTA, omit the whole interaction when its agreed data requirements fail. Do not substitute fake links. Define how broken referenced content appears in preview and whether publication should be blocked.

## Indexing intent and source disagreement

Source boundary: [Graph modeling](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-modeling-saas-graph), checked 2026-09-18, REST v1/Graph SaaS; not verified on a tenant.

REST omission means display-only Default; `queryable` permits structured filtering/sorting; `searchable` adds full-text search; `disabled` removes delivery through Graph. There is no literal `"default"` REST value. The source notes special indexing treatment for rich text, references, content areas, links, URLs and inline blocks unless disabled. The SDK main guide describes a different default. Therefore state intent explicitly and inspect serialized schema and Graph output. Do not disable a field the renderer needs, or use indexing as a substitute for authorization.

## Evidence

Return field decisions plus sample valid/invalid values. QA tests required fields, locale-independent/shared values, long copy, zero/max items, unknown choice values, missing references and approved formatting. Separate API validation results from editor restrictions and frontend resilience. For nested blocks or arrays intended for Visual Builder, use the [eligibility test](../saas/presentation-and-visual-builder-saas.md) before adopting the model.


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
