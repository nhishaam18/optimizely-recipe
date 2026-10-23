# Five-phase source-to-Optimizely flow

Recipe 1.5.5 supports desktop, mobile or both; the historical filename does not restrict scope. Follow [operation contract](operation-contract.md). Seed all five phases. Phase 3 starts empty.

| Phase | Ordered initial tasks and owners |
|---|---|
| 1 Discover and annotate | 1.1 inputs/connections - Orchestrator; 1.2 template - Developer; 1.3 capture - QA; 1.4 annotate - QA; 1.5 feedback/approval - QA |
| 2 Model and prepare | 2.1 styles/behavior - QA; 2.2 readable models/handoffs - Developer; 2.3 editorial architecture review - Optimizely Specialist; 2.4 consolidated approval - Orchestrator; 2.5 generate Phase 3 tasks - Orchestrator |
| 3 Implement and assemble | Initially no tasks. Populate reusable component tasks, shared layout/preview, page assembly, visual QA and assembled-result review from approved report |
| 4 Configure and compose | 4.1 tenant inventory/change plan - Optimizely Specialist; 4.2 model synchronization - Optimizely Specialist; 4.3 assets - Optimizely Specialist; 4.4 application/preview - Optimizely Specialist with Developer support; 4.5 drafts/shared content/blueprints - Optimizely Specialist |
| 5 Verify and release | 5.1 CMS/frontend verification - QA; 5.2 approved publication/deployment - Optimizely Specialist coordinating Developer; 5.3 release verification and handover - QA |

Intake resolves current IDs and exact repository path. Bundled setup uses the preserved template/ensure-pnpm helper; existing mode never re-extracts. Independent capture can continue if installation is blocked. Phase 2 must wait for approved annotations; carry technical setup gaps forward only to affected decisions.

Phase 2 produces one human-readable component Markdown file per reusable definition, a page architecture document and review index. Specialist reviews semantic field choices, shared-instance policy, placement, required/localized enforcement and existing-tenant impact. QA covers observed behavior/styles; inferred and proposed CMS decisions are labeled. User approves the consolidated revision before Phase 3. Creating tasks is not starting them.

Phase 3 uses the component document as sole mandatory handoff read, exact shared anchors only when needed. Put common styles/layout in production-used paths, not a mock-only page. Every component task includes local models/renderers/checks; dependencies cover shared types/registries. Assembly uses the same renderers/layout/style path as CMS preview with representative fixture adapters. Label fixture evidence distinctly. Local source checks precede manifest review; unavailable authenticated generation is a scoped gap, not permission for fake credentials or repeated push attempts.

Phase 4 does not start because an empty Phase 3 appears complete. Require all generated tasks and assembly QA evidence. Each external change batch has a user decision and readback receipt. Do not overwrite pre-existing tenant models/content based only on a matching name. Distinguish schema, assets, drafts, application and publication. Use supported tools/API/UI actually available. Missing capabilities are explicit blockers, not invented connectors.

Phase 5 independently tests intended picker placement, draft editing/refresh, permitted reordering, shared header/footer behavior on representative pages, locale and device scope, source/frontend/CMS page-area comparisons, and release identity. Do not compare editor chrome to the source page. If Kajoo preview fails, pause dependent integration/acceptance and provide the documented runnable download; neither download nor local fixture success completes live CMS acceptance.

Phase transitions require an explicit user start for the next phase, separately from artifact acceptance. At each authorized boundary stop with results and blockers. Phase 2 may create Phase 3 tasks through Task 2.5 but cannot execute them.
