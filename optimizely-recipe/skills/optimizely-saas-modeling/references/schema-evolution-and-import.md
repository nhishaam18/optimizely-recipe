# Schema evolution and repeatable imports

This is a migration algorithm, not a claim of transactional or exactly-once behavior from CMS. It combines project-owned checkpoints with verified API mechanics.

## Evolve compatibly

Prefer add → backfill → read both if necessary → switch consumers → retire later. A required field added to populated types can block older content. A contract change affects all implementing types. A rename is a data migration until proven otherwise; preserve durable type keys.

Before changing a field, count affected instances/locales, inspect a representative value, identify queries/renderers and record recovery options. Verify new definitions in isolation, then a bounded fixture, then the approved batch. Removing a populated field or changing a base type needs explicit data-loss/recovery planning.

Source boundary: [manage types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-content-types-using-the-rest-api) and [import/export](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/import-and-export-data), checked 2026-09-18, CMS REST v1. Manifests transfer definitions; Episerver Data packages have a different scope, and packaging endpoints are marked experimental. Do not suppress data-loss warnings to make a sync pass.

## Persist identity before depending on it

Use stable source identifiers from exports when available. For URL/screenshot reconstruction, assign project-owned source keys including site and semantic occurrence, since URLs can move. Keep content identity separate from locale/version and asset identity separate from file names.

Each ledger row contains:

| Identity/scope | State/evidence |
|---|---|
| Run ID, model revision, source key, site, occurrence ID | Source content hash and observed source revision |
| Target environment, content key, type, container/owner | Target locale/version/ETag and last readback hash |
| Related source keys and asset hashes | Pending/completed relationships and unresolved targets |
| Desired operation and authorized lifecycle | Planned/sent/confirmed/failed/conflicted status and attempts |

This ledger is private project state, not an invented CMS idempotency header. Do not match content solely by display name.

## Bounded two-pass import

1. Inventory approved resources, capture before-state and compare desired hashes.
2. Reconcile schemas/contracts/groups/display templates in the chosen authority.
3. Import/deduplicate permitted assets and establish target identities.
4. Create missing item identities/drafts, or read mapped items before updating. Write the mapping after a confirmed response/readback.
5. Resolve relationships and internal links from mappings; preserve ordered section and list positions.
6. Read back values and ownership; verify no duplicate source identities.
7. Preview representative content, then perform separately authorized publication.
8. Measure Graph/public freshness and checkpoint results.

If the endpoint supports a caller-assigned valid content key, persist the planned key before the create call and reconcile that identity after an uncertain outcome. Otherwise establish a supported lookup strategy before retrying creates. Do not assume an absent ledger entry proves the previous request failed.

## Retry and conflict behavior

| Observed result | Action |
|---|---|
| Already mapped, equal desired/target state | Skip and record readback |
| Source changed, target unchanged since prior run | Apply approved update with available concurrency precondition |
| Target changed by an editor | Re-read and surface a conflict; do not overwrite automatically |
| Timeout after create | Reconcile planned/mapped identity before another create |
| Throttle/temporary service failure | Bounded retry using response guidance; retain checkpoint |
| Invalid type/reference/locale | Stop that item, retain diagnostic and continue independent items |
| Unresolved dependency | Keep draft/pending; do not replace with a fake target |

Source boundary: [content REST guide](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-content-using-the-rest-api), checked 2026-09-18, documents version operations and ETag transition preconditions. Check the exact endpoint's concurrency support; do not invent universal headers or lock semantics.

## Recovery and acceptance

Keep before-definitions, changed resource IDs, prior content versions and deployment IDs. Roll back frontend and CMS changes deliberately; they are separate systems. Avoid deleting an entire imported subtree if some items predated the run or editors have changed them.

The meaningful repeatability test is an interrupted fixture import resumed twice: same source keys map to the same target identities, unchanged records skip, pending references resolve, section order remains stable, and an intervening editor change becomes a visible conflict. Report counts and mismatches. No such import has run as part of this documentation bundle.
