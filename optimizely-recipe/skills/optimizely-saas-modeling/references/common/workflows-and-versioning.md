# SaaS editorial lifecycle and versions

## Model lifecycle as part of content ownership

Identify who edits, reviews and publishes each unit. A page and its referenced shared item may be published at different times; an edited navigation item can affect many already-published routes. Record whether release requires coordinated versions.

Distinguish node identity, locale, version, variation and lifecycle state. Importing a draft does not publish it. Restoring a frontend deployment does not restore CMS content or schema.

## REST v1 mechanics

Source boundary: [Manage content using REST](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-content-using-the-rest-api), checked 2026-09-18, REST v1; no lifecycle call executed.

Current guidance uses dedicated transitions such as `:ready`, `:publish`, `:draft`, `:approve` and `:reject`, rather than patching a status field. Omit status in an initial-version create payload. With configured approval, ready can enter review; publishing is a separate outcome. Transitions support ETag preconditions. Use the selected endpoint's actual request contract and re-read on concurrency conflict.

Scheduling requires an explicit timestamp/offset and observed completion. Record intended timezone and actual CMS/Graph/public observation times. Do not promise exact-second publication or reproduce unverified scheduled-job intervals.

## Project procedure

1. Create or update only the approved draft, retaining the version/concurrency token.
2. Preview that specific draft/locale on the deployed frontend.
3. Have QA record editorial and visual results; ordinary QA approval is not necessarily a CMS workflow approval.
4. Perform only authorized review/publication transitions with the appropriate actor.
5. Read back state and verify Graph visibility plus public freshness.
6. Retain recovery identifiers and the changed-resource manifest.

Do not use force/bypass options to make a demo appear successful when required fields or approvals fail. Record the actual failure and fix the cause within scope.

## Recovery and linked items

For a defective Hero update, identify the prior content version and the renderer version that can display it. For a breaking schema change, a content-version restore alone may not suffice. Prefer additive schema changes and an explicit backout plan.

Check referenced media/shared items before publishing a parent. Confirm a copied blueprint has independent lifecycle as intended. For multilingual releases, list each locale's status and approved fallback; publishing one language does not prove the others are ready.

Output: actor/state transition plan, version ledger, publication scope and recovery steps. QA tests draft isolation, review rejection, expired/missing referenced content where supported, scheduling if scoped, and publication freshness. Report each unexecuted lifecycle operation as unverified.
