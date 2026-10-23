# Independent QA report — [project] [run ID]

> QA fills this report from executed evidence. Keep the original failure and every retest. Orchestrator records accepted exceptions and user acceptance.

## Verdict and evidence level

| Field | Value |
|---|---|
| Requirements revision/hash | [value] |
| Commit/deployment ID/environment/URL | [value] |
| Execution window/timezone | [value] |
| Evidence level | [static review/local fixture/real build/real tenant/deployed public] |
| Passed/failed/blocked/excluded/accepted exception | [counts] |
| QA verdict | [ready/not ready/blocked] |
| User acceptance | [pending/accepted/rejected plus reference] |

## Deployment match

| Check | Expected | Actual/evidence | Result |
|---|---|---|---|
| Repository commit -> deployment record | [value] | [value] | [pass/fail/blocked] |
| Deployment ID/environment -> URL | [value] | [value] | [pass/fail/blocked] |
| Preview/public host and application root | [value] | [value] | [pass/fail/blocked] |

## Results

| Case ID | Requirement | Route/state/viewport | blockId | occurrenceId | Expected/tolerance | Actual/measured delta | Evidence paths/hashes | Result |
|---|---|---|---|---|---|---|---|---|
| [QA-001] | [REQ-001] | [value] | [hero] | [home--hero--01] | [value] | [value] | [value] | [pass/fail/blocked/excluded] |

## Authoring and freshness timeline

| Event | Timestamp/timezone | Actor/content version | Expected | Actual/evidence | Result |
|---|---|---|---|---|---|
| Local draft preview | [value] | [value] | [value] | [value] | [value] |
| Shared draft preview | [value] | [value] | [value] | [value] | [value] |
| Compose/reorder/unsupported layout | [value] | [value] | [value] | [value] | [value] |
| Publish | [value] | [value] | [value] | [value] | [value] |
| Delivery/index first seen | [value] | [value] | [SLO] | [value] | [value] |
| Public cache first seen | [value] | [value] | [SLO] | [headers/value] | [value] |

## Defects and retests

| Defect ID/severity | Requirement/revision | Environment/deployment | Route/state/viewport | blockId | occurrenceId | Expected | Actual/delta | Reproduction | Evidence | Owner/status | Retest IDs/results |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [DEF-001/P1-P4] | [value] | [value] | [value] | [value] | [value] | [value] | [value] | [steps] | [paths/hashes] | [Developer/open] | [value] |

## Coverage and exclusions

| Matrix area | Passed | Failed | Blocked | Excluded/accepted exception with approval reference |
|---|---:|---:|---:|---|
| Visual/responsive | [n] | [n] | [n] | [value] |
| Authoring/CMS | [n] | [n] | [n] | [value] |
| Accessibility | [n] | [n] | [n] | [value] |
| Functional | [n] | [n] | [n] | [value] |
| SEO | [n] | [n] | [n] | [value] |
| Preview/publication/cache | [n] | [n] | [n] | [value] |
| Deployment | [n] | [n] | [n] | [value] |

## Blockers and next action

| Blocker | Impacted cases/claims | Owner | Required evidence/action |
|---|---|---|---|
| [value] | [value] | [role] | [value] |

Next action: [Developer fix and QA retest / Orchestrator decision / user acceptance]
