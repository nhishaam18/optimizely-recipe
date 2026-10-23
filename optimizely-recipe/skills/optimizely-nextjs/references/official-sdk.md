# Official SDK integration contract

Checked: 2026-09-18 against the official `episerver/content-js-sdk` documentation on `main`. Target: official `@optimizely/cms-sdk`, not the Remko SDK. Verification: source-checked, illustrative code; no installed-package compile or tenant execution. This is preparation reference material, not an implementation startup prerequisite. During implementation use the supplied or existing project pattern and follow [implementation-only entry](../../optimizely-migration-workflow/references/implementation-entry.md); do not copy unqualified illustrative APIs. Explicit setup/SDK investigation follows [qualification](repository.md).

## Model and renderer registration

The SDK uses model definitions to construct typed delivery queries and a separate React registry to select renderers. Register every approved composition type, including its container renderers. CMS synchronization is a separate management operation; adding a runtime registry entry does not create a type in the tenant. Follow the generated template's initialization location, and keep models importable by its configuration loader without importing client-only UI.

Illustrative server initialization module, with the models/components defined in [the walkthrough](block-walkthrough.md):

```tsx
// src/cms/init.ts -- import from server routes and template bootstrap
import 'server-only';
import { config, initContentTypeRegistry,
  initDisplayTemplateRegistry } from '@optimizely/cms-sdk';
import { initReactComponentRegistry } from '@optimizely/cms-sdk/react/server';
import { MigrationHeroType, MigrationLandingType, HeroDisplay }
  from '@/cms/models';
import { MigrationHero, MigrationLanding } from '@/components/migration';

config({
  apiKey: process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!,
  graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY,
});
initContentTypeRegistry([MigrationHeroType, MigrationLandingType]);
initDisplayTemplateRegistry([HeroDisplay]);
initReactComponentRegistry({ resolver: {
  MigrationHero,
  MigrationLanding,
} });
```

Resolver keys must match content type keys exactly. Extend the template's registry; do not overwrite existing experience, section or asset registrations. When display templates use a `tag`, register its variant under the type's `tags` map with a `default` fallback. A missing renderer must produce an actionable development error and the agreed public fallback, plus QA evidence; it must not silently erase a section. [Official rendering guide](https://github.com/episerver/content-js-sdk/blob/main/docs/6-rendering-react.md), [display settings guide](https://github.com/episerver/content-js-sdk/blob/main/docs/9-display-settings.md).

## Server route and query

The following route assumes one confirmed application host, an approved locale encoded in the CMS path, and a qualified SDK whose declarations accept `host`. It handles root as well as nested paths. Replace normalization only after documenting the actual application URL contract.

```tsx
// src/app/[[...slug]]/page.tsx
import '@/cms/init';
import { getClient } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext }
  from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';

async function Page({ params }: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const path = slug.length ? `/${slug.join('/')}/` : '/';
  const host = process.env.APPLICATION_HOST;
  if (!host) throw new Error('APPLICATION_HOST must be configured');
  const matches = await getClient().getContentByPath(path, { host });
  if (!matches.length) notFound();
  if (matches.length !== 1) throw new Error('Ambiguous CMS route');
  return <OptimizelyComponent content={matches[0]} />;
}
export default withAppContext(Page);
```

`getClient()` uses the configured client. `getContentByPath` returns matching items, so a multi-site route must not choose the first ambiguous result. Use `getContent({ key, locale })` when fetching a known identity; privileged/version-specific preview belongs to the preview path. The SDK builds queries from registered definitions. Record the actual generated query/selection and sanitized response evidence instead of imposing an unrelated fragment generator. Custom GraphQL clients still need checked-in queries and types validated against the target schema. [Fetching guide](https://github.com/episerver/content-js-sdk/blob/main/docs/5-fetching.md).

## Composition and presentation

An experience renderer delegates stored `content.composition.nodes` to `OptimizelyComposition`. A grid section uses the installed SDK's section/structural renderers; retain node order and identity. `compositionBehaviors: ['sectionEnabled']` makes a component eligible as a section; it is not an allowlist of all sections editors may insert. Verify the selected tenant's composition restrictions and editor controls separately. [Experience guide](https://github.com/episerver/content-js-sdk/blob/main/docs/8-experience.md).

Display templates define approved choices and optionally select tagged renderers. Register definitions for both runtime use and the generated CLI configuration. Map values to explicit CSS variants; never interpolate arbitrary editor strings as utility classes. The Hero's content fields remain independent of its display choices. See [design-system mapping](design-system.md).

## Version boundary and outputs

SDK 3 documentation places query-generation options under `fragment` and per-request defaults under `query`; older versions used a different shape. Rich-text queries must contain the JSON representation used by `RichText`. During preparation qualify these optional settings against installed declarations. During implementation reuse an already verified setting or omit optional unqualified settings; do not start declaration research before a concrete SDK API/type compiler error or model/manifest/CMS validation error. `query.cache` controls SDK query behavior; it does not prove Next.js/CDN invalidation. Use [rendering](rendering.md) and [preview](preview.md) for explicit policies.

Deliver model keys, renderer paths, registry entries, generated query evidence, composition settings, actual content identities and error behavior. Keep CMS credentials and server imports out of client bundles. Small client components receive serializable interaction props; they do not initialize management clients or registries.

## Code-first discovery and source correction

Runtime initialization above is independent of CLI schema discovery. Follow [code-first modeling](../../optimizely-saas-modeling/references/saas/code-first-modeling.md) and [project setup](project-setup.md) to create `.mjs`, export discovered models, review the serialized manifest and synchronize scoped changes. Consult the [pinned source conflicts](../../optimizely-saas-modeling/references/sdk-source-ledger.md) before copying field flags or scaffold scripts.

## Recipe release versus dependency compatibility

Recipe/skills release versions (for example 1.3.6 or 1.3.7) are independent of Optimizely SDK and CLI package versions. Never compare them or raise a compatibility blocker from their numeric difference. Record recipeVersion separately from sdkPackage/sdkResolvedVersion and cliPackage/cliResolvedVersion, using repository dependency records during preparation. During implementation reuse the recorded versions; package fingerprinting is not an exception to the prohibition on routine node_modules reading. A fingerprint records provenance, not proof of compatibility. Reuse qualified repository patterns. A concrete unsupported API, property or validation error can block its affected operation; a different recipe number cannot. A pattern verified against SDK 3 is not automatically verified against SDK 2 either. Record the exact affected mapping, evidence and independent next action instead of a blanket version blocker. No dependency upgrade or broad SDK exploration follows from a version difference.
