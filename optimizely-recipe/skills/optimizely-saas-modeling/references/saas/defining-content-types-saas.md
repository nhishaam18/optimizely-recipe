# Defining content types: three separate representations

## Select and record the authoring path

A repository using the official SDK can author models in TypeScript and synchronize configuration. Direct REST is also possible. Select one source of truth for each definition; uncoordinated UI, SDK and REST changes create drift. Read existing definitions first and preserve unrelated resources. Qualification of the official starter is covered in [Next.js SDK guidance](../../../optimizely-nextjs/references/official-sdk.md).

| Representation | Purpose | Characteristic shape |
|---|---|---|
| CMS REST v1 type definition | Stored schema managed by API | JSON `properties` dictionary, string type keys |
| Official SDK declaration | Typed authoring and generated query/registry input | `contentType(...)`, imported model objects and contracts |
| Graph schema/result | Delivered content selected by a query | Graph types, metadata, expanded/linked values; no REST value wrappers |

REST content instances are a fourth payload concern: actual values belong in version properties, not type definitions. An SDK object is not automatically a serialized REST request, and Graph output is never an import payload.

## Inherited REST illustration — target qualification required

For 1.3.0 implementation, use [code-first modeling](code-first-modeling.md). The direct-REST payload below preserves an older illustration whose flag spelling conflicts with the inspected CLI's vendored OpenAPI. It is not executable guidance until the target API contract has been resolved. See the [source ledger](../sdk-source-ledger.md).

Source boundary: [Define content types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-saas) and [create-type endpoint](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/contenttypes_create), checked 2026-09-18; target CMS REST v1. Original illustrative JSON, not submitted or read back:

```json
{
  "key": "MigrationHero",
  "displayName": "Migration Hero",
  "baseType": "_component",
  "compositionBehaviors": ["sectionEnabled"],
  "properties": {
    "heading": {
      "type": "string",
      "displayName": "Heading",
      "required": true,
      "localized": true,
      "indexingType": "searchable"
    }
  }
}
```

This is a one-field example, not the complete Hero. The type reference documents `required`/`localized`; the REST management tutorial and inspected CLI OpenAPI use `isRequired`/`isLocalized`. Version 1.2.0 selected the former; 1.3.0 defers this direct-REST example pending target qualification and uses the inspected is-prefixed flags in the default SDK path. Do not silently send both or claim either spelling was validated against a tenant here.

## Type-level decisions

`key` is integration identity; `displayName` is an editor label. `baseType` determines platform behavior. `mayContainTypes` constrains CMS container children, not Visual Builder canvas contents. `accessRights` on a type governs instance creation. Property groups organize fields; they do not define shared fields. REST exposes contracts separately from SDK `extends`; see [contracts](contracts-and-shared-fields.md).

Source boundary: [create-type API](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/contenttypes_create), checked 2026-09-18, REST v1. It exposes `composition` configuration for experience/section types, but this revision has not verified its expanded restrictions schema. Do not invent nested keys.

## Change and prove

Create only absent approved keys. For existing keys, compare definitions and use the supported update mechanism described in [management](../management.md). A key/base-type change needs migration design, not an in-place rename.

Verify property validation using valid and invalid values, locale behavior, composition eligibility, Graph representation and actual editor labels. API success alone does not prove editor usability. Record definition readback and schema fingerprint alongside the package pin; propagate field changes to model registries, query selection, renderer and QA fixtures.

## 1.3.0 qualification boundary

The direct-REST example above is inherited and **not a verified request contract**. The inspected CLI OpenAPI uses `isRequired`/`isLocalized`, conflicting with the web documentation previously used. Do not submit this example before target schema/readback resolves the conflict. For the default code-first path use [SDK modeling](code-first-modeling.md), whose flags match the inspected SDK/mapper. See [source ledger](../sdk-source-ledger.md).


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
