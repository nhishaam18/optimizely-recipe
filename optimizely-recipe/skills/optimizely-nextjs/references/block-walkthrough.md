# Complete Hero path: evidence, CMS, Next.js, editing and release

Checked: 2026-09-18. Target: official SDK with exact versions to be captured by [qualification](repository.md), CMS SaaS REST v1. **Verification level: source-checked illustrative example, not compiled, scaffold-tested, tenant-tested or deployed.** No tenant, host or source screenshots were supplied for this bundle. The fixture names and values below are examples; replace them with the approved source contract.

For an existing approved implementation, follow [implementation-only entry](../../optimizely-migration-workflow/references/implementation-entry.md). Reuse step 1's approved contract; implement/type-check step 2's model and step 4's renderer locally before step 3's tenant operations. Add local registration/discovery and fixtures, then generate/review the manifest before synchronization. The numbered sections below organize the complete integration example, not prerequisites that block local UI work without credentials.

## 1. Establish the editorial and visual contract

Suppose QA observes a page introduction with heading, formatted summary, image and CTA. Give the occurrence ID `home.hero.01`; another page's Hero gets its own occurrence. Both may use type `MigrationHero` without sharing the same content instance. Model it as one movable section, not one content type per screenshot rectangle.

| Field | Editorial intent | Proposed constraint and handling |
|---|---|---|
| `heading` | Section heading | Required; localized when the approved locale scope requires it; heading length stress-tested |
| `body` | Optional formatted summary | Minimal formatting only if observed/approved; render JSON with the SDK rich-text renderer |
| `image` | Managed image reference | Only an approved image type; preserve original asset, crop and provenance |
| `imageAlt` | Context-specific alternative text | Required editorially for informative images; empty only for approved decorative use |
| `ctaLabel`, `ctaUrl` | Optional action | Both present or both absent; URL rewritten through the source-to-target link map |
| display `theme` | Approved visual variant | Only `light`/`dark` in this example; separate from semantic fields |

These are proposed constraints, not claims that each is enforced by the short SDK definition. Add server/model validation supported by the pinned SDK and check the CMS editor. See modeling's [migration contract](../../optimizely-saas-modeling/references/migration-contract.md), [shared fields](../../optimizely-saas-modeling/references/saas/contracts-and-shared-fields.md) and [assets](../../optimizely-saas-modeling/references/saas/media-and-assets-saas.md). Source observations and measured tokens belong in [the design-system record](design-system.md).

## 2. Define types and constrained display settings

Illustrative `src/cms/models.ts` below uses SDK definitions, **not REST request JSON**. A required/localized/indexing decision must be checked against the selected declarations and tenant; never send SDK definition objects directly as REST payloads. Keep this module free of React UI imports.

```ts
import { contentType, displayTemplate } from '@optimizely/cms-sdk';

export const MigrationHeroType = contentType({
  key: 'MigrationHero', displayName: 'Hero', baseType: '_component',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    heading: { type: 'string', isRequired: true },
    body: { type: 'richText', editorSettings: { preset: 'minimal' } },
    image: { type: 'contentReference', allowedTypes: ['_image'] },
    imageAlt: { type: 'string' },
    ctaLabel: { type: 'string' },
    ctaUrl: { type: 'url' },
  },
});
export const MigrationLandingType = contentType({
  key: 'MigrationLanding', displayName: 'Landing page',
  baseType: '_experience',
  properties: { title: { type: 'string', isRequired: true } },
});
export const HeroDisplay = displayTemplate({
  key: 'MigrationHeroDisplay', displayName: 'Hero appearance',
  contentType: 'MigrationHero', isDefault: true,
  settings: {
    theme: { editor: 'select', displayName: 'Theme', sortOrder: 0,
      choices: {
        light: { displayName: 'Light', sortOrder: 0 },
        dark: { displayName: 'Dark', sortOrder: 1 },
      },
    },
  },
});
```

`MigrationLanding` supplies the route title and a composition; `MigrationHero` is a section-enabled component. Type-check and register both plus the display template locally; synchronize only after generated-manifest review and target authorization. Follow [official modeling](https://github.com/episerver/content-js-sdk/blob/main/docs/3-modelling.md), [experience](https://github.com/episerver/content-js-sdk/blob/main/docs/8-experience.md) and [display-template](https://github.com/episerver/content-js-sdk/blob/main/docs/9-display-settings.md) conventions for the pinned release.

This definition does **not** establish a locked composition catalogue. Configure the approved section allowlist/layout using the tenant's supported composition settings, read it back and prove an editor cannot add unsupported sections. If that enforcement is unavailable in the selected SDK/tenant, record the capability gap and obtain a scoped design decision; a renderer allowlist alone is insufficient. Do not add grid/nested editing merely because it exists in Stride.

## 3. Synchronize and create actual draft content

Developer records the authorized tenant, application/root, locale and allowed schema/content actions. Export/read back prior definitions. Add the new definitions and display template to the generated config using its documented exports, inspect the resulting diff, then run the qualified repository's `config:push` script within that scope. Do not replace the application manifest with an unreviewed sample.

Create a draft `MigrationLanding` under the application root with the agreed URL segment/title. In Visual Builder add one `MigrationHero` section, enter a fixture heading such as “Plan your next visit,” optional body, a real uploaded image, contextual alt text and an approved CTA. Select the display theme. Add a second approved section or another independently edited Hero to make reordering observable. Keep the asset/content mapping and read back the actual keys, locale, versions, composition node IDs and order. Use the management skill's scoped create/update contract for API automation; this paragraph is the executable editor route and does not invent a REST composition payload.

Publish only authorized fixtures when public delivery is needed; keep later editing tests as drafts. Store a sanitized readback and delivery query result, never a fabricated Graph response. If Graph indexing is pending, record bounded retries and the observed state. A fixture object rendered locally does not satisfy this step.

## 4. Register and render the actual content

Use [official-sdk.md](official-sdk.md) for the server model/component/display registries and `getClient().getContentByPath` route. Register `MigrationHero` and `MigrationLanding` under those exact type keys. `MigrationHeroType` is the TypeScript export; `MigrationHero` is the persisted CMS key. The following illustrates `src/components/migration.tsx`.

Graph's [ContentUrl schema](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/property-schemas-saas) is structured, while SDK documentation describes simple URL values. Inspect the pinned SDK's inferred `ContentProps<typeof MigrationHeroType>['ctaUrl']` and sanitized delivery result. The boundary below accepts a normalized string or a structured `default` URL, and rejects internal/inactive objects; it does not concatenate `base`/`hierarchical` or stringify an object. Qualify actual host/locale resolution and URL selection before adoption.

```tsx
import type { ContentProps } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils, OptimizelyComposition }
  from '@optimizely/cms-sdk/react/server';
import { MigrationHeroType, MigrationLandingType, HeroDisplay }
  from '@/cms/models';

// Fixture content already uses target URLs. Populate from the approved link map
// for a real migration, or inject the project's verified host/locale resolver.
const migrationLinkMap = new Map<string, string>();
function resolveHeroUrl(value: unknown): string | undefined {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return undefined;
  const url = value as { type?: unknown; default?: unknown };
  if (url.type === 'INTERNAL' || url.type === 'INACTIVE') return undefined;
  return typeof url.default === 'string' ? url.default : undefined;
}

// Example policy: same-site paths/fragments or HTTPS destinations only.
function safeCta(value?: string) {
  if (!value || /[\u0000-\u0020\u007f]/.test(value) || value.includes('\\')) return undefined;
  if (value.startsWith('#')) return value;
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try { return new URL(value).protocol === 'https:' ? value : undefined; }
  catch { return undefined; }
}

export function MigrationHero({ content, displaySettings }: {
  content: ContentProps<typeof MigrationHeroType>;
  displaySettings?: ContentProps<typeof HeroDisplay>;
}) {
  const { pa, src } = getPreviewUtils(content);
  const resolvedUrl = resolveHeroUrl(content.ctaUrl);
  const href = safeCta(resolvedUrl === undefined ? undefined
    : migrationLinkMap.get(resolvedUrl) ?? resolvedUrl);
  const theme = displaySettings?.theme === 'dark' ? 'hero--dark' : 'hero--light';
  return <section className={`hero ${theme}`}>
    <div className="hero__copy">
      <h2 {...pa('heading')}>{content.heading}</h2>
      {content.body?.json && <div {...pa('body')}>
        <RichText content={content.body.json} />
      </div>}
      {href && content.ctaLabel && <span {...pa('ctaUrl')}>
        <a href={href} {...pa('ctaLabel')}>{content.ctaLabel}</a>
      </span>}
    </div>
    {content.image && <figure className="hero__media" {...pa('image')}>
      <img src={src(content.image)} alt={content.imageAlt ?? ''}
        {...pa('imageAlt')} />
    </figure>}
  </section>;
}
export function MigrationLanding({ content }: {
  content: ContentProps<typeof MigrationLandingType>;
}) {
  const { pa } = getPreviewUtils(content);
  return <main>
    <h1 {...pa('title')}>{content.title}</h1>
    <OptimizelyComposition nodes={content.composition.nodes ?? []} />
  </main>;
}
```

This deliberate heading policy keeps one page `h1` and reorderable section `h2`s. Adapt to the observed design through an explicit page contract; do not create several `h1`s because several Heroes can be inserted. `pa()` property names must match the model. SDK composition supplies node editing wrappers; confirm field overlays in the CMS. Media rendering still needs approved responsive sources/dimensions or the qualified template's image primitive. Empty alt in code is a defensive fallback, not permission to omit meaningful descriptions.

Example CSS fixture, **not source-derived tokens**:

```css
.hero { display: grid; gap: 2rem; padding: 3rem 1rem; }
.hero--light { background: #fff; color: #15202b; }
.hero--dark { background: #15202b; color: #fff; }
.hero__copy { min-width: 0; overflow-wrap: anywhere; }
.hero__media { margin: 0; aspect-ratio: 4 / 3; }
.hero__media img { width: 100%; height: 100%; object-fit: cover; }
@media (min-width: 48rem) { .hero { grid-template-columns: 1fr 1fr; } }
```

Replace fixture values/breakpoint with accepted tokens and inferred rules; verify focal point, font, contrast and CTA focus states. Inspect the real generated SDK query and Graph output: heading/body JSON/image metadata/CTA plus composition nodes must be delivered. Do not add a second community-SDK fragment-generation workflow to make official delivery work.

## 5. Prove the editorial loop on the deployment

Configure [preview](preview.md), produce [the deployment receipt](deployment.md), then give QA the deployed URL, build identity and content mapping. QA operates independently using the existing release authorization.

| Check | Action | Evidence/expected result |
|---|---|---|
| Published baseline | Open deployed route normally | Real CMS content, correct host/locale, Hero fields/assets/links and stored order |
| Draft isolation | Change heading to a unique test marker; save draft | Authenticated CMS preview changes; ordinary public route stays on the published value |
| Reorder | Move Hero after the second approved section | Preview order matches CMS node order without a code change; field overlays still identify the right instance |
| Publication | Publish authorized content through CMS | Record publication time, first Graph visibility and first normal public-route visibility; meet agreed freshness target |
| Invalid preview | Open without/with expired preview token | No draft exposure; useful failure behavior |
| Visual and functional | Match approved desktop/mobile states | Heading wraps, image crop, no overflow, working CTA, keyboard focus, no relevant console/network errors |
| Content stress | Empty optionals, long heading, missing image/link | Defined accessible fallback; no crash or unwanted empty control |

Record pass/fail/blocked per test with timestamp, actor, occurrence/type/content keys, locale/version, URL, deployment ID and evidence path. Restore fixture values only within the authorized CMS actions. QA returns defects to Developer through Orchestrator and retests the affected deployed route. Do not substitute Developer's local screenshot for this independent acceptance.


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
