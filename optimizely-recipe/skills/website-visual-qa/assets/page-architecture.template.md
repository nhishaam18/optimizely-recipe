# [Page/site] - architecture and review - [revision]

Source and device scope: [confirmed]. Annotated overview: [image link].
Purpose and audience: [observed / proposed]. Routes/locales: [approved or pending].

| Order / region | Component IDs | Content ownership | Editor can change | Fixed constraints and enforcement |
|---|---|---|---|---|
| [region] | [stable IDs] | [shared/default/override/owned] | [fields/add/reorder/variants] | [CMS or renderer rule] |

## Shared site content
Default header/footer source and editable location; optional variant/reference selection; consumers; draft/public update behavior and locale fallback. Explain once-edited shared instances versus merely reused definitions. Test two representative consumers and a variant within the approved scope; obtain approval for missing test consumers or record the cross-page/variant check as pending.

## Page and supporting model fields
| Friendly field / model.key | Purpose/example | Type/reason | Required/localized/default | Ownership/editor/enforcement |
|---|---|---|---|---|
| [route metadata, content or settings] | | | | |

## Composition and blueprint
Experience/Page choice, section/element placement and allowed types, constrained display templates, blueprint need and copied-layout behavior. Identify where shared references are resolved; don't assume blueprint changes propagate.

## Rendering and verification
Shared layout/component/CSS/font/asset path for delivery, CMS preview and fixture adapters. CMS preview root/context/version/locale and empty data behavior. Assembly task depends on all required components/shared types/layout. Source/frontend/CMS comparison states and tolerances; no mock-only content or styling.

## Review decisions
Changes since prior revision; alternatives/trade-offs; unknowns; existing-tenant impacts and user approval reference. Conditional technical patterns/paths remain separate from this readable summary. No source or tenant changes during Phase 2.
