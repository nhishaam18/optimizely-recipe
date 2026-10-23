# Content types, instances and reuse in SaaS

## What the model represents

A type defines fields and behavior. An instance contains values with durable identity. A renderer interprets those values. Reusing a type or renderer does not share instance values. Keep these identities separate in imports and QA.

Choose an experience for composed landing pages, a page for independently routed structured content, a component for a semantic unit, and a media type for an asset. A folder is organization, not a frontend component. These categories follow [SaaS content types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-saas), checked 2026-09-18 in v1.0.0-CMS-SaaS. Tenant definitions and UI remain unverified.

## Identity and reuse decisions

Keep type keys stable when editor-facing names change. Use business names such as `MigrationHero`, not screenshot coordinates or colors. Check target Graph names for collisions. Preserve source occurrence IDs in the migration ledger rather than using them as type names.

| Storage choice | Suitable use | Consequence |
|---|---|---|
| Local value/inline content | Content edited with its parent | Parent lifecycle; independent identity may be absent |
| Reference to an instance | Intentional sharing or independent lifecycle | Publication/deletion dependencies |
| Shared contract | Same field definitions on several types | Independent values on each instance |
| Blueprint | Repeated starting composition | Do not assume updates propagate to existing copies |

A common failure is sharing a Hero instance because screenshots look alike. Confirm whether updating one should update the other. Separate desktop/mobile schemas are also usually unnecessary: responsive behavior belongs to one renderer.

## Base types, contracts and groups

Base type is a durable platform classification, not an editable label. Contracts reuse field definitions through the selected SDK. Property groups organize editor fields and are not inheritance. See [contracts](../saas/contracts-and-shared-fields.md) for SDK syntax and collision policy.

Choose labels, help text and grouping around tasks. “Call to action text” is clearer than a design token. Shared content help should explain which consumers change.

## Composition and tree constraints

A folder admitting Article children does not constrain sections on an experience. A reference field admitting images does not guarantee Graph expands image data. See [Visual Builder](../saas/presentation-and-visual-builder-saas.md).

Output: type/instance/renderer mapping, sharing statement, owner, field matrix and four tree views. QA checks independent Hero edits, shared navigation propagation, locale behavior and section reorder without a code change.
