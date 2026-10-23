# Build, deploy, verify and recover

Checked: 2026-09-18. Target: selected Next.js runtime and actual hosting provider. Verification: source-checked runbook only; this bundle has no hosting account, tenant, application deployment or passed integration tests.

Recipe 1.5.0: intake records intended destinations and scope, not approval of unseen external changes. Require the concrete user-approved batch for schema/content/application writes, uploads, publication and deployment. Reuse that decision only for unchanged scope/destination/revision/effects; material changes need approval again. Developer owns code/host release, Optimizely Specialist owns CMS actions, QA independently verifies, and Orchestrator coordinates actual decisions. Follow the operation-contract rather than broad intake authorization.

## Prepare a reviewable release

Record host/project/environment, repository/branch, exact commit or source hash for a deliberately uncommitted artifact, build/runtime versions, domain/preview mapping, required secret names and authorized actions. Choose the host before writing a host command. Check the actual project's build/start scripts, supported Next.js mode, Node version, image handling and outbound Graph access. Keep development-only TLS flags out of production startup.

Install from the recorded lockfile using the selected package manager's reproducible mode. Run the real build/type/lint scripts and meaningful route tests; preserve commands, timestamps, exit codes and logs. If a script is missing, record that and the actual substitute check. Do not claim a scaffold builds merely because package metadata resolves. Ensure that local fixtures are distinguishable from CMS queries and that build-time content access cannot silently substitute empty pages.

Separate deployment from CMS changes: retain definitions/readback and content mappings, deploy compatible frontend code, then perform the agreed publication sequence. Confirm new and prior frontend versions tolerate the intended schema/content transition before release. See modeling's [schema evolution and import guide](../../optimizely-saas-modeling/references/schema-evolution-and-import.md).

Before configuration changes, save `configuration-change-manifest.md`: resource/environment, responsible owner, before/after values, readback identity/version, action authorization and supported restoration procedure. Cover CMS application root/host/locale and preview URL format, hosting environment variables, public aliases/domains, iframe policy, and CDN/cache rules. Record secret names and secure version references only, never secret values. If the provider cannot recover an old value, identify the secure recovery source before changing it. CMS [application settings](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/applications) are independent of a code deployment.

## Select the host-specific branch

| Host | Concrete release procedure | Recovery preparation |
|---|---|---|
| Existing configured host/CI | Inspect its checked-in workflow and official provider docs. Verify project/environment, secrets and build artifact; invoke the authorized pipeline or supported deployment command, then wait for its actual terminal status and returned URL. | Record the known-good release/artifact and provider-supported restoration action. |
| Vercel | Use the authorized team/project's Git integration or installed, version-recorded CLI. Set environment-scoped CMS/Graph variables, deploy the selected commit to the agreed environment, capture the deployment ID/URL and inspect build/runtime logs. Configure stable public and CMS preview URLs; do not guess a team/project or deploy production by default. | Record an eligible previous deployment and its configuration; use the project's Instant Rollback flow when recovery is authorized. Recheck public route and CMS preview afterward. |
| Optimizely frontend hosting | Prepare the provider's source ZIP with `package.json` at its root, exactly one supported npm/yarn lockfile, and the documented `<name>.head.app.<version>.zip` naming. Exclude `.next`/`node_modules`; the platform installs/builds. Confirm generated package-manager compatibility before changing lockfiles. Use the actual DXP project/environment and documented EpiCloud deployment flow or approved CI integration. | Preserve a known-good code package and release identity. Use that environment's documented recovery procedure; do not assume Vercel commands or an unverified rollback API exists. |
| Other Node/container host | Verify Next.js support, runtime/start command, environment variables, TLS/forwarded-host handling, persistent/shared cache, CDN and health checks against the host docs. Build a pinned artifact/image, deploy via its authorized pipeline, capture digest/version/URL and probe the running service. | Retain the previous image/artifact and validated traffic-switch/redeploy procedure, plus cache compatibility. |
| Unknown host | Complete local build, environment-variable contract, deployable artifact plan, route matrix and CMS recovery manifest. Ask for the intended host/project/environment and deployment scope; mark deployment blocked until resolved. | Do not invent a CLI, destination or successful URL. |

Primary host references: [Optimizely frontend hosting](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/host-a-front-end-with-optimizely), [Vercel Instant Rollback](https://vercel.com/docs/instant-rollback), [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting). Inspect their current instructions and installed tools when executing. Optimizely's documented EpiCloud flow includes package upload, `Start-EpiDeployment`, then completion; do not equate upload with a finished rollout or print authentication secrets in a command transcript.

## Required deployment receipt

Save `deployment-receipt.md` in project evidence, with actual values or explicit `blocked/not run`:

```text
Release scope/authorization record:
Source commit or artifact hash; lockfile hash:
SDK/CLI/Next.js/React/Node/package-manager exact versions:
Host project/environment; runtime/region where relevant:
Build/type/test commands, exit codes, timestamps and log paths:
Deployment command/pipeline ID; deployment ID/artifact digest:
Deployment started/completed times; actual terminal status:
Deployed URL; stable alias/domain; CMS preview URL:
CMS application/root/locale; secret names only:
Schema/content change manifest and publication event IDs/times:
Public/draft cache policy; publication freshness target:
Known-good frontend deployment; CMS recovery checkpoint:
Configuration change manifest; secure configuration checkpoint references:
Developer smoke evidence; QA report/retest evidence:
Blocked/excluded checks; responsible owner and next action:
```

## Verify the deployed result

Developer probes the public route, missing route, assets, environment configuration and authenticated CMS preview. QA then independently opens the same deployed URL, confirms the intended build and content identities, captures matched desktop/mobile source states, and checks navigation/CTA, keyboard behavior, responsive overflow and console/network errors. QA performs the [edit/reorder/preview/publish loop](block-walkthrough.md) and measures [ordinary publication freshness](preview.md). Build success, an HTTP 200 response and screenshot capture success each prove only part of this.

If a deployment succeeded but QA failed, record `deployed; acceptance failed` with reproducible evidence. Fix and redeploy within authorization, then rerun affected checks. If no host/access exists, report the completed preparation separately from blocked deployment. Never label blocked cases passed.

## Separate frontend, CMS and configuration recovery

**Frontend:** Identify the previously working deployment and compatible environment/configuration. Restore/promote/redeploy through the selected provider's supported mechanism within the recorded scope. Capture the operation ID/result, then verify route, static assets, preview, cache and content compatibility. Rollback may not restore environment variable changes or CMS data; inspect those explicitly.

**CMS:** Retain old definitions, content versions, source-to-target identity map, applied diff and batch checkpoints before writes. Determine which changed records need restoring and whether current editors have modified them. Restore approved content revisions or apply a forward-compatible schema correction using the verified management procedure; preserve unrelated changes and concurrency checks. A renamed/deleted property can have data consequences that frontend rollback cannot repair. Do not infer permission to delete content/types from permission to redeploy.

**Configuration:** Compare live settings with the saved manifest and check intervening changes. Restore only the affected, authorized settings through the owning CMS/host/CDN mechanism; retrieve secrets through secure version references. Coordinate ordering with code/schema compatibility and restore stable aliases only when the intended release is healthy. Read back application root/host/locale/preview settings, environment configuration and cache rules; then verify ordinary public routes, authenticated preview, iframe embedding, draft isolation and publication freshness. Record unresolved configuration separately from code or CMS recovery.

Record three recovery results: frontend, CMS and configuration. A successful frontend rollback with damaged CMS content or incorrect host settings is not full recovery. Re-query Graph and repeat preview/public route checks after corrections; indexing and caches may still expose prior state. Unresolved conflicts go to Developer through Orchestrator with exact affected identities.
