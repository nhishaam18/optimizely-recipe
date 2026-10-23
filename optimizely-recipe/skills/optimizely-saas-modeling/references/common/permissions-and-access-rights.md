# SaaS permissions and delivery authority

## Four separate access questions

| Boundary | Question | Example evidence |
|---|---|---|
| Identity/product access | Can this person enter the intended CMS environment? | Actual demo editor account and assigned environment |
| Editorial content/type rights | Can they create, change or publish the intended items? | Allowed and denied operation results |
| Management client authority | Can the integration perform the scoped API action? | Sanitized authorization result on the intended resource |
| Graph delivery access | Can this request retrieve published or restricted/draft content? | Public and authenticated query results |

Grant the authority needed for the approved task. Never infer it from a role label, a successful login or a broad administrator test. A folder's inheritance can expand impact, so inspect the actual item and inherited rules before changing rights.

Source boundary: [SaaS access rights](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/access-rights) and [REST authentication](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/authentication-and-authorization), checked 2026-09-18. REST uses OAuth client credentials/bearer tokens and evaluates the client's content permissions. Exact tenant groups, UI and credentials remain unverified.

## Do not confuse creation, indexing and query access

The [create-type API](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/contenttypes_create), checked 2026-09-18, describes type `accessRights` as controlling creation of instances. It is not a promise that their delivered content is confidential.

The [Graph modeling guide](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-modeling-saas-graph), checked 2026-09-18, describes the indexing principal's `SearchIndexer` role and Read access on content items. Removing that Read permission is an indexing decision; it can also remove data needed for delivery. It is not the same operation as restricting type creation.

The [Graph authentication guide](https://docs.developers.optimizely.com/platform-optimizely/docs/authentication), checked 2026-09-18, distinguishes public and secured access. Verify the selected mode with the intended identity. Avoid inherited claims that all permissions are evaluated only at one universal stage.

## Editorial restriction evidence

A demo editor may edit Hero and reorder approved sections while a different actor manages types. Verify the actual account's available operations. Hiding a property from the editor is not authorization for its API data; restricting a reference picker is not layout locking. Use the [composition restriction matrix](../saas/presentation-and-visual-builder-saas.md).

Assets and referenced blocks need their own visibility checks. A public page with a restricted image or unavailable navigation reference is still broken. Test copied content and shared content where ownership/access differs.

Output: actor-operation-resource matrix, inherited-rule notes and public/preview results. QA tests both permitted and denied cases, including a draft field absent from anonymous output. Do not expose secrets in screenshots or reports.
