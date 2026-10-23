# Authoring, source control and validation

## Start from observed failures

Read the current bundle and run representative application tasks before editing. For an existing skill, retain the old version as a baseline. Save actual agent outputs, missing guidance, invented assumptions and disagreements. Static defects (broken links, obsolete roles, inconsistent API fields) and behavioral failures are different evidence; report both.

Write decision guidance that addresses those gaps. Each substantive topic explains: meaning, when to choose it, supported mechanics, a concrete example, failure modes, output contract and acceptance evidence. Avoid filling skills with process prohibitions while leaving model/SDK decisions vague.

## Technical evidence

Record source URL/title, retrieval date, edition/API/SDK scope, selected release or commit, claim checked, conflict and verification level. Prefer vendor docs, API schemas and the selected SDK's source over tutorials. Vendor examples can conflict; a versioned target OpenAPI plus a scoped readback determines an executable REST shape. The installed SDK's types/build determine SDK compatibility. Actual Graph schema/data determines delivery fields.

| Level | Meaning | Does not establish |
|---|---|---|
| Conceptual | Design or data-shape explanation | API syntax or runtime support |
| Documentation-checked | Relevant primary source inspected | Build success or tenant acceptance |
| Compiled/local-tested | Exact package versions and local command passed | Tenant behavior, editor permissions or deployment |
| Tenant-tested | Identified environment and actual request/editor evidence | Other tenants/versions or hosted frontend acceptance |
| Deployed-tested | Identified release and independent route/editor checks | Untested locales, features or production scale |

Label SDK main-branch guidance as moving-source documentation unless pinned. Prefer explicit field settings when documentation defaults disagree. Do not resolve a conflict by silently guessing or borrowing a similarly named property from another API layer. Remove obsolete hard claims or isolate them as unverified historical comparison.

## Package design

Keep `name` and `description` YAML frontmatter on every SKILL.md. Description begins with Use when and describes triggers. Preserve names when refining existing skills. Link every supporting reference, including source ledgers and optional comparisons. Keep Optimizely SaaS execution references separate from optional Optimizely PaaS/.NET comparisons. Explain content architecture using Optimizely concepts throughout.

Recipe consistency includes agent definitions, skill attachments, workflow owner names, phase dependencies, demo instructions, templates and metadata. Editing only a SKILL.md cannot remove an obsolete fourth-agent dependency elsewhere. Template records use null/unknown rather than fabricated IDs or pass results. Explain which fields are artifact data versus actual MCP API arguments.

## Validate and distribute

1. Parse YAML/frontmatter and JSON; resolve local links and reference reachability; check attached skills, exactly four active roles and phase dependencies.
2. Check REST/SDK/Graph examples separately, source conflicts, field names, version assumptions, secret handling and unsupported completion claims.
3. Run scripts' syntax checks and relevant fixture tests. Run exact starter build/type checks and tenant tests only when those prerequisites exist; report unexecuted checks explicitly.
4. Repeat identical scenarios with old/new bundles in fresh agents. Grade actual output against assertions, including partial/inferred guidance, and preserve qualitative responses. Do not report one small sample as a statistically reliable benchmark.
5. Independently review architecture, editor constraints, preview, release and recovery guidance. Fix important findings and rerun affected checks.
6. Produce a versioned directory, manifest and ZIP containing `.kajoo`, agents, skills, assets and connectors. Compare archive entries and hashes with source files. Preserve the prior version.
7. If installation is requested, resolve actual Kajoo IDs and API actions. Update entrypoints and all supporting files, synchronize role assignments/workflow as intended, read back and compare. Record source version, installed IDs and any representation not updated. Never infer installation from a ZIP or sandbox file.

Do not push a remote catalog or change an active project's configuration as an unannounced consequence of editing documentation. Respect the current task's authorization; previously approved destination/actions do not need another generic approval.
