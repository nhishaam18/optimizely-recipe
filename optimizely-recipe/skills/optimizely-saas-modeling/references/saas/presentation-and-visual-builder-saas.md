# Controlled Visual Builder composition

## Required editorial behavior

The approved migration path is an experience whose editors can change content and add/reorder approved sections. Hero, Card Grid and FAQ are semantic sections; site navigation/footer remain shared chrome. A section's internal design is implemented by the frontend, with a small set of approved display choices.

Source boundary: [Visual Builder concepts](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/get-started-with-visual-builder) documents experiences, outlines and section reordering; [SDK experiences](https://github.com/episerver/content-js-sdk/blob/main/docs/8-experience.md) documents rendering and composition behaviors. Checked 2026-09-18, SaaS v1.0.0-CMS-SaaS and moving SDK main. These checks do not establish editor permissions in a client tenant.

Use `_experience` for the composed route and `_component` with `compositionBehaviors: ['sectionEnabled']` for the proposed Hero. Enable elements only where an approved composition needs them. These flags establish eligibility; they are not a universal “lock layout” switch.

## Section, element and nesting decisions

A Hero can keep heading, image reference, alt text and CTA values together without exposing Button as an arbitrary nested element. For Card Grid/FAQ, first decide whether items are local or independently referenced. Then test the proposed array/reference structure in the actual section editor.

The [content-admin type guide](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-content-admins), checked 2026-09-18, warns that blocks containing complex nested block types cannot be enabled as sections/elements. This is a documentation boundary, not a reason to invent a universal list of supported combinations. Record the exact rejected property and choose a supported model preserving the editor task. Do not assume a general-purpose nested component example in the SDK is composition-eligible.

## Enforceability: prove each restriction separately

| Requirement | Candidate mechanism | Required proof |
|---|---|---|
| Only approved section types | Type composition eligibility plus verified canvas/type/role configuration | Actual demo editor's Add Section list; attempt disallowed selection |
| Only approved field references | Property target constraints | Picker and API invalid-target rejection |
| No arbitrary rows/columns/elements | Verified composition configuration and editor permissions | Attempt creation/editing, not just a renderer screenshot |
| Only approved alignment/theme | Bounded display template settings | Editor choices and unknown-value rendering |
| Preserve section ordering | Experience composition plus supported renderer | Reorder two sections, preview, publish and observe |
| No new unrelated schema | Scoped definition diff | Before/after definition inventory |

The REST [create-type API](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/contenttypes_create), checked 2026-09-18, exposes a `composition` object for `_experience`/`_section`, but its expanded restriction fields have not been verified here. Use the target OpenAPI and tenant UI to identify actual controls. `mayContainTypes` controls CMS tree children; it does not prove an experience canvas allowlist. Hiding a renderer or ignoring unsupported nodes does not restrict what an editor can save.

If locked composition cannot be demonstrated, record that acceptance item as blocked and ask Orchestrator to resolve the capability/scope decision. Continue other work. Do not quietly claim success or replace Visual Builder with a fixed content-area implementation.

## Content versus presentation

Heading, body, image identity and action destination are content. Theme, alignment and approved spacing are display settings. Map setting keys to owned tokens/classes; do not accept raw CSS values. Retain safe renderer defaults for missing/unknown choices.

Source boundary: official [SDK display settings](https://github.com/episerver/content-js-sdk/blob/main/docs/9-display-settings.md), main checked 2026-09-18. Original illustrative declaration; uncompiled, tenant-unverified:

```ts
import { displayTemplate } from '@optimizely/cms-sdk';

export const MigrationHeroStyle = displayTemplate({
  key: 'MigrationHeroStyle',
  displayName: 'Hero style',
  contentType: 'MigrationHero',
  isDefault: true,
  settings: {
    alignment: {
      editor: 'select',
      displayName: 'Text alignment',
      choices: {
        start: { displayName: 'Start', sortOrder: 1 },
        center: { displayName: 'Center', sortOrder: 2 },
      },
    },
  },
});
```

Register and render templates using the pinned SDK conventions in [Next.js](../../../optimizely-nextjs/references/official-sdk.md). Settings metadata does not itself implement CSS or responsiveness.

## Blueprints and content areas

Use a blueprint to offer an approved starting arrangement. Treat copies as independent until actual sharing behavior is verified. A shared Navigation instance is different: its consumers intentionally observe the same edit.

Traditional ordered content areas remain useful when fixed developer-defined page regions are the approved requirement. They do not satisfy an explicit Visual Builder requirement by substitution. Record that choice and test its different authoring experience if the user selects it.

Output: section catalogue, composition tree, display-setting matrix, chosen control mechanism for each restriction and editor evidence. QA tests addition/reorder, unsupported layouts, copy-versus-share behavior, missing values and keyboard interaction.
