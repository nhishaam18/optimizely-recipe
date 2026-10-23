# Modeling decision procedure

Use [architecture](architecture.md) for the mental model and [migration contract](migration-contract.md) for the deliverable. This is project design guidance, not a vendor API contract.

1. Group observed routes into families by semantics and authoring needs. Two routes can share a schema; identical screenshots can need different ownership.
2. Catalogue stable block types separately from occurrences. Record source URL, viewport, UI state and uncertainty.
3. Choose ownership before storage. Write “Editing this item changes…” and name the expected consumers. QA tests that sentence.
4. Choose the smallest useful editorial unit. Heading, image and CTA usually belong to Hero; React Button is implementation reuse. Independently routed articles need their own identity.
5. Define fields, locale behavior, references, lifecycle and indexing intent. CMS tree children, property relationships and composition eligibility are different constraints.
6. Select approved Visual Builder sections and bounded styles. Qualify nesting and restriction enforcement before promising them. An unsupported restriction remains a capability gap, not permission to substitute a different authoring model.
7. Review representative operations: edit shared navigation; independently edit Heroes; reorder sections; test long/empty/missing-reference cases; preview and publish an authorized fixture.

For a three-card section, establish whether “three” is a business constraint or the current example. If exact, encode count where supported and validate editorially. Local values suit cards with no independent identity, but their schema must pass composition eligibility. If it fails, evaluate constrained references or a verified composition pattern while retaining the approved editor task. Arbitrary JSON hides fields and is not the default escape hatch.

Record unresolved mechanics with the smallest settling test. “Create this proposed FAQ section, verify its reference array and reorder two entries as the demo editor” is more actionable than “need tenant.”
