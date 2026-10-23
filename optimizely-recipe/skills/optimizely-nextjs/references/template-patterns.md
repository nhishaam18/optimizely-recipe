# Read the official samples as connected implementations

Source snapshot: `episerver/content-js-sdk` commit `e9b16941bd4e0b19b6ea15b89486d3234a85bc60`, inspected 2026-09-22. Follow the pinned links below; they are implementation evidence, not certification of a deployed site.

## Hello-world: learn the minimum chain

[`samples/hello-world/src/components/Article.tsx`](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/samples/hello-world/src/components/Article.tsx) exports `ArticleContentType` with key `HelloWorld_Article`, base `_page` and heading/body properties. Its default export is a React renderer typed with `ContentProps<typeof ArticleContentType>`.

[`optimizely.config.mjs`](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/samples/hello-world/optimizely.config.mjs) scans `src/components/**/*.tsx`, declares `ArticleContent` bootstrap content of type `HelloWorld_Article`, and connects application `hello_world_app` to that alias. This teaches four distinct names: exported JavaScript variable, stable type key, bootstrap content alias and application key. Do not confuse any of them with the renderer function or the final item GUID.

The sample directly renders `body.html`. Current SDK defaults query rich-text JSON; copying this renderer without its query configuration can leave the body blank. Prefer the qualified SDK `RichText` JSON path for this migration, or explicitly validate an HTML-rendering policy and selection.

## Stride: composition structure

[`templates/stride/optimizely.config.mjs`](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/templates/stride/optimizely.config.mjs) scans root-level `components/`, declares a `home` item of type `StartPage`, enables `en` and configures application `stride`. Its globs mention `components/contracts/*.ts`, but this snapshot has no such directory. A glob entry is not proof a model was discovered.

Read [`components/pages/Start.tsx`](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/templates/stride/components/pages/Start.tsx) → [`components/sections/Hero.tsx`](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/templates/stride/components/sections/Hero.tsx) → [`lib/initialization.ts`](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/templates/stride/lib/initialization.ts).

- Start is an `_experience` rendering `content.composition.nodes` through `OptimizelyComposition`.
- Hero is a structural `_section` with video and `OptimizelyGridSection` wrappers. This differs from a section-enabled `_component` holding a complete fixed-design Hero.
- Initialization separately configures Graph and model/display/React registries, including exact key-to-renderer mappings. It also includes Forms integration; require tenant capability and a source-site need before carrying forms into a migration.
- `app/[[...slug]]` and `app/preview` implement normal and preview routes. Preserve their version/host/authentication conventions after inspection.

Stride's README is work in progress. Hero includes a placeholder remote video workaround; do not treat it as migrated client media. Broad `mayContainTypes: ['*']` is not the approved-section policy. Adopt patterns and qualify behavior rather than importing all demo content, permissions or external assets.

## Alloy: structured content and ownership

[`templates/alloy/optimizely.config.mjs`](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/templates/alloy/optimizely.config.mjs) scans `src/components`, declares SEO/site-settings groups and links `StartContent` to application `alloy_app`. Its locale examples are source data, not the client's approved language list; validate locale codes before enabling them.

[`src/components/Start.tsx`](https://github.com/episerver/content-js-sdk/blob/e9b16941bd4e0b19b6ea15b89486d3234a85bc60/templates/alloy/src/components/Start.tsx) defines `_experience` key `Start`, restricts content-tree child types to Standard/Product and combines typed fields with composition. It embeds a Button and an SEO component and uses link arrays/site references. This is a different ownership pattern from SDK `contract()`/`extends`; choose embedded SEO when ownership/grouping calls for it, contracts when sharing a flat field definition is intended. Both need actual Graph and editor checks.

Audit copied fields semantically. A field named logo is not proof its allowed target type is appropriate for the migration; template code can contain placeholders or questionable constraints. Keep the model worksheet and source evidence authoritative for the client requirement.

## Adaptation checklist

Identify each type key, exported definition, matched glob, serialized manifest entry, runtime registry, renderer and actual CMS instance. Verify all seven links for a complete Hero/Cards path. Make a local build and a real tenant/editor smoke test the qualification gate. Demo archives (`.episerverdata`) and management scripts can overwrite or introduce unrelated content: they are optional isolated-sample setup, not a default client migration.
