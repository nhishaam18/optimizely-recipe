# Component and element annotation contract

Use for the first annotation pass and revisions on any supplied website. Discover its actual structure; examples are illustrative, never a fixed component list, field schema, CTA count or source-specific ID convention. Reuse accepted screenshots and section crops. No extra navigation, SDK lookup or modeling phase is required to annotate visible evidence.

## Required output

1. A readable full-page overview with section/component boundaries and stable occurrence labels.
2. Section images with component boundaries and meaningful internal element labels: headings, supporting copy, images, icons, individual links/buttons and controls, when observed. Use compact labels or callouts. If a label would obscure content, record that element in the inventory with its exact image/region reference and omission reason. Section-only rectangles are insufficient.
3. A complete component/element inventory using [the inventory template](../assets/annotation-inventory.template.md). Maintain one authoritative inventory and generate derivative labels from it. Every meaningful visible element is accounted for, even when not individually boxed.

## Ownership and evidence

- Record stable component definition IDs, unique occurrence IDs, element IDs and owning occurrence/parent. Repeated items share a definition, not an occurrence. Distinguish structural sections, components, fields and presentation/control elements; a box does not imply a CMS type.
- Determine the owner from the actual grouping. A section action belongs to the section; do not copy it into each repeated item. Record full-card clickable regions separately from buttons inside the card; an arrow decoration is not automatically another action. Link destinations and click behavior remain unverified if only appearance is known.
- Preserve exact legible source wording in observedText. Candidate field names and semantic roles are separate columns and cannot replace visible text. If unreadable, mark it unreadable and reference evidence; do not invent copy.
- Inspect title, supporting text, media/icon, actions and controls as a coverage checklist, not mandatory fields. Record meaningful observed roles beyond this list. Missing subtitles or secondary actions are not inferred from common design patterns. Proposed optional fields belong to Phase 2 and are explicitly proposed, not observed.
- A visible element can be confirmed while its behavior or destination is unknown. Keep those uncertainties separate. Do not draw a confident box for an absent/unconfirmed element. Screenshot pixels, crop coordinates and source viewport/DPR need an explicit coordinate relationship.

## Efficient coverage across repetitions

Inspect one representative instance of each component family and each differing variant in detail; compare remaining occurrences for omissions/differences. Reuse shared field definitions, recording occurrence-specific values, evidence and differences. A compact occurrence table is allowed only when each occurrence and its field coverage remains traceable. Sampling labels never permits sampling away inventory coverage. Apply feedback about a general omission across component families, not only the named example. Regenerate only affected images; preserve source and unchanged revisions.

## Acceptance before user review

- Every meaningful component and visible internal element has an inventory record or an explicit inherited field-set mapping with occurrence evidence.
- Every visible action is accounted for under its correct owner; section actions are not multiplied across repeated items. Variants and optional/absent fields are explicit.
- IDs resolve, parent relationships are valid and non-cyclic, and repeated definitions remain distinct from occurrences. Every drawn label resolves to the same authoritative inventory.
- Compare boxes to actual source content and crop geometry, not only page bounds. Check labels remain readable. Inventory-only elements have evidence and a reason for omitting their label.
- Exact observed copy stays distinct from proposed names. Unknowns remain explicit. Checks on hashes, ID counts and bounds alone cannot establish semantic completeness or visual accuracy.
- Review the overview plus representative/variant section images once; revisit only defects. Record coverage results, unresolved gaps and affected approval scope. Request approval only for evidenced scope, without declaring missing coverage complete.

## Carry forward into Phase 2

Every approved element ID maps to a proposed model.property, a presentation/behavior-only decision with rationale, or an unresolved decision with owner and affected operation. Multiple source elements may map to one shared definition when ownership and occurrence values remain clear. Retain field-level traceability in each component handoff without another mandatory startup document. Repeated content uses reusable definitions and collections; globally shared CMS instances require a separate ownership decision. Phase 2 approval requires accounted-for mappings, not finalized schemas inferred from screenshot boxes.

Record observed formatting and editing-relevant structure for each meaningful element. Do not infer rich text from a field name, line count or visual emphasis supplied by CSS. Final type choice belongs to Phase 2. Use readable component names, screenshots and a short revision delta alongside stable IDs; see [review documents](review-documents.md). Apply coverage across the confirmed device scope and component families, not just an example named by the user.
