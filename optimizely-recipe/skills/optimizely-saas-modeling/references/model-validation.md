# Model validation after the first edit

This is a check/recovery guide, not a prerequisite to writing the first model/renderer. Keep the no-routine-SDK-reading policy. Executing the compiler, model generator and validator is permitted; inspecting their dependency internals is not routine implementation work.

## Validation levels

| Level | Required evidence | Does not prove |
|---|---|---|
| Type check | Actual command, exit code and changed source | CMS accepts serialized definitions |
| Model generation | Qualified generator, current source/output hashes, expected exported type keys | Unknown property options were rejected |
| Local preflight | Validator/profile identity, output hash, pass/fail and exact paths | Complete API/tenant compatibility |
| Schema validation | Actual target-version schema, validator/version, coverage and results | Semantic ownership, author experience or live rendering |
| Authorized CMS acceptance | Exact environment, operation and readback | Graph/renderer and visual correctness |
| Real-content UI check | Delivered data, reference/asset mapping, preview/public behavior | Every editor workflow |

Never promote one level to another. The bundled preflight is a conservative supported profile, not the entire CMS OpenAPI validator. See [preflight usage](../scripts/README.md) for commands, coverage and unsupported shapes. A partial check must be labeled partial. Use a project's stronger validated schema check when available; do not replace it with a weaker bundled check.

## Template integration

During template preparation, install the maintained preflight script/profile and its tests in the repository, or use equivalent existing validation. Record its path and exact command in component documents. Establish a local generation path using the installed CLI's documented supported behavior. Do not invent export commands, patch node_modules or require credentialed tenant calls merely to start writing source.

Validate the actual generated manifest, not a manually rewritten fixture. Supply known external type keys from a versioned project/tenant inventory where required. Do not loosen the profile solely to suppress an error. A valid feature outside profile coverage requires a qualified extension or a stronger schema validator, with a regression fixture and recorded source.

Wire the repository's existing push script so local generation/validation must succeed before the first remote mutation. Preserve its intended configuration and authorization; ensure generation and push use the same source revision/config. A shell `&&` chain or checked process exit codes can enforce this. If generation itself authenticates, record that dependency: `--dryRun` is not universally offline, and `--output` alone is not proof of no writes. Do not claim a fail-before-write guarantee until the command ordering is verified for that installed version.

This package does not automatically modify a client repository or its `npm run opti-push`. Adding the package does not prove the hook is installed. For a local-only demo, omit synchronization and report unavailable full manifest/tenant checks while continuing local work.

## Broad checks

- Property kind, permitted options, value types, nested `items`, required item definitions and constraint placement.
- Array cardinality, scalar bounds, enum shape and supported editor settings.
- Model key uniqueness, known target keys, ownership/embedding compatibility and expected model coverage.
- Export/discovery paths, registry-to-content-type keys, inherited contracts and referenced property groups.
- Query-to-renderer data shape, nullability, reference/asset resolution and mock versus real content differences.

Not all checks are performed by the bundled script. Its README defines mechanical coverage; model ownership, group/contract discovery, renderer mapping and editorial tests remain explicit checks or project-specific tests. Avoid false completeness from a green preflight.

## Bounded recovery

1. Record the exact error, property path, changed source and failing check.
2. Apply the component's supplied verified pattern or the relevant entry in the supported contract when it resolves the error.
3. Only when unresolved, inspect the directly relevant SDK declaration or official schema for that error. Do not scan dependency trees, source maps, tests, whole documentation sites or raw chat history.
4. Make the smallest correction preserving approved semantics. A change from embedded ownership to shared references is a modeling decision, not a syntax repair.
5. Rerun the failed check; save the correction/source/check result in the short checkpoint. Reuse it for equivalent properties across components. If the error repeats unchanged, report the remaining cause and continue independent work instead of repeating the same lookup.

Never fabricate validation evidence, introduce casts to conceal invalid declarations, silently drop unsupported constraints, upgrade the SDK, or synchronize to discover errors when tenant operations are excluded.

## Embedded component requiredness

For a property with `type: 'component'`, omit `isRequired` entirely, including `isRequired: false`. Put approved requiredness on supported individual fields of the referenced component type instead. A required child field is not proof that the parent must contain a component. Record required component presence separately with its supported enforcement or an explicit gap; never silently discard that requirement. Do not mark every child required as a mechanical replacement, change ownership to contentReference, or weaken unrelated array/scalar constraints. Reused component definitions affect all their consumers; check those consumers before changing child-field requiredness.

For this known CMS error, correct the source declarations directly from this rule, regenerate the actual manifest and rerun the local checks. Apply the same rule to component definitions in array items. Do not patch generated output alone, cast away diagnostics, upgrade dependencies or broadly research the SDK. The bundled preflight reports the exact property path and does not auto-rewrite the model. A successful partial preflight or TypeScript check is not full CMS acceptance; tenant writes still require the task's authorization.

## Path-level coverage

Validate the actual generated manifest against the recorded profile. Full properties and array items have different allowed attributes. Use the versioned validation matrix during preparation to embed the relevant subset in each handoff. Report errors, unchecked top-level areas and path-level uncheckedDetails separately; zero errors is not full CMS acceptance. Supply verified group/format inventories when available and record their provenance. Missing inventory or target-compatible regex validation remains explicit, not a guessed failure or silent pass. Reuse known corrections and retain the no-routine-SDK-reading policy. See [validation matrix](validation-matrix.md).


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
