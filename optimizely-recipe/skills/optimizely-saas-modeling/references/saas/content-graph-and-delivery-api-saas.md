# Graph delivery and CMS REST boundaries

## Distinct responsibilities

Use CMS REST v1 for management and resource readback. Use Graph for the selected frontend delivery path. Use the official SDK to generate/select and render data according to its pinned conventions. Do not call the management API a public unauthenticated delivery endpoint or paste Graph results into REST writes.

Source boundary: [Graph modeling](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-modeling-saas-graph) and [property schemas](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/property-schemas-saas), checked 2026-09-18, SaaS/Graph documentation only. Actual query/schema compatibility remains untested.

An inline component and an independently identified component can have different Graph types and metadata. Query the shape you actually receive. Link/ContentReference URL metadata is structured; a reference restriction is not proof that target fields are expanded.

## Query design

Start from a representative route and fields its renderers require. Include sufficient content identity, locale/version context and composition to diagnose errors. Constrain referenced types and depth. Inspect the generated query and schema rather than importing fragment files from an unrelated SDK family.

For manual GraphQL, obtain the concrete root/type/field spelling from schema inspection. Test one query in isolation before combining queries. Apply application/root and locale constraints so matching slugs on two sites cannot cross-resolve. A route lookup should produce zero/one intentional result or report ambiguity.

For lists, select deterministic ordering with a tie-breaker and use the pagination mode supported by that query. Test the next page and termination; do not assume the first response contains all records. For search/facets, ensure chosen fields have the intended indexing and measure the actual query cost/latency. No universal page size, cost field or traversal-depth promise is made here.

## Authentication and delivery visibility

Source boundary: [Graph authentication](https://docs.developers.optimizely.com/platform-optimizely/docs/authentication), checked 2026-09-18. It distinguishes public single-key access from secured identity/scoped access and administrative Basic/HMAC capabilities. The endpoint, keys and preview method must come from the selected tenant/SDK configuration; a URL containing “latest” is not authentication.

Keep privileged credentials server-side. Test anonymous published content separately from authenticated draft preview. Select the requested identity/locale/version in preview and isolate it from shared public caches. Never infer public confidentiality from hiding a field in the editor.

CMS indexing eligibility and query authorization are different checks. The Graph modeling source places `SearchIndexer` Read access on content items. A type's creation rights do not establish public delivery restrictions. See [permissions](../common/permissions-and-access-rights.md).

## Diagnose freshness by layer

1. Read back the intended CMS version and relevant schema fields.
2. Query Graph for the expected content/locale/version using the appropriate access mode.
3. If absent, examine publication, indexing eligibility and actual synchronization status.
4. If present but the website is stale, inspect route resolution and frontend/CDN cache behavior.
5. If data is correct but output differs, inspect renderer registration and display settings.

Bound retries and capture attempt/time/version evidence. Do not claim an index reset or full synchronization is required merely because preview returns 404. Broad reindex/reset operations need an established cause and authorized scope.

Output: schema/query snapshot or generated-query evidence, sanitized representative response, endpoint/access mode names, content identity and measured freshness. QA proves no draft leakage, correct section order, navigation links, pagination and published update on the deployed route.
