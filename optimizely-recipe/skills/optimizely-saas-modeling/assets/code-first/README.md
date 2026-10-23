# Code-first Hero and Cards model example

Original teaching example derived from official SDK patterns, not copied template UI. Read [code-first modeling](../../references/saas/code-first-modeling.md) first. It targets the inspected SDK `3.0.0-beta.0` declarations; qualify the client's chosen package separately. The release's [validation boundary](../../../../VALIDATION.md) records what was actually checked.

Files: [models.ts](models.ts) exports four types, one SEO contract and one display template; [optimizely.config.mjs](optimizely.config.mjs) discovers the model file. In a real project, move the model file under its chosen model folder, adapt the glob and extend the existing registries. Do not overwrite the starter config or discard its registrations.

Model rationale:

- `MigrationLanding`: an experience whose composition supplies the order of sections.
- `MigrationHero`: one independently editable/reorderable unit; heading/body/image/CTA fields stay together. Exports `MigrationHeroType`, `MigrationLandingType` and `HeroDisplay` match the walkthrough's imports. Keep `ctaLabel` and `ctaUrl` paired; Cards uses the distinct `link` field pattern.
- `MigrationCards`: one reorderable section owning one to six embedded cards. Reordering whole sections and reordering cards inside a section are distinct QA cases.
- `MigrationCard`: reused schema with owned values; it has no section/element behavior and no independent shared identity in this example.
- `MigrationSeo`: shared field definition, not shared metadata values across pages.
- `MigrationHeroDisplay`: bounded light/dark choice, to be mapped to implemented CSS variants.

The example deliberately has no applications, content bootstrap or locale enablement. For an authorized new application, add the reviewed entries described in [project setup](../../../optimizely-nextjs/references/project-setup.md); keep existing application keys stable. These files alone do not create content, enforce the Visual Builder section catalogue, provide React renderers or implement a complete site.

Expected checks before integration:

1. Type-check with the selected SDK and inspect every discovered export/manifest key. Expect `MigrationLanding`, `MigrationHero`, `MigrationCards`, `MigrationCard`, contract `MigrationSeo` and display template `MigrationHeroDisplay` exactly once.
2. Verify the generated heading flags are `isRequired: true` and `isLocalized: true`; referenced image targets remain `_image`; card `component` metadata serializes to the card key. Ensure no unrecognized `required`/`localized` SDK aliases survive in the manifest.
3. Configure runtime model/display registries and map `MigrationLanding`, `MigrationHero`, `MigrationCards` to their renderers. If cards render through `OptimizelyComponent`, map `MigrationCard` too; otherwise render their typed embedded values inside Cards explicitly.
4. Use `ContentProps<typeof MigrationHeroType>` and equivalent types for renderers. Render Landing with `OptimizelyComposition`, the Hero rich-text JSON with SDK `RichText`, and maintain preview metadata and accessible link/image behavior. See the existing [walkthrough](../../../optimizely-nextjs/references/block-walkthrough.md). Use this model module as the source, rather than also declaring the walkthrough's same-key illustrative models.
5. Verify CMS enforcement of required values and card limits, contextual alt text and CTA policy, locale inheritance/ownership, draft isolation, actual section restriction controls and persisted order. Adjust the editorial design if the selected tenant cannot support embedded arrays as intended; record a new approved model revision for a material change.

Length/card limits are proposed examples, not universal Optimizely limits. Conditional alt text and cross-field CTA rules still need a supported validation location plus QA; optional `imageAlt` does not prove the accessibility policy is enforced.

After local generation, run the [offline preflight](../../scripts/README.md) with its explicit compatible profile, and keep its limited coverage in the report. The sample remains pinned to 3.0.0-beta.0; do not use it as qualification for another installed SDK. The [supported contract](../../references/supported-model-contract.md) explains other property patterns and ownership choices without a per-component SDK lookup.


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
