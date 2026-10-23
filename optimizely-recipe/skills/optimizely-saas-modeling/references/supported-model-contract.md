# Supported modeling contract

Use during model/handoff preparation, or consult one named section for the current modeling error. Implementation consumes the component's embedded subset; this entire reference is not mandatory startup reading.

## Authority and compatibility

Keep semantic design, SDK declarations, serialized management properties and delivered Graph data distinct. A TypeScript interface or passing build does not validate the management payload. Never cast to `any`, suppress diagnostics or switch to arbitrary JSON merely to make an unsupported model compile.

The source-checked baseline is SDK/CLI `3.0.0-beta.0`, commit `e9b16941bd4e0b19b6ea15b89486d3234a85bc60`; see [source ledger](sdk-source-ledger.md). It is not certification for SDK 2.x or a recommendation to upgrade. Preparation records the actual package/lockfile fingerprint, SDK and CLI versions, selected pattern and checks. Test against the installed version once and carry that evidence into each relevant component document.

If the supplied pattern and installed version differ, first reuse a matching existing project pattern or recorded project qualification. Mark only the unsupported mapping pending, continue independent renderer/model work, and report the exact mismatch. Do not silently upgrade, copy a beta API, invalidate unaffected approvals, or launch routine dependency research. A known unresolved mapping is not permission to deliberately write invalid code to unlock research. Explicit preparation/investigation is separate work; implementation lookup is limited to an actual unresolved compiler or model/manifest/CMS validation error.

## Property grammar

This table describes the pinned SDK input profile, not every REST feature or every SDK version. Omit optional settings unless needed. Values and defaults must come from the approved contract.

| SDK property | Supported shape / relevant constraints | Common error to prevent |
|---|---|---|
| `string` | `minLength`, `maxLength`, `pattern`; enum entries are `{ value, displayName }` in this SDK | `minItems` on text; assuming a scalar enum array matches SDK input |
| `boolean` | Boolean value; common metadata only | Treating a boolean as a string or adding numeric limits |
| `integer`, `float` | `minimum`, `maximum`; typed enum entries | String bounds or fractional integer enum values |
| `dateTime` | String date/time bounds `minimum`, `maximum` | Numeric bounds copied from number fields |
| `url` | URL property | Treating it as the delivered rich link object |
| `link` | SDK link convenience type; resolve actual delivered link fields | Assuming its SDK definition is the serialized management or Graph shape |
| `richText` | `editorSettings.preset`: `default`, `minimal`, `expanded` for this baseline | Invented toolbar preset; querying HTML but passing it to a JSON renderer |
| `contentReference` | Constrained reference to an independently identified item | Assuming returned data is already expanded or changing ownership to satisfy a type error |
| `content` | Inline/referenced composition; record intended ownership and constraints | Using unconstrained content as an all-purpose content area |
| `component` | Owned inline value; SDK `contentType` points to its defined component model | Using a page/experience type as an embedded component; setting `isRequired` on this property |
| `array` | `items` defines the item property; `minItems` / `maxItems` on the array | `isList`, missing `items`, reference constraints on the array instead of its items |
| `json` | Explicitly approved arbitrary JSON with application validation | Bypassing a proper editable model or claiming inferred TypeScript shape validates stored JSON |
| `binary` | Present in pinned SDK declarations; qualify media-specific use separately | Using it for a normal image selector without an asset contract |

Metadata availability is property-specific: `isRequired` must be omitted on `component` properties even if broad SDK typings accept it. Common SDK metadata names in the baseline: `displayName`, `description`, `isRequired`, `isLocalized`, `group`, `sortOrder`, `format`, `indexingType`, `displayMode`. Groups must resolve; formats need verified compatibility. Do not copy semantic worksheet column names into source code. The common profile does not provide an arbitrary `default` property: identify whether a default belongs in supported CMS configuration, content initialization, editor behavior or renderer fallback. Those are different promises.

`isList` is not a supported list declaration. Neither are guessed options such as `required`, `localized`, `nullable`, `validation`, `min`, or `max` substitutes for the pinned SDK fields. Unknown options require evidence, not an ever-growing blacklist. Avoid nested arrays: the pinned SDK item union excludes arrays. An approved nested collection needs an intermediate owned component or another qualified mapping.

For `content` / `contentReference`, the pinned SDK accepts either `contentType` or allowed/restricted type constraints; do not combine those branches. Prefer a narrow non-empty `allowedTypes` when the design calls for references. Resolve keys against generated definitions, built-in types or a recorded external type inventory. `component` requires a concrete component definition. Whether references infer the required renderer data still needs a qualified delivery mapping.

## Minimal source patterns

These property snippets are source-checked against the pinned baseline; they are not tenant-tested or universally version-compatible. They belong inside a qualified `contentType({ properties: ... })` definition. The existing [complete model example](../assets/code-first/models.ts) includes imports, supporting types and exports.

```ts
heading: { type: 'string', isRequired: true, maxLength: 120 },
tags: {
  type: 'array', maxItems: 8,
  items: { type: 'string', maxLength: 40 },
},
cards: {
  type: 'array', minItems: 1, maxItems: 6,
  items: { type: 'component', contentType: CardType },
},
relatedItems: {
  type: 'array', maxItems: 3,
  items: { type: 'contentReference', allowedTypes: [ArticleType.key] },
},
image: { type: 'contentReference', allowedTypes: ['_image'] },
body: { type: 'richText', editorSettings: { preset: 'minimal' } },
```

`CardType` and `ArticleType` above stand for actual exported definitions, not strings to invent. Choose owned cards versus related references from the approved instance policy. Do not replace one with the other mechanically. Local checks must also cover renderer nullability, reference resolution and asset shape.

## Component and field decisions

1. A main visual component normally owns its heading, text, image and action fields. Annotation numbers identify evidence; they do not mandate one CMS type each.
2. A repeated card can use an owned supporting component type. Reusing its definition does not share the card instance across pages.
3. Use an independent reference only when editorial identity/reuse is intended and approved. Record update propagation and ownership.
4. Record stable type/property keys, parent placement and composition capabilities separately. Content-tree placement, reference constraints and Visual Builder section availability are different controls.
5. Keep visual variants in approved presentation settings or renderer configuration unless they are genuinely semantic content. Map each supported choice to implemented UI behavior.
6. Every CMS field maps to delivery/query data and renderer use (or an explicit nonvisual purpose). Every visible content element maps to a field, local presentation primitive or approved static content. Preserve null/empty/fallback behavior.

## Enforcement and evidence

For each requirement record: supported CMS constraint, custom validation location, renderer behavior or QA-only check. For example, an image/alt or CTA label/destination pairing is not enforced merely by writing prose. Record unsupported rules honestly and route only design-changing alternatives for approval.

After source edits: type-check, generate the actual model output through the qualified project path, run [model validation](model-validation.md), then inspect discovery/renderer mapping. Model edits invalidate the old output/check hash, not SDK qualification. Keep local checks, tenant acceptance and real-content UI verification separate.

## Documentation provenance

Checked 2026-09-25. Sources are reference material for preparation/targeted recovery, not a per-component reading list:

- [Official SDK properties at pinned revision](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/packages/optimizely-cms-sdk/src/model/properties.ts).
- [CMS content-type concepts](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-saas).
- [Management API examples](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-content-types-using-the-rest-api).
- [Property formats](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/property-format).

Conceptual docs and payload examples disagree on some flags. Use the version-qualified serialization contract and actual validation evidence; never combine spellings or treat a web example as proof of installed SDK support.

## Recipe release versus dependency compatibility

Recipe/skills release versions (for example 1.3.6 or 1.3.7) are independent of Optimizely SDK and CLI package versions. Never compare them or raise a compatibility blocker from their numeric difference. Record recipeVersion separately from sdkPackage/sdkResolvedVersion and cliPackage/cliResolvedVersion, using repository dependency records during preparation. During implementation reuse the recorded versions; package fingerprinting is not an exception to the prohibition on routine node_modules reading. A fingerprint records provenance, not proof of compatibility. Reuse qualified repository patterns. A concrete unsupported API, property or validation error can block its affected operation; a different recipe number cannot. A pattern verified against SDK 3 is not automatically verified against SDK 2 either. Record the exact affected mapping, evidence and independent next action instead of a blanket version blocker. No dependency upgrade or broad SDK exploration follows from a version difference.

## Embedded component requiredness

For a property with `type: 'component'`, omit `isRequired` entirely, including `isRequired: false`. Put approved requiredness on supported individual fields of the referenced component type instead. A required child field is not proof that the parent must contain a component. Record required component presence separately with its supported enforcement or an explicit gap; never silently discard that requirement. Do not mark every child required as a mechanical replacement, change ownership to contentReference, or weaken unrelated array/scalar constraints. Reused component definitions affect all their consumers; check those consumers before changing child-field requiredness.

For this known CMS error, correct the source declarations directly from this rule, regenerate the actual manifest and rerun the local checks. Apply the same rule to component definitions in array items. Do not patch generated output alone, cast away diagnostics, upgrade dependencies or broadly research the SDK. The bundled preflight reports the exact property path and does not auto-rewrite the model. A successful partial preflight or TypeScript check is not full CMS acceptance; tenant writes still require the task's authorization.

## Context and target validation

See [validation matrix](validation-matrix.md) for array-item versus full-property attributes, target naming limits and format/inventory coverage. Array items must not inherit full-property metadata. Regex validity and missing group/format inventories are explicitly unverified, not established by TypeScript.


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.

## Media and CMS readiness contract
Inspect the actual tenant when read access is authorized. Reuse a suitable concrete media type, including built-in ImageMedia where present; create a custom _image/_video/_media-derived type only when absent or justified by approved metadata/extension needs. Base types and abstract contracts are not concrete upload contentType keys. If tenant access is unavailable, record the dependency as unverified; never assume absence or fabricate keys. Define media dependencies before uploads, synchronize the approved schema first and confirm via readback.
Each model handoff records field reference types/allowed types, concrete media dependency, upload container policy, source asset identity, alt/decorative ownership, crop/focal behavior, reuse and locale strategy. Do not invent locale branches unsupported by media. Usage-specific alternative text can belong on the consuming component; choose deliberately. Component reference fields do not upload binary files. Asset batches separately upload/reuse actual files, map returned identities to fields and verify MIME/decode/access in the intended preview and public contexts. Keep rights and substitutions explicit. Diagnose wrong binary URL, reference expansion, authentication, permissions and publication separately; never assume publishing is the only repair for draft media.
Each reusable component also declares intended placement (selectable section, nested component, reference/shared content or layout region), required composition behavior, renderer registration, display-template association/default/settings, media dependencies and preview mapping. Do not make every child section-selectable. Reuse documented qualified patterns; carry decisions into Phase 3 task acceptance instead of deferring them to composition.
Display templates may target base type, content type or node type. Inspect actual association and existing defaults/consumers, propose the scoped diff and verify readback. Never apply blanket isDefault:true or universal 'one per base type' rules; preserve unrelated defaults. No sample template may silently override approved source styling. Validate against the actual API/SDK contract without routine broad SDK reading.

Sources checked 2026-10-02: [Media API](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-media-using-the-rest-api), [Graph metadata](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/metadata-saas), [Visual Builder configuration](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/configure-visual-builder). Verify installed/tenant-specific contracts for concrete unresolved errors; recipe version is not SDK version.
