# Scoped SaaS management operations

## Establish the write set

Optimizely Specialist records environment/application, approved type keys, content/asset scope, locale, allowed lifecycle actions and the model revision. Read current state and show the actual diff before writes. Require a concrete user-approved batch for this action/destination/revision; carry it forward only while unchanged. Intake scope is not approval of unseen external changes. A new tenant, material diff or broader release needs a new decision. Orchestrator tracks this scope.

Choose a single definition authority: the selected SDK's scoped configuration sync or validated REST operations. A template's sample content/reset command is not a migration strategy for an existing tenant.

## Authentication and schema mechanics

Source boundary: [REST authentication](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/authentication-and-authorization) and [manage types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-content-types-using-the-rest-api), checked 2026-09-18, REST v1. OAuth client credentials are exchanged at `https://api.cms.optimizely.com/oauth/token`; send a bearer token and refresh according to its response. Keep client secrets and tokens out of code, browser bundles and evidence.

Read `/v1/contenttypes` and the affected keys before creating definitions. Create absent types via POST; use `application/merge-patch+json` for supported PATCH updates. Key/base type are not editable through that update. Preserve omitted unrelated fields and understand merge-patch deletion semantics before generating a diff. Do not use a broad manifest import to erase unknown resources.

Use the [canonical one-field REST example](saas/defining-content-types-saas.md) rather than maintaining a second conflicting copy. Its inherited `required`/`localized` flags are unverified: the current CLI vendored API schema uses `isRequired`/`isLocalized`. Resolve the target REST contract before submitting direct API payloads; use the qualified [code-first path](saas/code-first-modeling.md) by default. See the [source conflict ledger](sdk-source-ledger.md).

## Content and publication are separate

A type's property schema is not a content instance. The Hero walkthrough supplies a version/value-wrapper example in the [migration contract](migration-contract.md). Replace every illustrative identity with read-back target values and verify the selected locale/container.

Read back each changed resource. Treat timeout/transport failure as an unknown outcome and reconcile identity before retrying. A successful management response proves neither Graph indexing nor a deployed edit. Use [repeatable import](schema-evolution-and-import.md) for checkpoints and [lifecycle](common/workflows-and-versioning.md) for transition mechanics.

## Expected evidence

Record proposed/applied definitions, old/new version IDs or ETags, operation results, source-to-target mappings and unresolved conflicts. Produce create/update/skip/error counts for the exact write set. Keep authorized publish actions separate from draft imports.

QA independently verifies field behavior, ownership, links, section reorder, draft isolation and public freshness. A broad Graph reset, force publish or deletion is not a routine workaround for a failed check.
