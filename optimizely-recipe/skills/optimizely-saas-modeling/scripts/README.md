# Offline modeling preflight

This dependency-free Node.js check catches common generated content-model errors without reading the SDK, using the network, importing project modules, or changing tenant state. It is a **conservative supported profile**, not a complete CMS schema validator or proof of tenant acceptance. Requires Node.js 18 or newer.

## When to use

Run after first implementation/type checking and generation of a JSON manifest through an already-qualified project path. Preparation selects the profile once; component tasks reuse that recorded selection. Do not inspect node_modules to run this check. Do not invoke push or assume a CLI dry-run is offline. This script only reads an existing JSON file.

Place these assets together in the project's scripts directory if integrating them. From that directory:

```sh
node --test modeling-preflight.test.mjs
node modeling-preflight.mjs /absolute/path/generated-manifest.json --profile cms-sdk-3.0.0-beta.0-manifest-subset-v4
```

To acknowledge a known model supplied outside this manifest:

```sh
node modeling-preflight.mjs /absolute/path/generated-manifest.json --profile cms-sdk-3.0.0-beta.0-manifest-subset-v4 --external-type=ExistingModel
```

External keys must be explicitly verified and recorded beforehand; the flag is not a way to suppress unresolved relationships. It asserts existence only, not base-type or contract compatibility. Use full manifests where available.

Known built-in base types cannot stand in for concrete embedded component or contract keys, even when listed as external. The `_self` sentinel is accepted only in `allowedTypes`/`restrictedTypes` and `mayContainTypes`, matching the pinned SDK's PermittedTypes and containment declarations; it is rejected in concrete `contentType` and `contracts` positions.

Exit codes: 0 means covered content-model rules passed, 1 means violations, 2 means input/usage error. Output includes exact error paths, the selected profile, `unchecked` top-level areas and path-level `uncheckedDetails`. A successful exit must be reported as **profile preflight passed**, never full schema/CMS validation. Other manifest areas require their own checks before authorized synchronization. A push wrapper must run all applicable checks before its existing mutation command; this package does not install or execute such a wrapper.

## Profile source and scope

Profile `cms-sdk-3.0.0-beta.0-manifest-subset-v4` was derived from the locally pinned official content-js-sdk source snapshot inspected 2026-09-22, package versions 3.0.0-beta.0. Sources:

- `packages/optimizely-cms-sdk/src/model/properties.ts` and `contentTypes.ts`
- `packages/optimizely-cms-cli/src/utils/mapping.ts` and `manifest.ts`
- `packages/optimizely-cms-cli/src/service/apiSchema/openapi-schema-types.ts`, especially ContentTypeProperty
- Official repository: https://github.com/episerver/content-js-sdk

The included fixture is the actual CLI-generated sample previously validated in the package's code-first review. It includes link properties, component arrays and contracts. The profile targets generated SDK manifests, not raw source definitions or arbitrary API exports. In particular, it accepts the pinned manifest's `link` type; do not rewrite it speculatively from different endpoint documentation.

Covered: property option allowlists by type; recursive array items; booleans; typed numeric and length bounds; enum entry shape/types; limited rich-text preset settings; duplicate model keys; component/reference/contract target existence; contract and component target roles for included definitions; basic content-type shape. Unknown options fail closed within content types and properties. The diagnostic distinguishes unsupported-in-profile from proven CMS invalidity.

## Explicit limitations

- Not a full OpenAPI/JSON Schema validator; does not establish all server constraints, format/editor support, regex semantics, date calendar strictness, field/key naming restrictions, required-value semantics or content-instance validity.
- `displayTemplates`, `propertyGroups`, application/content data and any other top-level fields are **reported unchecked**, not validated. Full group-definition correctness, display-template correctness, GraphQL/reference resolution, renderers, actual content, visual fidelity and tenant capabilities need separate checks.
- Conservative profile rejects SDK `binary` (not in the inspected ContentTypeProperty wire union), nullable constraints, alternative enum wrappers, arbitrary editor settings and other constructs without silently removing them. These may be valid in other APIs/versions; explicitly qualify a profile extension with evidence and regression tests.
- Requires bounded content/reference types per inspected SDK guidance; nested arrays are outside this profile. Wildcards are outside the profile. Built-in keys are enumerated, not accepted by arbitrary underscore prefix.
- Known selectOne/selectMany formats are checked for string compatibility. Other formats and group references require complete verified inventories or produce uncheckedDetails. This does not validate editor availability.
- JSON parsing cannot detect duplicate property names that were overwritten in serialized JSON. Source lint/type checks still matter.
- Version mismatch requires preparation to select/qualify another profile once. Never label this profile universally compatible or silently bypass a failure.

Investigate a specific failure from supplied modeling guidance first. If evidence is missing, the error permits one directly relevant schema/declaration lookup under the Developer exception; record the correction and return to implementation. No routine SDK search is needed.

## Component requiredness rule

Profile revision v2 rejects the presence of isRequired on component properties, including false and component array items, with the exact field path. Supported required scalar fields and array-level constraints remain valid. This rule is based on the user-reported CMS validation rejection; no live tenant reproduction is claimed. The profile remains a conservative subset, not SDK version certification or complete CMS validation.

## Optional verified inventory

Pass `--inventory=/absolute/path/inventory.json`. Shape: `{"groups":["Content"],"formats":{"shortString":"string"}}`. This is an example, not a target inventory. Each supplied section must be complete and verified for the actual target, including built-in and project definitions; omitted sections remain unknown. The checker reads files only. Regex syntax/semantics remains uncheckedDetails pending a target-compatible check. See [validation matrix](../references/validation-matrix.md).


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
