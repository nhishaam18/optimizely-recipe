# Official SDK contracts and shared fields

## Shared definition is not shared content

Use a contract when several content types need one field specification, such as SEO title and description. Each page instance still owns its values. A site-wide defaults instance is a separate content relationship. Editor groups only organize fields; a group named SEO does not prevent definitions drifting.

Source boundary: official [SDK modeling guide](https://github.com/episerver/content-js-sdk/blob/main/docs/3-modelling.md), current `main` checked 2026-09-18. That moving guide includes v3-era behavior; no package version or commit is qualified in this bundle. The following original TypeScript demonstrates documented `contract`, `contentType` and `extends` syntax. It has not been compiled or synchronized:

```ts
import { contentType, contract } from '@optimizely/cms-sdk';

export const MigrationSeo = contract({
  key: 'MigrationSeo',
  displayName: 'SEO fields',
  properties: {
    seoTitle: { type: 'string', isLocalized: true },
    seoDescription: { type: 'string', isLocalized: true },
  },
});

export const MigrationLanding = contentType({
  key: 'MigrationLanding',
  displayName: 'Landing experience',
  baseType: '_experience',
  extends: MigrationSeo,
  properties: {
    title: { type: 'string', isRequired: true, isLocalized: true },
  },
});

export const MigrationArticle = contentType({
  key: 'MigrationArticle',
  displayName: 'Article',
  baseType: '_page',
  extends: MigrationSeo,
  properties: {
    heading: { type: 'string', isRequired: true, isLocalized: true },
    body: { type: 'richText', isLocalized: true },
  },
});
```

Do not add Article to an actual migration unless article requirements exist. The example intentionally demonstrates two consumers. Set project-specific SEO length/fallback policy; example numbers are not search-engine guarantees.

## Collision and evolution policy

The guide supports multiple contracts through an array in `extends`; later contracts override earlier same-key fields, and own fields override inherited ones. Our recommended policy is stricter: avoid accidental collisions and document intentional overrides in the model matrix. A subtle override to localization or requiredness can break an existing locale without changing a renderer.

Before changing a shared contract, enumerate all implementing types and their content populations. Add new optional fields, backfill, verify previews and public output, then consider stricter validation. Capture the generated management diff to establish what changed on each consumer. A contract refactor is not automatically a data migration.

## REST and delivery boundaries

The [REST create-type API](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/contenttypes_create), checked 2026-09-18, exposes `isContract` and `contracts`. These are REST fields; do not send SDK `extends` objects as REST JSON. Let the selected SDK serializer produce its representation, or validate a direct REST definition independently.

Graph needs the selected fields in the actual query. Inspect generated output when contracts are used in relationship constraints; generated expansion behavior varies by SDK version. A contract present in TypeScript does not prove a delivered field exists.

Output: shared-field definition, consumers, collision policy, locale/default decisions, and before/after schema evidence. QA edits two approved test consumers independently, checks shared definitions without shared values, and verifies metadata fallbacks. If the approved scope lacks a second consumer, obtain approval for a minimal test consumer or record the cross-page check as pending. See [schema evolution](../schema-evolution-and-import.md).

## 1.3.0 source correction

The SDK snippets now use `isRequired` and `isLocalized` as declared in the inspected SDK. See [pinned source evidence](../sdk-source-ledger.md) and [code-first discovery](code-first-modeling.md). Include exported contracts in CLI discovery as well as their consuming runtime models; verify the serialized contract/type entries. The original illustrative snippets above remain separate from the locally checked example linked in that procedure.
