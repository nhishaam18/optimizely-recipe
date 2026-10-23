# Code-first modeling with the official SDK

Checked 2026-09-22 against SDK/CLI source commit `e9b16941bd4e0b19b6ea15b89486d3234a85bc60`, package manifests `3.0.0-beta.0`. This is a reference baseline, not a recommendation to choose a prerelease for a client. Qualify actual packages during preparation; implementation follows the concrete-error-only lookup policy below. See [source conflicts](../sdk-source-ledger.md) and the [example](../../assets/code-first/README.md).

## Execution order

For approved implementation scope, follow [implementation-only entry](../../../optimizely-migration-workflow/references/implementation-entry.md): read the approved model directly, reuse the supplied or existing project SDK pattern, write one model and type-check it, then add renderer/registration/discovery. Generate and review its manifest afterward, before any tenant synchronization. Use the design steps below only for unresolved decisions; existing approved field/ownership/composition choices remain inputs. Missing credentials block dependent CLI/tenant checks, not local model or UI edits.

During implementation do not browse node_modules, SDK source/tests/source maps or external SDK documentation before the first edit. Only an actual SDK API/type compiler error or model/manifest/CMS validation error permits reading the directly relevant declaration or official schema; record the correction and resume editing. Report unresolved semantic/reference mapping conflicts and continue independent work rather than inventing relationships.

## From approved evidence to a model

1. Name the semantic unit and who edits it. A heading inside a Hero can be a field; a Cards strip can own an ordered list of embedded cards. An independently reused CTA may justify a reference. Record why each unit is independently editable, local or shared.
2. Select the base type and composition freedom. Use an `_experience` for approved section reordering, section-enabled `_component` types for whole Hero/Cards units, and `_section` only when structural grid editing is required. A fixed `hero` property on `_page` does not fulfill movable-section acceptance.
3. Fill a field worksheet: key, editor label/help, type, owner, required/localized policy, validation, default/empty behavior, grouping, indexing, allowed targets and migration source. Include card list limits, alt text policy and CTA validation. Conditional/cross-field rules require an explicit enforcement location; a prose rule is not CMS enforcement.
4. Separate shared definitions (`contract`), shared instances (references), owned values (`component`) and styling (`displayTemplate`). Reusing one card type is not permission to link all pages to the same card content.
5. Record four mapped structures: routes/application roots, CMS ownership tree, composition nodes and React component hierarchy. Approval covers the semantic model and editorial capability, not only a screenshot match.

## Implement the definition-discovery path

Use exported `contentType(...)`, `contract(...)` and `displayTemplate(...)` values from `@optimizely/cms-sdk`. They are runtime objects with metadata markers, not TypeScript interfaces. The CLI discovers exported values from files matched by `components` in the `.mjs` configuration. Merely importing a model inside a renderer without exporting it from a matched module does not expose it to discovery.

Both layouts are supported patterns:

- **Colocated**: a `.tsx` file exports a model and default React renderer, as in hello-world, Stride and Alloy. Keep module initialization safe for the CLI loader.
- **Separated**: pure model `.ts` files under `src/cms/models/`, separate renderer files and runtime initialization. Include the model glob in `.mjs`; the default template's component-only glob will miss them. This bundle's example uses separation to make schema extraction independent of UI/runtime imports.

The loader bundles and imports matched modules with esbuild. It executes configuration/module code and does not type-check. Keep network requests, secret-dependent runtime initialization, CSS imports, browser globals and `server-only` module execution out of the model discovery graph. Type-check separately. Avoid scanning barrels and source files that export the same keys twice; inspect the generated manifest for exact expected keys and duplicates.

## `.mjs` contract

`optimizely.config.mjs` is an ES module, not Next.js configuration and not a content type itself. It imports `buildConfig` from the SDK root and default-exports the result. Globs are relative to this config file. See the [complete schema-only configuration](../../assets/code-first/optimizely.config.mjs).

| Entry | Purpose and boundary |
|---|---|
| `components` | Discovery globs for exported type, contract and display-template values. Match actual paths/extensions, including nested directories. |
| `propertyGroups` | Editor group metadata referenced by field `group` keys. |
| `locale` | Singular config property containing an array of locale codes. A real push can create/enable locales. It does not translate content. |
| `content` | Optional starter item declarations with key alias, type key, display name and locale. This is not a general migration payload or complete source-page population. |
| `applications` | Optional application/root/host/preview configuration. It does not provision hosting. Use `website` for this headless SaaS path. |

Use schema-only configuration for routine model work; review bootstrap content, application and locale changes separately. Sample `home`, `StartContent`, `alloy_app` or `stride` names are not client identities. Reconcile existing keys before deciding a new application is needed.

## Field correctness and model coverage

Use the [supported property contract](../supported-model-contract.md) during preparation and embed the relevant subset in the component document. It supplies source-checked array, scalar, reference and component rules and version-mismatch handling. After edits, run the [validation sequence](../model-validation.md): validate actual generated output with the recorded supported profile/full schema checks, not only compiler success. The bundled check's coverage is partial and explicit. Neither a missing validator nor a missing tenant turns into routine SDK research; report the affected check and continue independent local work.

The inspected SDK declares **`isRequired` / `isLocalized`**. Use these in SDK code. Its generic helpers and esbuild can accept unknown extra properties, so a successful compile/import alone cannot prove that a field is required. Validate the emitted manifest and test invalid/valid values in the CMS. SDK objects, target REST schemas and Graph results are different representations; consult the pinned implementation and target API instead of copying similarly named flags across them.

Every `content` / `contentReference`, including array items, needs a concrete `contentType` or non-empty allowed/restricted type constraint. Prefer narrow `allowedTypes`. `component` fields use `contentType`; they own embedded values. Do not use unconstrained reference arrays as an all-purpose content area: they can expand queries dramatically and fail CLI validation. Register referenced types for runtime query generation too.

Keep type/field keys stable. An editor display-name change differs from a key/base-type migration. Before changing existing requiredness, field kind, contracts or references, assess existing values and follow [schema evolution](../schema-evolution-and-import.md). Do not resolve incompatibilities with automatic `--force`.

## Generate, review, push, read back

From the qualified project root, using its installed CLI binary:

```sh
pnpm exec tsc --noEmit
pnpm exec optimizely-cms-cli config push --help
pnpm exec optimizely-cms-cli config push optimizely.config.mjs --dryRun --output migration-manifest.json
```

The spelling is `--dryRun` in the inspected CLI. Confirm the installed help before execution. **Dry run is not guaranteed offline**: this implementation constructs/authenticates its API client before returning. It executes local config/model code. Use only the intended credential context; without credentials, use local type/model checks and record full CLI dry run blocked. `--output` alone does not prevent a push. The output includes types/contracts, display templates and groups; it omits application/content/locale operations, so review those config entries separately. It is a proposed manifest, not a tenant diff or rollback plan.

Changed model/config source invalidates the previous generated-manifest evidence; regenerate and review the affected output before synchronization, even when the SDK qualification checkpoint remains valid. Compare the expected manifest against existing tenant definitions. The inspected CLI supports `pnpm exec optimizely-cms-cli config pull --json` for configuration inventory; record its output in migration evidence and inspect installed help. It is not a complete content/application/recovery export. In this version non-TTY output uses JSON even when generation flags are supplied; do not claim it generated TypeScript without checking the actual files. If using interactive code generation, write to a fresh review directory before merging with curated models.

Require coverage for every approved model/field, correct flags, known references, display choices and no unrelated keys. After authorization for the exact target/actions, run the same push command without `--dryRun`, preserving its output and exit code. Treat manifest, locale, starter-content and application steps as potentially partially completed; they are not one atomic transaction. Read each resource back and checkpoint before retrying.

The inspected implementation updates existing applications with PATCH, despite a stale guide suggesting deletion/recreation. Do not delete an application or start page to update a host. Bootstrap content uses deterministic keys, creates minimal empty values and may skip validation; `403` is not evidence that the item is readable or correct. Independently read back identity, type, version, locale and fields. Populate approved content through the separate migration import process and publish only within release scope.

## Complete the runtime path

Add every relevant model to `initContentTypeRegistry`, every display definition to `initDisplayTemplateRegistry`, and renderers keyed by exact **content type key** to `initReactComponentRegistry`. A variable named `HeroType` with `key: 'MigrationHero'` needs resolver key `MigrationHero`. Include experience/structural renderers already provided by the starter. `.mjs` discovery and these runtime registrations are independent.

Render experience nodes through `OptimizelyComposition`; retain stored order and preview metadata. Check generated query/Graph response, real draft content and preview, required-field rejection, allowed references, independent/shared item behavior and deployed output. Eligibility (`sectionEnabled`), content-tree `mayContainTypes`, reference constraints and the CMS canvas restriction policy are four separate controls. Demonstrate the agreed allowed-section behavior in the editor; otherwise report that capability blocked, not implemented.

Deliver `model-decision.md`, model/config paths, type/export/renderer mapping, exact versions, proposed manifest/hash, tenant diff/readback, application/root/host mapping, actual content identities and QA cases. Start with one full section, then expand the approved inventory. See [Next.js project setup](../../../optimizely-nextjs/references/project-setup.md) and [Hero acceptance](../../../optimizely-nextjs/references/block-walkthrough.md).


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
