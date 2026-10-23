# Preview, field editing and publication evidence

Checked: 2026-09-18 against the [official SDK live-preview guide](https://github.com/episerver/content-js-sdk/blob/main/docs/7-live-preview.md). Target: the qualified official SDK; keep an existing SDK's handler if that path was selected. Code is source-checked and illustrative, not compiled or tenant-tested.

## Configure the route and CMS application

Use the generated template's preview route, or implement `/preview` using `withAppContext`, `getClient().getPreviewContent`, `OptimizelyComponent`, the CMS communication injector and `NextPreviewComponent` for a compatible Next.js SDK release. Configure the actual CMS application hostname and Live Preview settings with preview tokens and the deployed `/preview` URL. Preserve SDK-supported key, locale, version and mode; do not fabricate token parameter names from another SDK.

Keep the configuration fields distinct: the CMS **Hostname** control takes a host and optional port without a URL scheme, with its separate HTTPS setting; **Preview URL** is a complete URL. The SDK path-query `host` option follows the installed SDK's documented format. The [CMS applications guide](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/applications) is the source for the CMS UI fields. Confirm locale mapping because it can change whether delivered paths include a language segment.

Illustrative route wiring:

```tsx
// src/app/preview/page.tsx
import '@/cms/init';
import { getClient, type PreviewParams } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext }
  from '@optimizely/cms-sdk/react/server';
import { NextPreviewComponent } from '@optimizely/cms-sdk/next';
import Script from 'next/script';

async function PreviewPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  if (Object.values(params).some(Array.isArray)) {
    throw new Error('Invalid preview parameters');
  }
  // Production handler must validate the installed SDK PreviewParams contract,
  // reject absent/expired auth, and return a safe unauthorized response.
  // The cast adapts the tutorial shape; it is not authorization validation.
  const content = await getClient().getPreviewContent(params as PreviewParams);
  const cmsUrl = process.env.OPTIMIZELY_CMS_URL;
  if (!cmsUrl) throw new Error('CMS preview origin must be configured');
  return <>
    <Script src={new URL('/util/javascript/communicationinjector.js', cmsUrl).href} />
    <NextPreviewComponent />
    <OptimizelyComponent content={content} />
  </>;
}
export default withAppContext(PreviewPage);
```

The complete production handler adds installed-version parameter validation, SDK/Graph authorization error handling, a no-store policy across framework/host/CDN, preview noindex, redacted logging and absence/expiry tests. Treat CMS URL as trusted server configuration and require HTTPS on the deployment. Scope `frame-ancestors`/iframe permissions to the intended CMS origin; do not disable protection globally. Allow only approved redirects if a separate preview-entry redirect exists. Keep management secrets server-side and preview tokens out of URLs in saved screenshots/logs/evidence. Preview output must never be persisted into public caches.

## Editing markup

The [Hero renderer](block-walkthrough.md) adds `getPreviewUtils(content).pa('fieldName')` to content elements and uses `src(reference)` for media. Check that each field overlay targets the correct property and occurrence. SDK composition wrappers preserve node identity for editor selection; a client wrapper must not discard them. A background image or compound CTA may need a deliberate overlay target. Keep preview context request-scoped; no global variable should hold the last editor's token/content.

## Independent acceptance loop

QA records the following against the actual deployed URL and release receipt, not only localhost:

1. Open the published route and record baseline content/version/order.
2. Developer/editor saves a distinctive draft heading and reorders one approved section. QA verifies CMS preview updates, overlays target the right fields and the public route remains unchanged.
3. Test missing/expired token and unsupported content/version; no draft disclosure or public-cache contamination. Confirm assets and rich-text links also respect preview authorization.
4. Publish the already authorized fixture content. Record publication time, first fresh Graph observation, first fresh ordinary public request, deployment identity and the agreed deadline. Verify the changed heading and composition order without a frontend code edit. Test any shared-content consumers.
5. Report separate pass/fail/blocked results for preview, editor behavior, publication freshness and visual/functional checks. Re-test fixes on the deployment. Restore fixture content only within recorded authorization.

The [rendering reference](rendering.md) defines cache strategies and invalidation. A CMS save, publish, Graph indexing and frontend deployment are distinct events. Publishing permission and deployment permission remain valid within their recorded scope; do not re-request either merely to perform this acceptance loop.

For preview failures, inspect hostname/root and route first, then actual identity/locale/version, token validity, SDK context, Graph response/index and renderer registration. Preserve sanitized failing evidence. Missing tenant or editor access blocks these checks; a preview route that merely returns a local fixture is not a pass.

## Shared rendering and integration qualification
Phase 3 implements CMS-ready models, placement configuration, media dependencies, registered renderers, delivery adapters and preview plumbing as well as visual UI. Local qualification is not proof of tenant/editor acceptance. Use typed, qualified Graph/SDK response shapes or sanitized real responses for contract fixtures; label assumptions. Exercise nested URLs/link labels, media references/binary URL resolution, missing values, display settings and shared content through production adapters. Do not claim exact tenant shape can only be considered after deployment.
Fixture and CMS paths use the same components/styles and normalized rendering model; transport adapters may differ. Place fixtures on an explicit test-only route so a static page cannot shadow the CMS canonical route. Keep production routes derived from the project brief. Propagate authorized draft/version/locale context to shared header/footer and related fetches; prevent shared draft caching. Invalid/expired preview authorization produces a clear diagnostic, never a silent published-only fallback that hides shared drafts. Do not expose tokens in logs/evidence.
After approved schema/assets, Task 4.4 qualifies one representative draft with section selection, media, link and shared chrome using existing appropriate content or a separately approved minimal bootstrap batch. Read back actual responses, reconcile adapters and verify the native CMS iframe edit/refresh path before broad composition in 4.5. This is not implicit permission for extra tenant writes or publication. Register the actual preview host via an approved batch and verify readback; ephemeral hosts require requalification if changed. Empty content and HTTP 200 are not proof. Preserve downloadable local fallback on unavailable Kajoo preview.
Task 4.5 composes remaining approved content only after qualification. Task 5.1 independently compares the actual CMS-driven page to source and verifies picker selection, edits, refresh, references/images and shared regions. Test published delivery separately after its approval. Late code fixes remain possible but must identify the violated contract, update affected evidence and be manually started as implementation tasks; do not disguise planned missing integration as normal styling work.
