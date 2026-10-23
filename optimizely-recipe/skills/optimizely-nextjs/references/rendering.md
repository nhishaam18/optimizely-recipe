# Delivery, routing, presentation and freshness

Checked: 2026-09-18. Target: project-pinned Next.js and selected SDK. Source inspection is not a runtime test. Use [official-sdk.md](official-sdk.md) for official registry/client mechanics; keep an existing Remko or custom GraphQL path coherent.

## Route and SEO contract

Resolve application/root, hostname, locale and normalized path before fetching. Document canonical slash/case/query policy, root and nested route handling, missing-translation fallback and source-to-target redirects. The official client's host-scoped path lookup can return several matches: reject ambiguity instead of choosing the first. Do not let a request-controlled host select an arbitrary tenant. Preserve actual content identity in diagnostics without preview tokens.

Derive metadata from the same content and locale used for the page: title/description, canonical URL, approved social image and indexing policy. Use the repository's Next.js metadata API and modeling's [shared SEO contract](../../optimizely-saas-modeling/references/saas/contracts-and-shared-fields.md). Canonical hosts come from approved public configuration, never an untrusted header or the CMS preview URL. Emit hreflang only for real published translations; define noindex for demo/preview environments according to scope. Test missing pages, collisions, canonical redirects and publication/removal of routes. [CMS applications](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/applications).

## Data and render boundary

Use registered official model definitions/`ContentProps` or actual schema-generated query types for the selected client. Inspect response metadata instead of inventing Graph shapes from CMS display names. Separate transport errors from GraphQL errors, missing content and unsupported type mappings. Restrict recursive expansion and paginate inventories. Shared references and inline content need explicit resolution; a picker restriction does not guarantee full expansion.

Render on the server by default. Isolate mobile menu, accordion or other interaction state into small client components with serializable props. Do not add client rendering simply to use a server-only SDK import. Preserve composition order and node identity; test empty/nested structures and preview overlays after reordering. Forms, search, authentication and analytics require observed requirements and integration scope; a visible control does not establish its backend.

| Content | Implementation | Check |
|---|---|---|
| Media | Resolve CMS references with the selected SDK; official `getPreviewUtils(content).src(reference)` is preview-aware. Use its DAM helper only for compatible assets. Add responsive variants, sizes, intrinsic dimensions/aspect ratio, crop and remote-host configuration to the qualified image component. | Broken/missing asset, protected draft asset, focal point, alt/decorative intent, layout shift and mobile download size |
| Links | Maintain source-to-target URL map; use content identity/locale for internal destinations when available. The official SDK distinguishes `url` from metadata-bearing `link`; inspect the actual representation before rendering. Normalize/validate protocols and treat target/rel deliberately. | Cross-page and locale navigation, external CTA, fragments, redirects, missing destination, keyboard focus |
| Rich text | Use the selected SDK's safe structured renderer. Official `RichText` requires queried JSON; raw HTML requires a separately agreed sanitization policy. Support approved nodes/links/media and report unknown nodes. | Lists, emphasis, link rewriting, empty field, long content and embedded media; no unsanitized pasted HTML |

The official [preview helpers](https://github.com/episerver/content-js-sdk/blob/main/docs/7-live-preview.md) and [rich-text/modeling guide](https://github.com/episerver/content-js-sdk/blob/main/docs/3-modelling.md) are source-checked references. They do not replace tests against actual delivered assets/content.

## Choose and prove a cache policy

Record each layer: Graph visibility, SDK query cache, Next.js data/render cache, shared host cache, CDN and browser. Include application/site, locale and applicable variation in identities. Preview has no shared draft caching. Personalized content needs a separate audience boundary or uncached response; keep the ordinary anonymous case deterministic.

Select one public delivery policy and give it a measurable freshness target:

1. **Uncached server rendering for a small qualification demo:** explicitly disable applicable SDK/data/full-route/shared caching using the installed version's APIs. In SDK 3 documentation `query.cache` is available, but it alone does not control all other layers. Measure Graph indexing delay and normal public requests. Revisit performance before expanding scope.
2. **Time-based revalidation:** select a TTL within the agreed tolerance, account for stale-while-revalidate and revalidation-on-next-request, and test two successive normal requests. Do not claim that a 60-second TTL guarantees visibility exactly 60 seconds after publication.
3. **Event-driven invalidation:** choose CMS lifecycle or Graph-indexed events deliberately. A CMS publish event may precede Graph visibility; invalidate after delivery reflects the new version or use bounded readiness checks. Authenticate the webhook using the provider's supported verification scheme, reject malformed/out-of-scope events, deduplicate retries, map changed content to affected route/shared-content tags and invalidate the cache actually used by those routes. Record handler logs without secrets. An open arbitrary-path purge endpoint is not acceptable.

For qualified current Next.js versions, a Route Handler can invalidate **previously assigned** cache tags using `revalidateTag(tag, 'max')` for stale-while-revalidate or the documented expiry profile when immediate expiry is required. Tags must be attached to the actual fetch/cache wrapper; an SDK call is not automatically tagged. Older Next.js versions and Cache Components modes have different requirements, so check installed APIs. [Next.js revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).

A replicated host needs coherent cache invalidation across instances. A separate CDN may retain stale output after Next.js invalidation; purge it using the chosen provider's supported mechanism or align its TTL. Optimizely hosting has a documented Next.js/Redis/Graph-webhook path; it is host-specific. [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting), [Optimizely Next.js ISR guide](https://docs.developers.optimizely.com/digital-experience-platform/docs/nextjs-isr-caching-and-optimizely-graph-webhooks).

## Required evidence and failure diagnosis

Capture content key/version, locale, publication timestamp, first fresh Graph result and first fresh public result on the ordinary deployed route. Test a shared-content consumer as well as the edited page. A cache-bypass query, manual purge or application redeploy is diagnostic evidence only unless that is the approved publication workflow. On staleness, identify the retaining layer before changing it; do not reset Graph or import sample content as a generic fix. See [preview and publication checks](preview.md).
