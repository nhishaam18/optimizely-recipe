# Source boundaries and verification

This revision refines the user-supplied optimizely-cms library for CMS SaaS with Next.js. The normal execution references are SaaS-first. The original 1.1.0 artifact is the preserved baseline; this 1.3.0 directory is the edited revision. Developer owns modeling within the three-agent runtime.

## Evidence levels

| Level | What it proves |
|---|---|
| Proposed design | A reasoned model for the stated editorial task |
| Source checked | A named official document/source described the mechanic on the recorded date |
| Compiled | The example passed checks against exact pinned dependencies |
| Tenant verified | The actual API/editor accepted it and readback matched |
| Independently accepted | QA observed the intended behavior on the deployed frontend |

This bundle reaches source-checked guidance and static package checks. It contains no claimed SDK compilation, live CMS import, editor enforcement test or deployed acceptance. Do not copy source dates into a project and label the project tenant-verified.

## Known disagreements and gaps

- Content-type concepts use `required`/`localized`; the management tutorial still contains `isRequired`/`isLocalized`. This revision consistently uses the former in REST examples, and records the outstanding target OpenAPI/readback check.
- CMS REST/Graph docs describe omitted indexing as Default (display-only); the SDK main modeling guide calls its default searchable. State intent, inspect pinned serialization and test actual queries.
- Main-branch SDK documentation includes v3 behavior. It is not evidence that a particular published starter/package combination was installed or built.
- Composition flags establish section/element eligibility. They do not prove arbitrary layouts are unavailable to the actual editor. Expanded canvas controls and per-role behavior need qualification.
- Complex nested block types are documented as incompatible with section/element enablement. Validate proposed arrays/references rather than claiming every nesting combination is supported or forbidden.
- Graph indexing permission concerns content items and the indexing principal; type creation access, public query access and draft preview are separate boundaries.
- Numeric limits, UI labels, job intervals, tenant entitlements and default role assignments must come from current target evidence. Old absolute claims were removed from the default execution references.

Every technical example names its API/SDK layer and verification boundary. If current sources disagree, record both, select a bounded candidate and make the smallest test that settles the difference. Do not invent an endpoint or submit multiple spellings hoping one works.

## Optional historical comparison

Read [PaaS comparison index](paas/comparison-index.md) only when the user explicitly needs an edition comparison or source .NET migration context. Those retained snapshots are not required reading or executable instructions for this SaaS recipe. Their mechanics were not re-audited in this revision.

See the [source ledger](sources.md) for actually inspected primary sources and unresolved checks.
