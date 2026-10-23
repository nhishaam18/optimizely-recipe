# Project creation, structure and libraries

Target CMS SaaS / Next.js / official SDK. Checked 2026-09-22 against [pinned sources](../../optimizely-saas-modeling/references/sdk-source-ledger.md). This guide distinguishes source examples, published scaffolding and a qualified client application.

For an already cloned application with approved scope, use [implementation-only entry](../../optimizely-migration-workflow/references/implementation-entry.md). Its persisted qualification replaces repeating this starter survey. Consult the relevant section here only when creating the project or resolving a concrete setup gap.

## Establish the workspace

Read the repository's instructions, changes, lockfile and package scripts. For an existing application, retain its integration family and extend it. For a new one, select the official template against editor requirements. Record destination path, remote owner/name if needed, Node/package manager, template/version and whether the operation is a local scaffold, clone or remote fork. Do not overwrite user work or describe a local copy as a fork.

| Source | What to learn | Use in this migration |
|---|---|---|
| `samples/hello-world` | Exported Article type beside renderer, `.mjs` glob, bootstrap content/application | Smallest explanation of the full model discovery path; not a full production baseline. |
| `samples/nextjs-template` | Multiple experiences, editor groups, applications, Next.js routes | Starter/reference for integrations; inspect its actual generated files rather than assuming every sample is minimal. |
| `templates/stride` | `app/`, `components/pages`, `sections`, `elements`, `blocks`, `layouts`, `forms`, `lib/initialization.ts` | First candidate for composition demo; marked work in progress. Keep approved section editing controlled. |
| `templates/alloy` | `src/app`, `src/components`, `src/lib`, structured pages, embedded components, SEO and application configuration | Alternative/reference for structured-site requirements. Its SDK implementation is the one being studied here. |

See [source/template walkthrough](template-patterns.md) for exact file connections and caveats.

## Preferred published scaffold path

Record exact versions/integrity first using `npm view`; use the supported Node/package-manager versions of the selected package. The inspected create-app source is version `1.0.0`, but this is not proof it is the release you should install. The following is a command **template**: replace `EXACT_VERSION` with the verified value.

```sh
npm view @optimizely/cms-create-app version dist-tags engines dist.integrity --json
npx @optimizely/cms-create-app@EXACT_VERSION --help
npx @optimizely/cms-create-app@EXACT_VERSION migration-demo --template nextjs-stride --pm pnpm --skip-install
```

Flags above exist in the inspected source; confirm them in the selected published help. `nextjs-alloy` and `nextjs-starter` are alternatives, not dependencies to combine. Inspect output before installing. Keep the generated package manifest and use its package manager to install and retain a lockfile. Subsequent clean installs use that manager's frozen-lockfile mode. See [qualification](repository.md).

Fresh/scaffold mode adds CMS integration to a new/existing framework app and may leave initialization to the developer; inspect root layout, route and preview wiring. The inspected scaffold differs from templates: its README/script mentions `manifest push`, while `.mjs` is consumed by `config push`, and its `buildConfig` subpath import may not export the function. Verify the generated command/import against the installed packages; do not copy these discrepancies into the project. Root `import { buildConfig } from '@optimizely/cms-sdk'` is the verified source pattern in Stride/Alloy.

## Clone/source-study path

For repository study, clone the official repository into a distinct directory and record `git rev-parse HEAD`. To reproduce this research snapshot:

```sh
git clone https://github.com/episerver/content-js-sdk.git content-js-sdk
git -C content-js-sdk checkout --detach e9b16941bd4e0b19b6ea15b89486d3234a85bc60
```

This is the SDK monorepo, not an independent client application. Its raw templates depend on `workspace:*`. To run inside it, follow that commit's package manager/workspace installation and build instructions, inspect scripts and keep it separate from client code. Prefer published create-app output for a standalone project. If copying a template is explicitly selected, record all dependency/build adaptations; replace workspace references only with verified compatible published releases and qualify the resulting app. Do not infer standalone installability from a folder copy.

## Adapt a coherent project tree

Preserve the chosen template's `app` versus `src/app` convention. One valid separated-model layout is:

```text
optimizely.config.mjs       # CLI discovery and reviewed bootstrap metadata
package.json + lockfile     # selected SDK, CLI, framework, tooling and scripts
.env.example               # variable names only; values ignored by Git
src/cms/models/            # exported pure model/contract/display definitions
src/components/            # renderers, layouts and interaction components
src/lib/initialization.ts  # SDK config + model/display/React registries
src/app/[[...slug]]/page.tsx # root and nested routes, host + locale handling
src/app/preview/page.tsx   # template's authenticated preview flow
migration/                # approved source/model evidence and change records
```

Use `components: ['./src/cms/models/**/*.ts']` for this layout, or enumerate verified files. Do not also scan barrels that duplicate the same exports. Colocated `.tsx` models remain valid if their CLI imports are safe. Import/init the runtime where the selected template requires it; keep server secrets out of client components. A React registry and a CLI discovery glob solve different problems.

## Dependency responsibilities

| Library/tool | Why it is present |
|---|---|
| `@optimizely/cms-sdk` | Typed model helpers, Graph client/query generation, composition/preview/rendering integration. |
| `@optimizely/cms-cli` (development/tooling) | Schema/configuration extraction and authorized CMS operations; not browser code. |
| `@optimizely/cms-create-app` | Scaffolding tool; not a runtime dependency solely because it created the project. |
| Next.js, React, React DOM, TypeScript and type packages | Framework/runtime and compile-time contracts; choose one compatible pinned set. |
| Tailwind, PostCSS, `clsx`, `tailwind-merge`, icon library | Preserve the selected template's styling/tooling when used; not CMS requirements for every project. |
| SDK RichText / Next.js image facilities | Use the installed SDK's structured rich-text renderer; configure actual media hosts and intended image optimization. |
| Playwright / capture tooling | QA/dev evidence; existing capture skill documents its dependencies. Add test tools only to the right environment. |

Use existing package scripts, then add missing checks intentionally. Do not introduce another CMS SDK, general GraphQL codegen stack or UI library without an actual requirement. Inspect licenses and lockfile resolution; record versions rather than carrying `latest` into a reproducible demo.

## Environment and bootstrap application

Use the generated environment example and installed CLI docs. Separate CMS management credentials (often `OPTIMIZELY_CMS_CLIENT_ID`, `OPTIMIZELY_CMS_CLIENT_SECRET`) from Graph delivery configuration (`OPTIMIZELY_GRAPH_SINGLE_KEY`, `OPTIMIZELY_GRAPH_GATEWAY`) and `APPLICATION_HOST`. Record variable names and secret-store locations, never values. Inspect CLI credential precedence and API endpoint/tenant before any command; do not copy a sample's broad root permissions or disabled TLS verification.

For an approved **new** demo application, a config can include the following entries in addition to the verified `components`, `propertyGroups` and `locale`. These are symbolic teaching identities; replace them with recorded target names. `MigrationLanding` must have been discovered first.

```js
content: [{
  key: 'migration_home', displayName: 'Migration home',
  contentType: 'MigrationLanding', locale: 'en',
}],
applications: [{
  key: 'migration_demo', displayName: 'Migration demo', type: 'website',
  entryPoint: 'migration_home', isDefault: false,
  useApplicationSpecificAssets: true,
  hosts: [{ authority: 'localhost:3000', type: 'primary', preferredUrlScheme: 'https' }],
  usePreviewTokens: true,
}],
```

The alias `migration_home` resolves to a real content reference during bootstrap. It is not the type key `MigrationLanding`, nor necessarily the eventual CMS GUID or URL. The CLI creates minimal content; fill/validate actual fields separately. App settings can be updated in current source; do not delete existing applications/start pages to reconfigure them. HTTPS, locale/host mappings and preview URL formats must match the running frontend. Authorize locale enablement separately from translations and check actual readback.

## Completion and missing inputs

Run local type/build checks and the [model/config procedure](../../optimizely-saas-modeling/references/saas/code-first-modeling.md), then complete one real CMS-to-renderer section. Qualification requires Graph, editor preview and normal public delivery checks on the actual tenant. Ask only for missing choices that block the next operation: source URL/scope, destination repository, CMS tenant/application/locale, secret provisioning, template decision or hosting/release authorization. Continue local modeling and code checks while external access is unavailable; report those integration checks blocked.
