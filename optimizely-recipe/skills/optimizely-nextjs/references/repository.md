# Repository and official template qualification

Checked: 2026-09-18. Target: CMS SaaS REST v1 and a project-pinned Next.js/SDK pair. Verification: documentation/source inspection only; no published scaffold installation, build or tenant test has been performed for this bundle.

## Select a coherent path

| Situation | Action |
|---|---|
| User supplies an existing application | Inspect its instructions, changes, router, dependencies, lockfile, model/query registration, preview handler and build scripts. Extend the installed SDK conventions. Record an explicit decision before replacing the integration. |
| New application with no selected starter | Evaluate official Stride through published `@optimizely/cms-create-app`. Qualify generated output before adoption. Use Alloy as an additional model/configuration reference. |
| Existing or explicitly chosen Remko application | Preserve that SDK's registry, GraphQL/codegen and preview flow. Treat [remkoj/optimizely-saas-starter](https://github.com/remkoj/optimizely-saas-starter) as a separate community path. Official `@optimizely/cms-sdk` snippets are not drop-in replacements. |

The [official Stride README](https://github.com/episerver/content-js-sdk/blob/main/templates/stride/README.md) describes composition, TypeScript and Tailwind, but labels the template Work in Progress. Its [raw manifest](https://github.com/episerver/content-js-sdk/blob/main/templates/stride/package.json) has `workspace:*` SDK/CLI dependencies. Neither is a standalone consumer qualification. The [July 23 release notes](https://support.optimizely.com/hc/en-us/articles/27677034133645-2026-CMS-SaaS-release-notes) introduce the published scaffolder and SDK/CLI 2.2.0; that historical release number is not a recommendation to install it now.

## Qualification scope

For an existing application and approved implementation scope, follow [implementation-only entry](../../optimizely-migration-workflow/references/implementation-entry.md). Reuse the supplied or existing project SDK pattern, then edit/type-check the first model. Do not explore node_modules or external SDK documentation at startup; only an actual SDK API/type compiler error or model/manifest/CMS validation error permits a directly relevant declaration or official schema read. Record and reuse the correction. Starter comparison, a full baseline build, tenant rehearsal and deployed QA are not prerequisites to that edit. Changed inputs are recorded; they do not by themselves authorize SDK exploration during implementation.

## New-project qualification procedure

1. Inspect published package metadata without installing. For npm, capture the JSON output of `npm view @optimizely/cms-create-app version dist-tags engines dist.integrity --json`, then inspect the selected **exact** version with `npm view @optimizely/cms-create-app@<exact-version> --json`. Record provenance, package README, supported Node and package manager. Do the same for SDK/CLI versions that the generated template actually selects.
2. In an isolated, authorized local directory, run `npx @optimizely/cms-create-app@<exact-version> --help`. This command is a template: substitute the recorded real version. Use the published CLI's documented prompts/options to select Stride; do not invent `--template` flags from another scaffolder. Preserve the exact command, non-secret prompt selections and output. A local scaffold is not a remote repository fork.
3. Inspect the generated README, `package.json`, lockfile, environment example, `optimizely.config.*`, registries, route and preview files. Resolve dependencies through the generated supported package manager. If output still contains unresolved `workspace:*`, stop qualification and report the package/version defect; do not substitute guessed SDK ranges. Record any material difference from raw template `main`.
4. Pin the selected scaffold version and generated dependency resolution. Keep its lockfile and record template tag/commit if published metadata provides one; otherwise record package integrity and generated-source hash with “template commit unavailable.” Never invent a Git commit. Capture exact installed versions with the package manager's dependency listing, including transitive versions needed by the integration.
5. Run the generated project's build, type/lint and relevant tests using its actual scripts. Inspect scripts first: `config:push` can change a CMS application, not merely validate local TypeScript. Separate local build evidence from schema synchronization.
6. After local implementation and manifest review, perform integration qualification against an authorized demo tenant: inspect the configuration diff, synchronize only agreed definitions/settings, create a real draft experience with Hero, fetch it, preview it and publish only the authorized fixture. Run [the walkthrough](block-walkthrough.md), deploy, and obtain QA's independent result. These establish integration readiness; they do not gate local model/UI coding. Sample imports/reset instructions are for explicitly isolated qualification environments, not existing client content.

## New-project qualification record

For a new project, create `starter-qualification.md` in the project's migration evidence directory. An existing implementation-only application uses the compact checkpoint instead; do not create a second qualification document before editing.

```text
Decision: existing SDK retained | candidate | qualified | rejected
Repository/path and local changes:
SDK family and reason:
Scaffolder package/exact version/integrity:
Template name/revision or package-integrity substitute:
Generated source hash; lockfile hash:
Exact SDK / CLI / Next.js / React / Node / package-manager versions:
Router and runtime; host compatibility:
Commands and actual exit codes; log paths:
Definitions/config changed and tenant/application identity:
Real content keys/locale; public and preview routes:
Installed declaration/source URLs and checked date:
Status: source-checked | locally built | tenant-tested | deployed-QA-tested
Failures/blocked evidence and next owner:
```

Current [fetching documentation](https://github.com/episerver/content-js-sdk/blob/main/docs/5-fetching.md) describes SDK 3's grouped `fragment`/`query` options, and [modeling documentation](https://github.com/episerver/content-js-sdk/blob/main/docs/3-modelling.md) describes changed rich-text defaults. During preparation check the installed version's declarations before adopting these shapes. During implementation use supplied/project patterns; do not copy a moving upstream example or bypass the concrete-error-only lookup policy. A moving `main` link is research provenance, not an exact tested dependency pin.

## 1.3.0 implementation detail

When creating or changing a starter, use [project setup](project-setup.md) for verified source flags, dependency responsibilities, clone/scaffold distinctions, environment and application bootstrap, and [sample/template patterns](template-patterns.md) before selecting or adapting Stride/Alloy. Existing implementation-only work consults these for a concrete setup gap; its checkpoint supplies already known facts. The inspected create-app source supports `--template`, `--pm` and `--skip-install`; check the selected published help before using them. Source manifests are not evidence that a published generated app builds.

## Recipe release versus dependency compatibility

Recipe/skills release versions (for example 1.3.6 or 1.3.7) are independent of Optimizely SDK and CLI package versions. Never compare them or raise a compatibility blocker from their numeric difference. Record recipeVersion separately from sdkPackage/sdkResolvedVersion and cliPackage/cliResolvedVersion, using repository dependency records during preparation. During implementation reuse the recorded versions; package fingerprinting is not an exception to the prohibition on routine node_modules reading. A fingerprint records provenance, not proof of compatibility. Reuse qualified repository patterns. A concrete unsupported API, property or validation error can block its affected operation; a different recipe number cannot. A pattern verified against SDK 3 is not automatically verified against SDK 2 either. Record the exact affected mapping, evidence and independent next action instead of a blanket version blocker. No dependency upgrade or broad SDK exploration follows from a version difference.

## Compact handoff preparation

Use the [SDK qualification template](../assets/sdk-qualification.template.md) only when preparing a missing record. Copy relevant verified facts into component handoffs; implementation does not need to reread this record. Retain the existing implementation lookup restriction.
