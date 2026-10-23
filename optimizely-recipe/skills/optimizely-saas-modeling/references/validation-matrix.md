# Validation matrix — profile revision v4

Use during preparation or a concrete recovery check, not as another implementation startup read. Applies to the supported generated-manifest subset. Recipe, SDK, CLI, REST API and validator-profile versions are distinct. SDK input definitions are not necessarily identical to serialized properties.

| Context / rule | Enforcement | Evidence / boundary |
|---|---|---|
| Full property metadata | Existing allowlist with type-specific constraints | Pinned SDK/API schema baseline |
| Array items | Only type/format plus the selected type's supported constraints; no isRequired, isLocalized, displayName, description, group, sortOrder, indexingType or displayMode | Pinned API ArrayItem schema; nested arrays remain unsupported |
| Component requiredness | isRequired omitted entirely, including false | Reported CMS rejection; required children and component presence are different requirements |
| Content type key | 2..255 characters, `^[A-Za-z][_0-9A-Za-z]+$` | Current v1 create API; applies to authored type keys, not built-in reference sentinels |
| Content type displayName | Nonempty, maximum 255 | Current v1 create API |
| selectOne/selectMany format | string only | Official property-format guide |
| Other formats | Check exact key and type against supplied complete verified formats inventory; otherwise path-level uncheckedDetails | No invented format keys or compatibility rules |
| Group reference | Check nonempty group against supplied complete verified groups inventory; otherwise uncheckedDetails | Empty grouping retains automatic behavior; inventory must include applicable existing/system/new groups |
| Regex pattern | String shape only; target regex validation explicitly uncheckedDetails | Do not assume JavaScript RegExp matches CMS regex semantics |
| External component/contract | Existing key acknowledgment plus role explicitly uncheckedDetails | External key alone does not establish target base type/contract status |
| Remaining properties | Existing supported type/constraint allowlists | Conservative profile, not universal CMS validation |

Preparation may supply a JSON inventory with optional `groups` (array of exact keys) and `formats` (key-to-dataType map). Each supplied section asserts complete verified coverage for the target; omitted sections mean unknown, never empty. Record inventory source, scope and revision alongside it. Do not populate a fake inventory to suppress failures. Built-in documented selectOne/selectMany type rules cannot be overridden by an inventory. Other manifest areas such as propertyGroups/displayTemplates remain unchecked as full definitions.

`errors` are violations of covered rules. `unchecked` names unvalidated top-level areas. `uncheckedDetails` identifies specific unvalidated paths. Exit 0 only means covered rules passed; all three outputs must be reviewed before reporting readiness. Missing evidence does not justify broad SDK reading or block independent local code. A push gate needs stronger target checks or an explicit scoped acceptance of gaps; this package does not install a hook or authorize synchronization.

## Sources and discrepancies

- [Create content type](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/contenttypes_create): key pattern and displayName limits (reviewed 2026-09-27).
- [Property formats](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/property-format): formats are data-type specific; selectOne/selectMany are strings.
- [v1 migration guide](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/migrate-content-api-preview3-to-v1): unknown fields rejected; required/localized renamed isRequired/isLocalized.
- [Pinned official API schema source](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/packages/optimizely-cms-cli/src/service/apiSchema/openapi-schema-types.ts): ArrayItem versus ContentTypeProperty, from the saved source snapshot.

Some conceptual examples retain old field names or differ from schema declarations. Use the selected target-version serialization contract, not combined examples. This matrix is not certification of arbitrary installed SDK releases. Do not extrapolate isRequired's component restriction to isLocalized without evidence. DateTime enum support, nullable bounds, additional type metadata and editor settings outside this profile require qualified extensions, not guessed prohibition or automatic removal.


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
