---
name: optimizely-migration-workflow
description: Use when coordinating an Optimizely CMS SaaS source-to-site workflow, assigning phases, handling approvals, resuming work or generating component tasks.
---
# Optimizely workflow

Select the task mode from [operation contract](references/operation-contract.md) before delegation. Reuse the mode and unchanged decisions from the task checkpoint; do not reload all references each turn. The five-phase [flow](references/desktop-demo-flow.md) is authoritative for recipe 1.5.5.

Coordinate Developer, QA and Optimizely Specialist. Delegate compactly: actual task ID, mode, exact component document/revision, permitted outputs, prerequisites, acceptance and scoped authorization. Retrieve real results with the run ID; a delegation receipt is not completion. Avoid duplicate concurrent work and serialize shared registry/layout changes.

Phase 2 creates documents only. First-edit acceleration is for an explicit authorized implementation task using [implementation entry](references/implementation-entry.md); it cannot override the current task's documentation boundary.

Keep annotated and consolidated review decisions user-visible. Dynamic Phase 3 tasks come from approved component/page documents. Reuse stable component+scope task keys on rerun; assembly depends on every required component and shared-layout task, then QA. Match title wording to the approved scope, not a prior website.

Routine SDK/source exploration stays prohibited during implementation; reuse supplied patterns and one preparation checkpoint. Recipe, template, SDK/CLI and validator versions are separate. Missing credentials block tenant operations only. Keep actual tool/API availability and unresolved checks explicit.

See [intake](assets/intake.template.md) and [approval batch](assets/approval-batch.template.md) when producing those artifacts. Other migration references are conditional background, not additional phases or startup reading.

Verify explicit phase/task start authorization before every dispatch, including resumed runs. Annotation and handoff approvals do not start another phase. Apply the phase execution authorization section of the operation contract; finish the authorized scope and stop. Parallel scheduling never crosses that boundary.

## Resolve reference ownership
Resolve a relative link from the directory containing that link, preserving ../ segments. Do not resolve all references under the currently loaded skill. The implementation entry belongs to optimizely-migration-workflow/references/implementation-entry.md; preview-and-fallback belongs to optimizely-composition/references/preview-and-fallback.md. Use the actual installed skill location, not a hardcoded sandbox root.
On a missing reference, perform one focused lookup in its expected owning skill. If unavailable, report whether it blocks the next edit and continue independent work. Do not repeatedly retry the same missing path or reread scratch copies of its failure.

## Manual task selection
Implementation runs only for task IDs explicitly started by the user. Task 2.5 recommends prerequisites and parallel groups only. Completion, eligibility, phase start or result retrieval never automatically starts another implementation task. Return results and updated readiness; wait for the user to start the next task(s). Preserve the primary per-component handoff and all existing validation and approval safeguards.
