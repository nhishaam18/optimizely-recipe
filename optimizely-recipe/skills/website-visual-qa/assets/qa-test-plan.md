# Independent QA test plan — [project] [requirements revision]

> QA copies and fills this file before acceptance. Orchestrator confirms scope and Developer supplies deployment/fixture prerequisites. Do not mark missing prerequisites as pass.

## Environment and deployment identity

| Field | Value |
|---|---|
| Requirements revision/hash | [value] |
| Repository/commit SHA | [value] |
| Build result/evidence | [value] |
| Deployment provider/ID/environment | [value] |
| Canonical and immutable deployment URLs | [value] |
| Deployment timestamp/config version | [value] |
| CMS schema/content version and locale | [value] |
| Preview host/application root | [value] |
| Public host/application root | [value] |
| Source and target evidence roots | [value] |

## Preconditions and fixtures

| Fixture/account | Purpose | Content IDs/versions | Initial state | Permissions | Cleanup/restoration | Owner/status |
|---|---|---|---|---|---|---|
| [value] | [value] | [value] | [value] | [value] | [value] | [value] |

## Test cases

| Case ID | Matrix area | Requirement | blockId | occurrenceId | Route/site/locale | Actor/state/viewport | Preconditions | Action | Expected measurable checkpoint/tolerance | Evidence to capture | Cleanup | Result |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [QA-001] | [visual/authoring/etc.] | [REQ-001] | [hero] | [home--hero--01] | [value] | [value] | [value] | [steps] | [exact/numeric result] | [raw/meta/DOM/log] | [value] | [not run] |

Required authoring cases: local edit isolation; shared edit propagation; allowed insert/reorder; unsupported layout; draft preview isolation; authorized publication; delivery/index and public cache freshness; restoration. Required deployed cases match the commit/deployment ID/URL tuple. Include responsive boundaries, accessibility, functional behavior, SEO, and all applicable CMS matrix rows.

## Freshness schedule

| Checkpoint | Poll interval | Maximum duration/SLO | Evidence | Stop condition |
|---|---:|---:|---|---|
| CMS publish -> delivery/index | [value] | [agreed value] | [response/version/timestamps] | [value visible or timeout] |
| Delivery/index -> public route | [value] | [agreed value] | [response/cache headers/timestamps] | [value visible or timeout] |

## Coverage and approval

| Area | Planned cases | Not applicable reason | Blocker |
|---|---|---|---|
| Visual/responsive | [IDs] | [reason] | [value] |
| Authoring/CMS | [IDs] | [reason] | [value] |
| Accessibility | [IDs] | [reason] | [value] |
| Functional | [IDs] | [reason] | [value] |
| SEO | [IDs] | [reason] | [value] |
| Preview/publication/cache | [IDs] | [reason] | [value] |
| Deployment identity | [IDs] | [reason] | [value] |

Plan reviewed by Orchestrator: [message/decision reference and timestamp]
