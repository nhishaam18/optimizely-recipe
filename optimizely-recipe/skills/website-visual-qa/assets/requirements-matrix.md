# Website reconstruction requirements — [project] [revision]

> Copy this file to project evidence and replace every bracketed field. Orchestrator records approval; QA fills discovery evidence; Developer fills proposed CMS/renderer mappings for review.

## Scope and provenance

| Field | Value |
|---|---|
| Revision/status | [draft/approved/superseded] |
| Source URL and allowed origins/paths | [value] |
| Route/depth/page budget and exclusions | [value] |
| Approved routes/page families | [value] |
| Viewports, DPR, locales, consent/auth states | [value] |
| Approved interactions | [value] |
| Raw evidence manifest path/hash | [value] |
| Public reconstruction boundary | [visible public content/behavior included] |
| Separate source-CMS migration inputs | [none, or named exports/APIs and separate scope] |
| Approver/message reference/timestamp | [value or awaiting approval] |

## Crawl manifest

| URL | Depth | Result/status | Redirect/final URL | Page family | Captured states | Skip/failure reason |
|---|---:|---|---|---|---|---|
| [URL] | [n] | [visited/skipped/failed] | [value] | [family] | [states] | [reason] |

## Capture and supplied-screenshot manifest

| Evidence ID | Kind/source or target | Supplier/capturing agent | Requested/resolved URL and state | Timestamp/timezone | Viewport/DPR/browser/locale/consent | Original PNG path + dimensions + SHA-256 | Config/metadata/annotation paths + hashes | Stability/failures/uncertainty |
|---|---|---|---|---|---|---|---|---|
| [EVD-001] | [helper capture/supplied screenshot; source/target] | [value] | [value or unknown] | [value] | [value or not available] | [value] | [value or not available] | [value] |

## Block and occurrence catalogue

| Requirement ID | blockId | occurrenceId | Route/state | Raw PNG + SHA-256 | Selector and blockId[index] | Rectangle x/y/w/h | Observed fact | Inference/confidence/confirmation | Ownership local/shared/unresolved | CMS type/instance and fields | Renderer/query | Acceptance checkpoint | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [REQ-001] | [hero] | [home--hero--01] | [/; initial] | [path/hash] | [selector; hero[0]] | [0/0/0/0] | [observation] | [proposal/confidence/test] | [local/shared/unresolved] | [proposal] | [proposal] | [measurable result] | [draft/approved] |

## Controlled composition

| Container/blockId | Allowed section types | Min/max | Nesting | Ordering rules | Display settings | Empty/default behavior | Unsupported layout and expected rejection/fallback |
|---|---|---|---|---|---|---|---|
| [main] | [Hero, CardGrid, FAQ] | [value] | [value] | [value] | [value] | [value] | [value] |

## Asset and font inventory

| ID | Kind | Source evidence/URL | Status/rights | File hash/dimensions/format or family/weight/style | Observed crop/rendition/load result | Target handling | Alt/fallback owner | Blocker/deviation |
|---|---|---|---|---|---|---|---|---|
| [AST-001] | [image/font] | [value] | [status] | [value] | [value] | [value] | [value] | [value] |

## Agreed tolerances

| blockId/viewport | Geometry x/y/w/h or gap | Typography/wrapping | Color/effects | Asset/crop | Responsive behavior/boundaries | Exact semantic/state checks | Approved exception |
|---|---|---|---|---|---|---|---|
| [global/desktop] | [numeric tolerance] | [numeric/exact rule] | [rule] | [rule] | [rule] | [exact values] | [none/value] |

## Open questions and decisions

| ID | Question/decision | Owner | Due/checkpoint | Outcome/evidence | Revision impact |
|---|---|---|---|---|---|
| [D-001] | [value] | [role] | [value] | [value] | [none/new revision] |

## Implementation handoff index

For a new handoff, link the [visual/model contract template](implementation-handoff.template.md). Keep evidence tables here authoritative and reference exact revisions/anchors from the handoff rather than copy them. Developer supplies full type/property/renderer contracts; QA supplies observations and acceptance. Existing approved models and requirements remain usable without conversion.

For annotation, use the [component/element inventory](annotation-inventory.template.md). Complete meaningful-element coverage and ownership are required even where screenshot labels are sampled.
