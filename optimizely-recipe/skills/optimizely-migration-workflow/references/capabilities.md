# Capability preflight

Declarations express intended tools; only the runtime catalog and actual checks prove availability. Resolve IDs dynamically. Native filesystem/shell/browser tools are runtime capabilities, not implied by a generic Kajoo connector. A sandbox ID does not prove an active session.

For [implementation-only entry](implementation-entry.md), check filesystem/edit mode and the installed toolchain needed for the first model; reuse matching checkpoint evidence. Perform browser, tenant, Graph, preview and host checks when their operations become eligible. This full-migration capability table is not a checklist that must finish before a local source edit.

| Owner | Check | Evidence/blocker |
|---|---|---|
| Orchestrator | Workspace/project, four active roles, task/artifact access, run result retrieval | Actual IDs, result mechanism, accessible artifacts |
| Developer | Repo/branch, instructions, user changes, supported Node/package manager/lockfile | Non-secret runtime manifest |
| Developer | Starter, SDK/CLI/API versions, registry/build conventions | Versioned qualification; one SDK family |
| QA | Playwright/sharp imports, browser launch, writable output and source access | Browser/tool versions, fixture result; no silent downloads |
| Optimizely Specialist | Tenant/application, management auth, Graph delivery, preview config | Scoped non-secret readback; dependent operations blocked if absent |
| Developer | Host account/project, deploy command/environment, host mappings | Actual host readiness and release authorization |
| QA | Fixture edit/publish actor or observable assisted session, deployed URL | Actor and actual demonstrated checks, not assumed role access |

Use existing supported tools. Missing dependencies are explicit prerequisites; installation follows environment policy and existing authorization. Keep credentials in secret configuration. Redact sensitive URLs before saving evidence; tokens do not belong in screenshots, logs or prompts.

Select migration, modeling and rendering tools for the Optimizely CMS SaaS target. Source exports are separately scoped evidence; model the target using Optimizely content types, contracts and composition.

Missing source, credentials and hosting are separate blockers. Continue independent authorized work such as source discovery, model proposals and local fixtures. Label mock/local/tenant/deployed evidence accurately. Never invent an endpoint, connection, remote fork or passed execution.
