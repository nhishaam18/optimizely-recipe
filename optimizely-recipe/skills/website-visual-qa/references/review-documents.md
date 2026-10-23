# Documents for review and implementation

Produce Markdown rendered in Kajoo artifacts with usable screenshot/image references. User-facing review comes first; technical detail stays in a clearly labeled later section of the same component file. Use short paragraphs, field/reuse tables, a page outline and explicit questions. No large JSON/schema dump as the only report.

Required set under evidence:
- Review index: brief scope, annotated overview, inventory, page architecture, component links, decisions, revision changes and approval state. This is a user navigation aid, not mandatory developer startup reading.
- Component inventory: stable IDs, recognizable names, thumbnail/section reference, purpose, occurrences, variant and reuse policy. Separate reuse of a definition from globally shared content. Explain nested elements that become fields.
- One component handoff per reusable definition: readable summary/field table and technical implementation contract. Group repeated occurrences; keep all element-to-field mappings. Technical details must not contradict the readable table.
- Page architecture: ordered regions, fixed/editable/reorderable controls, shared header/footer default/variants, routes/locales, proposed blueprint and preview/delivery layout mapping.
- Review/change/approval records: what changed since the previous revision, open questions, affected components/pages, actual decision actor/scope/revision. No fabricated approval.

Use [component template](../assets/component-handoff.template.md), [page template](../assets/page-architecture.template.md), [inventory template](../assets/annotation-inventory.template.md) and [completed example](../assets/review-example.md). The example illustrates structure, never a component list or website assumption to copy.

Keep the assigned component document the sole mandatory handoff read. Its summary and implementation-start section together should be about 1000-1500 tokens where feasible; use exact headings for conditional property/variant detail. The file may be longer when necessary for complete coverage. Token limits never justify omitted fields; save bounded sections incrementally and use a short checkpoint rather than re-reading whole reports after truncation. Do not split user and technical truth into contradictory copies.

A reviewer should answer: what was found, where it appears, what editors can change, which content is shared, what fields/types are proposed and why, and what decision is needed. Agent technical acceptance does not substitute for user design/annotation approval.
