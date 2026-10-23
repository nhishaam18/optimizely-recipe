# Operation and approval contract - recipe 1.5.5

This contract governs this recipe over older general migration references. It is instruction-level policy, not a platform access-control mechanism. The Orchestrator includes the selected mode and boundaries in each delegation; all agents enforce them before tool use.

| Mode | Allowed deliverable | Gate / boundary |
|---|---|---|
| intake | Brief, connection references, scope and task map in evidence; read-only inspection | Never put secrets in chat, artifacts or reports |
| setup | Materialize supplied bundle, install locked dependencies, baseline checks | No feature implementation or CMS actions; existing repository mode preserves its manager/files |
| discovery | Source capture, annotation, measured styles and readable inventories | Use recorded device scope; user approves annotated revision |
| documentation | Markdown model definitions, component/page handoffs, technical snippets, existing repo/tenant read-only inspection | Phase 2 writes only evidence. No source edits, registry changes, generator/build/typecheck, install, CMS writes or deployment to qualify an example. Carry setup checks forward; mark unverified examples honestly |
| implementation | Local source changes and checks for the assigned approved scope | Approved handoff plus user start instruction. Annotation approval, agent review, task creation or the words 'content model' do not authorize implementation |
| tenant-plan | Read current tenant/config and prepare a scoped diff | No mutation until authenticated user approves the exact batch |
| tenant-apply | Execute the approved model/asset/content/application batch; read back | Exact destination, operation, IDs and artifact/diff revision must match approval |
| verify | Read-only tests/screenshots; local QA evidence | CMS editing tests mutate data: use a user-approved test draft/batch. QA routes source fixes to Developer |
| release | Host deployment/publication and readback | Separate user-approved release batch; preview deployment is still deployment |

A continuation keeps the existing task mode; it never promotes documentation to implementation. For contradictory delegation, complete permitted evidence work and return the mismatch to Orchestrator. Do not follow a first-edit instruction in documentation mode. If premature code exists, list affected files and preserve it; do not delete or call it approved.

Agents can accept routine local corrections, successful checks and technical reviews within approved scope. User approval is required for annotation/design acceptance, external asset uploads, model/content/application writes, frontend deployments, publishing, destructive changes, changes affecting existing pages and scope expansion. A general intake goal is not approval of an unseen batch. Describe the concrete batch before requesting approval. Reuse approval only when scope/destination/revision/effects remain unchanged; require a new decision for material changes. User acceptance is separate from QA acceptance. Never self-approve or impersonate the user in resume tools.

Record approval actor, actual message/action reference, time, workspace/project, tenant/environment, operation, resource IDs, change digest, scope/exclusions and outcome in evidence. Store no credentials. A summary, completion receipt, filename or silence is not consent. Separate asset upload, schema synchronization, draft writes, application settings, publish and frontend deploy; approve each meaningful batch, not each file.

Device scope is desktop, mobile or both as confirmed at intake. Record actual viewport/DPR/state; no source URL, pixel size or component list is hardcoded. Do not expand to tablet or other routes without scope.

Preserve task descriptions, order and user changes; append results separately. Resolve actual agent/task/phase IDs. Current recipe schema has native phase dependencies but no task-level dependsOn/owner fields: persist a task map and enforce prerequisites before dispatch. Empty Phase 3 is not completed implementation. Phase 4 requires generated component tasks AND assembly/QA acceptance, not an empty epic status.

Maintain a compact checkpoint: mode, active task, approved revision, changed paths, completed checks/results, verified tool paths, operation IDs, blocker and next action. Reuse results rather than reconstructing chat history. Plain ASCII hyphens separate phase/task/chat titles; legitimate non-English text remains unchanged.


## Phase execution authorization

Execute only the phase or specific tasks explicitly started by the user. Record authorized phase IDs, any narrower task IDs, the actual user start message/action reference and authorization status in the task map/checkpoint. An overall migration objective, an unlocked phase, task status, completed prerequisite, technical acceptance, or artifact approval does not authorize another phase.

Artifact approval and phase-start authorization are separate decisions. Use an annotation option such as "Approve annotations and finish the review task". Never attach "proceed to the next phase" to that option. Likewise consolidated handoff approval is not permission to implement. If the user explicitly requests both decisions, record their separate scopes against the actual user request; agent-written option descriptions alone cannot expand a phase-only start instruction.

At the authorized phase boundary, report completed work, unresolved blockers, accepted revisions and the proposed next phase, then stop and wait for an explicit next-phase start. A blocked task does not authorize skipping into another phase. Independent eligible work may continue only within the authorized scope; do not mark a partially blocked phase complete.

Before every delegation or resumed action, compare the requested task's phase with the recorded authorization. Pass phase/task scope and start-decision provenance to descendants. Delegates must reject out-of-scope assignments and return results to Orchestrator; they must not start later phases themselves. Tool-result wakeups, retries, summaries and checkpoint resumes never broaden authorization. If provenance is missing or conflicting, pause the affected dispatch and ask for the missing start decision. Do not reconstruct permission from filenames or completion messages.

Task 2.5 is a planning exception only: within authorized Phase 2 it may populate Phase 3 tasks from the approved handoff and return parallel batches, dependencies and shared-file ownership. It must then stop. Creating Phase 3 tasks does not start them. Phase 3 requires the approved handoff and manual user starts for the selected implementation tasks.

Implementation scheduling is manual: recommend eligible tasks, but never automatically start dependent tasks or the next group. Preserve shared-file serialization and external approval gates.

Authorization is necessary but does not satisfy prerequisites. A next-phase start does not mark blocked setup complete or bypass a native phase lock. Report unmet prerequisites and keep affected work blocked; any supported scoped exception requires a separate explicit user decision recorded with the affected checks still pending.

## Applying an existing start decision
Pass the actual user start decision, authorized phase/task IDs, repository path from setup, primary handoff path/revision, first source action/check, shared-file ownership and return boundary in each implementation assignment. For implementation, an explicit user start of the selected task IDs satisfies the start requirement for those tasks only; do not seek the same approval again. A broad phase start does not select implementation tasks. Do not infer a start from document approval or task creation.
A single-task run returns for review after that task. Implementation does not automatically progress to eligible dependent tasks; return their readiness for the user to start manually. Delegates return their assigned results, not new phases. External batches retain separate approval gates. Editing a description alone does not start a stopped run.
Generate conditional authorization wording, not permanent 'planning only' labels on implementation tasks. Keep one primary handoff for foundation work as well as one per component. Resolve actual project paths from setup/handoffs; never copy another workspace's IDs, URL, component list or ownership assumptions.

## Manual implementation starts
Task 2.5 produces recommendations only. Create/reuse implementation tasks and return a readable prerequisite and parallelism table, then stop. Do not launch agents or implementation tasks from Task 2.5.
The user manually starts each implementation task or explicitly selects a named set of task IDs to run together. A general Phase 3 start, approved plan, eligible task, completed prerequisite, callback or resumed checkpoint does not authorize automatic scheduling. If the selected tasks are unclear, return the eligible task list and wait for selection. Once a task is explicitly started, perform its routine local work without repeated permission requests and return at its review boundary. Do not start siblings, dependents, assembly or another group on completion. Keep already manually started independent tasks within their own scope.
Before executing a selected task, verify its prerequisites and shared-file ownership. If prerequisites are incomplete or another active task owns a conflicting shared file, report the exact blocker; do not claim the task is safe merely because it appears in a recommended group. Delegation within a selected task must preserve that task's scope. Approval gates for tenant changes, upload, publishing and deployment remain unchanged.
The plan must list actual task IDs/names, owner, prerequisite task IDs and acceptance evidence, owned files, shared-file conflicts, suggested parallel group, current readiness (ready/blocked/unknown), and what the user can start next. Use actual approved component contracts and project paths. Future groups are conditional recommendations, not a launch queue. Put unresolved shared-file changes in an explicit prerequisite or integration task. Assemble only after all required components and foundation work pass, and only when the user starts assembly. Report refreshed readiness after results without dispatching more work.
