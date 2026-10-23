# Durable state and handoffs

Orchestrator is the single writer of project `migration-state.json`. Specialists write task-scoped artifacts and return references. Preserve immutable evidence revisions; the compact implementation checkpoint may advance with progress and references those revisions. Use the [state template](../assets/migration-state.template.json) for full migrations and [implementation-only entry](implementation-entry.md) for local execution/resumption. These fields are an application artifact contract, not invented Kajoo API arguments.

An explicit implementation request starts from the named approved artifacts. Read its task-scoped checkpoint first on resume. Another project's state is left untouched; missing or stale historical phase records do not gate local code. Orchestrator can link the resulting checkpoint and evidence later. Record supplied context without marking unexecuted earlier phases done. Keep real task/run dependencies and existing authorization intact.

## Identity and decisions

Keep workspace/project IDs, recipe version, role IDs, phase, task/epic IDs, run IDs, dependencies and statuses. Use tool results; unknown identity is null with a blocker. Distinguish block concept, visual occurrence, source key and CMS identity. Content identity includes environment, key, locale and relevant version/variation. No secrets enter state.

Discovery approval records revision, artifact IDs/hashes, reviewed routes/viewports/states/model, approving message, timestamp and exclusions. A changed artifact is not automatically covered by old approval. Retain unaffected approvals.

Store these as append-only `approvals` records, separate from destination/action `authorizations`. Each record has `decisionId`, `revision`, `decision`, `artifactIdentities`, `scope` (routes, viewports, states, model keys), `exclusions`, `messageReference`, `recordedAt`, `supersedes` (decision ID plus affected scopes) and `revokedScopes`. Populate records from actual decisions; an empty array means no recorded approval. A partial revision appends a new decision and identifies only superseded scope, preserving the earlier decision and its unaffected coverage. Reconcile older singular `approval` state into a scoped record without inventing missing evidence; unresolved coverage remains explicit.

Read seeded task descriptions' `Depends on:` clauses into durable task dependencies using actual task IDs. Phase dependencies alone do not order tasks within a phase. Dispatch only after prerequisite artifacts/results are reviewed; QA may prepare cases early, but cannot report implementation or deployed acceptance before the corresponding evidence exists.

Authorization records contain action, destination/resource scope, environment, user message reference, timestamp, constraints and revocation status. Cover source access, repository creation, scoped schema/content writes, fixture publication and deployment as applicable. Match each operation to an existing non-revoked record; reuse it. Ask only for missing scope. Discovery approval does not authorize unrelated production writes.

## Transitions and resumption

Task statuses follow `draft → todo → in-progress → review → done`; use `blocked` for concrete dependencies. A pending run stays in-progress with `runState: pending` in project state. Do not invent a task status named pending. A failed attempt is a check result, with correction or blocker recorded.

On resume compare persisted state with actual task/run status. Retrieve an existing run result before retrying using the [Kajoo runtime tool contract](runtime-tools.md). If retrieval is unavailable, surface that capability gap; do not duplicate a run because it timed out. Missing evidence returns work to correction/review, not done.

## Specialist return template

```json
{
  "TASK_RESULT": {
    "taskId": null,
    "phase": 3,
    "status": "ready-for-review",
    "revision": null,
    "summary": "Replace with the actual observed result before returning.",
    "artifacts": [],
    "checks": [],
    "defects": [],
    "blockers": [],
    "nextAction": null
  }
}
```

This is a template, not run evidence. Resolve task/revision before dispatch; absent task tools are a capability limitation, not a reason to invent IDs. Report statuses are ready-for-review, blocked and failed, distinct from task API statuses.

| Record | Required content |
|---|---|
| Artifact | Returned path/ID, purpose, revision, hash or immutable identity, producing task |
| Check | Requirement, command/UI procedure, setup/actor, actual outcome, timestamp, evidence; unexecuted checks state why |
| Defect | Requirement revision, block/occurrence, route, viewport/state, expected/actual, reproduction, severity, owner, fix/retest |
| Release | Commit/worktree identity, build, environment/host, deployment ID/URL, CMS change manifest, authorization, known-good release |
| Acceptance | Tested release/revision, QA coverage, open defects, exceptions, user acceptance reference or awaiting acceptance |

Orchestrator checks identity, scope, accessible evidence and outcome before updating tasks. Developer's report is not independent QA. Build success is not deployment; screenshots do not prove editing/publication. A sandbox path is not automatically a user-downloadable artifact link.

## Reproducibility and recovery

Append evidence by run/revision. Preserve source originals, annotated derivatives, observed states, code/version identifiers, model/content change manifests, release receipts and retests. Record tool/browser/package versions and consent/auth/content state adjustments. Do not overwrite another agent's report.

Checkpoint imports and release stages. Retry from the last verified state using the identity map. An uncertain write outcome requires readback before retry. Prior frontend release, prior CMS definitions/content revisions and the configuration change manifest/checkpoint are separate recovery records with separate results; a recovery plan does not grant deletion rights.

## Minimal implementation checkpoint
Record task and authorized scope/start provenance, repository, primary handoff revision, established decisions, changed files, last check result, exact blocker and next concrete edit. Update after meaningful edits/checks or before yielding, not after every read. Preserve source-of-truth references without copying entire documents or tool outputs. On resume inspect affected source once and act; summaries do not invalidate unchanged successful reads or expand authorization.

## Manual task selection
Implementation runs only for task IDs explicitly started by the user. Task 2.5 recommends prerequisites and parallel groups only. Completion, eligibility, phase start or result retrieval never automatically starts another implementation task. Return results and updated readiness; wait for the user to start the next task(s). Preserve the primary per-component handoff and all existing validation and approval safeguards.
