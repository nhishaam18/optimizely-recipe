# Implementation handoff — [project / revision]

> For new handoffs only. QA fills evidence and acceptance, Developer fills model/SDK/renderer contracts, Orchestrator records approval. Replace bracketed fields with facts or explicit unknown/pending status and its scoped impact. Existing approved artifacts can be linked by exact revision instead of copied or reformatted.

## Index and readiness

| Field | Value |
|---|---|
| revision / status | [draft / approved / superseded; per-scope differences] |
| Scope / routes / states / exclusions | [values] |
| Approval / authorization references | [actual messages, scoped decisions and separately authorized actions] |
| Evidence manifest | [path, revision and SHA-256] |
| Model decisions / shared types | [path, revision/hash, exact anchors] |
| Shared design tokens | [path, revision/hash, exact anchors] |
| Repository / SDK checkpoint | [root, checkpoint path or pending qualification] |
| Supported modeling profile | [actual SDK/CLI versions, matching pattern/profile and provenance; mismatch or limitation explicit] |
| Post-edit validation | [verified generator/validator commands, profile/schema version, output path, coverage and unavailable checks] |
| First implementation slice | [blockId / occurrenceId and source files] |
| Changed scope | [delta, affected consumers, preserved approvals, blocked operation] |

| blockId | occurrenceId | Route/state/locale | Section contract anchor | Model key / instance policy | Renderer | Readiness/blocker |
|---|---|---|---|---|---|---|
| [hero] | [home--hero--01] | [values] | [anchor/path] | [key; independent/shared/unresolved] | [component/path] | [scope-specific] |

## Evidence and visual contract — [blockId]

| Evidence / annotation ID | Original PNG path + SHA-256 | Annotated path | Dimensions / viewport / DPR | Rectangle + coordinate units | Element / occurrenceId |
|---|---|---|---|---|---|
| [EVD-01 / A03] | [path/hash] | [path] | [values or unknown] | [x/y/w/h; PNG or CSS pixels; conversion if known] | [heading / ID] |

| Element/property | Desktop rule | Mobile/intermediate rule | Evidence reference | Observed/inferred/approved | Confidence + verification |
|---|---|---|---|---|---|
| [layout/type/spacing/color/crop] | [value/unit/token] | [value/unit/token; breakpoint status] | [annotation/DOM evidence] | [status and decision] | [confidence/check] |

| Asset/font ID | Source and rights/availability | Target file/reference + hash | Crop/focal point/renditions | Alt/decorative/fallback rule |
|---|---|---|---|---|
| [ID] | [values] | [values or unavailable] | [rules] | [rule/owner] |

Interaction, keyboard/focus, loading/error and empty states: [observable behavior, approved choices and unknowns with affected operation].

## Model inventory and relationships

| Type key | CMS role / base type | Purpose | Instance identity / Ownership | Parent / allowed placement | Shared contracts / supporting types | Model file / export |
|---|---|---|---|---|---|---|
| [Hero] | [page/component/section/owned value/contract; verified mapping] | [purpose] | [independent/shared; stable identity] | [rules] | [keys or none] | [path/export] |

### Properties — [type key, repeat for supporting types/contracts]

| Key / editor label | Semantic type | Required | Localized | Default | Validation / cardinality | Ownership / allowed reference targets | SDK mapping / qualification reference | Delivery field / nullability | Enforcement / status |
|---|---|---|---|---|---|---|---|---|---|
| [heading / Heading] | [short text] | [yes/no] | [yes/no] | [explicit value or none] | [length/rules] | [owned scalar / N/A] | [verified declaration/flags or pending; checkpoint anchor] | [field + nullable policy or pending] | [CMS/client/server/QA, tested/proposed/unsupported] |

Required/localized are semantic decisions here, not SDK or REST flag spellings. Link verified SDK declarations and emitted representation separately. Do not invent payload keys. Reused supporting types need their own table; list inherited fields or link the exact approved contract revision.

For arrays specify the complete `items` definition separately from list cardinality. For every default/conditional constraint name its actual enforcement location; renderer fallback is not an editor default. Mark observed visual elements as owned fields, supporting components, shared references or presentation-only elements; annotation IDs do not automatically require content types. Embed the relevant supported syntax in each component handoff so implementation does not research the SDK.

### Editor, delivery and lifecycle policy

For new model decisions, fill applicable policies or link their exact existing contract anchors. Use explicit not-applicable reasons; these slots do not require conversion of already approved documents.

| Type/property | Editor help / group / order | Indexing / search / delivery policy | Migration/content source mapping | Draft/publication/localization lifecycle |
|---|---|---|---|---|
| [key or shared contract anchor] | [values] | [decision or pending] | [source key/asset identity or no import in scope] | [ownership/versioning/publication rules or pending] |

| View | Exact contract or scoped map |
|---|---|
| Route tree | [paths, page types and application/root relationship] |
| Content tree | [owned versus shared identities and references] |
| Composition tree | [container/section relationships; rules below] |
| React tree | [renderer hierarchy and shared presentation primitives] |

### Composition and presentation

| Parent/container | Allowed types | Min/max | Nesting / ordering | Empty/default behavior | Enforcement evidence / limitation |
|---|---|---|---|---|---|
| [page composition] | [type keys] | [limits] | [rules] | [behavior] | [actual mechanism, pending check or approved alternative] |

| Display setting | Allowed values | Default | Token/class mapping | Enforcement / fallback |
|---|---|---|---|---|
| [theme or none] | [bounded choices] | [value] | [fixed mapping] | [rule] |

## Renderer and implementation mapping

| Model/export | Renderer/file | Property-to-prop mapping | Query/delivery source | Registry / discovery/config location | Local fixture / route |
|---|---|---|---|---|---|
| [key/export] | [name/path] | [all consumed fields] | [path/qualified shape] | [paths or existing checkpoint] | [path/route] |

Content values: [exact approved source or illustrative fixture; explicitly distinguish fixture from tenant API payload].

Implementation order: [reuse checkpoint; first required model/type check; renderer/registration/fixture; focused checks; generated manifest review before authorized tenant synchronization]. Existing unchanged models do not need rewriting for a renderer fix.

## Acceptance and unresolved decisions

| Check ID / requirement revision | occurrenceId / viewport/state | Expected result / numeric tolerance or exact semantic rule | Evidence / test method | Status |
|---|---|---|---|---|
| [QA-01] | [values] | [measurable criterion; pending tolerances are explicit] | [screenshot/DOM/editor/Graph; local vs tenant] | [not run/pass/fail/blocked] |

| Decision | Observed fact vs proposal | Owner | Actual blocked operation | Approval / resolution | Affected consumers |
|---|---|---|---|---|---|
| [ID] | [values] | [role] | [specific edit/check or none] | [message/revision or pending] | [IDs] |

## Optional live-style evidence references

| occurrenceId / partId / partIndex | Style JSON / viewport / state | Raw and crop SHA-256 | Coverage / stability / readiness | Reviewed token mapping / decision |
|---|---|---|---|---|
| [IDs] | [file/sample anchor; absent for screenshot-only input] | [hashes] | [complete/partial/unknown; actual issues] | [exact source value → existing/proposed token; approved scope or pending] |

Link relevant samples only. Keep full measurements in capture artifacts; root CSS does not stand in for child typography. Similar colors/spacing are not automatically merged.

## Component packaging

For multi-component work use [component-handoff.template.md](component-handoff.template.md) for each reusable component. This index is for documentation/review and path resolution, not mandatory implementation startup. Carry approval provenance into the assigned document. Shared references specify exact headings and read conditions. Preserve complete requirements; count total initial packet size, not per-file size. Apply actual exclusions to tasks and resume next actions.

## Annotation coverage disposition

| Approved element IDs / occurrence field set | Model.property or presentation/behavior-only rationale | Owning occurrence and variant differences | Unresolved decision / affected operation |
|---|---|---|---|
| [every approved element accounted for] | [mapping or explicit rationale] | [section versus item ownership; exact observed copy retained] | [none or owner and scope] |

Keep observed wording separate from candidate names. Repeated definitions may be shared; occurrence values and optional/absent elements remain traceable. This table is part of this handoff, not another startup read.
