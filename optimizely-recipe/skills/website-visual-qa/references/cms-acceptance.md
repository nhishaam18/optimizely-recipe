# CMS, editor, and deployed acceptance

Create cases from approved requirements and fill the test-plan/report assets. Each case includes actor, route/site, locale, CMS content key/version/variation, `blockId`, `occurrenceId`, precondition, action, expected result, checkpoint/tolerance, evidence, cleanup, and result. Mark an area not applicable only with the approved reason.

## Controlled authoring contract

For each approved Visual Builder container, record allowed section types, min/max count, allowed nesting, allowed display settings, ordering constraints, default/empty behavior, and explicit unsupported layouts. Editors may edit semantic fields and compose or reorder the approved sections. Acceptance must prove both allowed actions and rejection or safe fallback for unsupported structure. A renderer that happens to display a manually seeded tree does not prove editor usability.

Define identity independently from presentation:

- A **local occurrence** has its own CMS instance; editing it changes only its route occurrence.
- A **shared occurrence** intentionally references one CMS instance; editing it changes every mapped consumer.
- A **blueprint/copy** creates independent content after creation; it is not a live shared instance.

## Concrete editor-to-public procedure

Use authorized fixture content and named test accounts. Record timestamps with timezone, content IDs/versions, locale, variation, deployment URL/ID, and screenshot/response evidence at each checkpoint. Do not use uncontrolled live content merely to obtain proof.

1. **Baseline:** On the deployed public URL, record the published values, section order, response/cache headers, rendered metadata, deployment identity, and evidence hashes. In authenticated preview, record the current draft/published version selection.
2. **Independent local edit:** As an editor, change a distinctive field in one local occurrence. Save a draft. Confirm the edited value appears in that occurrence's draft preview and that another occurrence using the same `blockId` remains unchanged.
3. **Intentional shared edit:** Change a distinctive field in an approved shared fixture. Save a draft. Confirm draft preview changes in every mapped consumer and in no unrelated consumer.
4. **Compose and reorder:** Insert an allowed section into an allowed container, populate its minimum valid fields, and reorder two approved sections. Confirm the Visual Builder tree and draft preview reflect the exact `occurrenceId` order. Remove or revert according to cleanup.
5. **Unsupported layout:** Attempt one agreed unsupported type, nesting, count, or display setting using a safe draft. Confirm the editor prevents it or the approved validation/fallback occurs. Record the exact response; do not damage published content to test rejection.
6. **Draft isolation:** Before publishing, request the anonymous public route with a cache-busting observation parameter only if approved. Confirm none of the draft-only marker values or order changes are public. Confirm preview selects the intended route, locale, version, and variation.
7. **Authorized publication:** Publish the fixture through the agreed workflow/role. Record the publishing content version and timestamp. If the approved test account lacks publish permission, verify the restriction and have the authorized actor perform publication; do not grant extra rights.
8. **Delivery and cache freshness:** Poll the intended delivery/Graph response and public URL at the pre-agreed bounded interval. Record first-seen timestamps separately for CMS publication, delivery/index availability, and public frontend visibility, plus response/cache headers. Pass only when the public value/order becomes visible within the agreed service threshold. A manual cache purge/revalidation is a separate documented action and result.
9. **Cleanup:** Restore or retain fixtures exactly as the approved plan says, publish restoration when authorized, and verify the final public state. Preserve all before/after evidence.

Failures at modeling, constraints, content identity, preview, rendering, or publication go to Developer through Orchestrator. QA retests the defect and affected shared/local consumers.

## Deployment identity procedure

Developer supplies commit SHA, build command/result, deployment/provider ID, environment, canonical URL, deployment timestamp, configuration version, and CMS schema/content version. QA:

1. resolves the supplied commit from repository evidence and matches it to the deployment record;
2. opens the exact canonical/deployment URL and records redirects and final hostname;
3. verifies a build/deployment identifier exposed by the host, deployment API, approved response header, or immutable provider record;
4. confirms preview and public application host/root mapping refer to that environment;
5. runs acceptance on that URL and records the tuple in every report.

If identity cannot be observed, report the deployed checks as blocked or qualified; do not substitute a local build or another URL. Static review of the reusable skill is not tenant, build, or deployment testing.

## Acceptance matrix

| Area | Required evidence when applicable |
|---|---|
| Content models and properties | Each approved `blockId` maps to a real type, field set, relationship, query, and renderer. Labels/groups are usable. Required/length/range/reference rules reject invalid input. Empty, long, and missing values follow the approved behavior. |
| Local/shared identity | Edit a local occurrence and prove unrelated occurrences stay unchanged. Edit an intentional shared instance and prove all mapped consumers change. Test blueprint copies as independent content. |
| Visual Builder | Editors can add, edit, remove, and reorder approved sections within constraints. Validate min/max, nesting, order, display settings, empty composition, and unsupported layouts. |
| Media/fonts/links | Asset identity, availability/rights, alt ownership, intrinsic dimensions, crops/renditions, font files/weights/fallbacks, internal route rewriting, anchors, and broken/missing handling. |
| Visual/responsive | Approved viewports and boundary widths; numeric geometry/typography/image deltas; line wraps; section order; stack/hide/reorder rules; no overflow, clipping, overlap, or unusable targets. |
| Accessibility | Landmarks/headings, accessible names/descriptions, image alt, keyboard order/operation, visible focus, dialogs/menus/accordions, form labels/errors, contrast, zoom/reflow, reduced motion, and automated findings with manual confirmation. |
| Functional | Routes/redirects, navigation, menus, accordions, safe form modes, validation, loading/empty/error states, external links, downloads, console errors, failed requests, analytics/third-party behavior explicitly in scope. |
| SEO | Unique title/description, canonical, robots/index directives, sitemap inclusion, heading structure, status/redirect behavior, Open Graph/social values, structured-data syntax and content, hreflang/locales, image metadata, and draft/preview no-index isolation. |
| Applications/locales | Correct hostname/root/site, route collision handling, locale selection/fallback, unpublished/missing translation, localized navigation/canonical/hreflang, RTL when approved, and no cache cross-contamination. |
| Roles/lifecycle | Author/reviewer/publisher rights, restricted fields/content, draft isolation, approval/rejection/resubmission, scheduling/expiry timezone, and intended preview version/locale/variation. |
| Taxonomy/personalization | Stable term mapping and filters; matching/nonmatching/anonymous/consent-denied audiences and fallback. A manually selected variant is not targeting evidence. |
| Graph/delivery/cache | Implemented schema and queries, null/missing/error handling, content version readback, publication-to-index timing, frontend revalidation/cache headers, stale-content recovery, and no draft/public or user/locale cache leak. |
| Deployment | Repository commit, successful build evidence, deployment ID/environment/URL match, host/root mapping, deployed smoke tests, and recovery evidence required by the release plan. |

## Reporting and defect lifecycle

For every failed case, record severity, requirement revision, environment/deployment tuple, actor/content version, route/locale/state/viewport, `blockId`, `occurrenceId`, expected/actual result, measurable delta, reproduction, evidence, and owner. Keep source accessibility defects separate from target failures unless the approved requirement explicitly preserves behavior.

Developer returns a fix and fresh implementation evidence through Orchestrator. QA reruns the failed case, directly affected behavior, responsive boundaries, intended shared consumers, and unrelated local consumers. Record `retest-pass`, `retest-fail`, or `blocked`; never erase the original result. Final coverage lists passed, failed, blocked, excluded, and accepted exceptions against every approved requirement. User acceptance remains separate from QA readiness.

## Code-first acceptance additions

Read the shared CMS glossary through optimizely-saas-modeling. Independently compare the approved model worksheet with generated type/contract/display entries and actual CMS readback: exact keys, `isRequired`/`isLocalized` semantics, embedded versus shared identity, allowed targets and min/max constraints. Test valid and invalid values, two independent Hero instances, shared instances where intended, card ordering and section ordering separately. Verify the `.mjs` discovery set and runtime registry cover all approved types; neither a successful esbuild import nor a CLI success message proves enforcement. Read back application entry point, host/scheme/locale/preview settings and actual bootstrap content; a CLI existence assumption after 403 is blocked evidence. Keep structural-section flexibility and section-enabled-component editing distinct. Record remaining Visual Builder restriction gaps explicitly.


Component localization safeguard: on a property with type `component`, omit `isLocalized` entirely, including false. Apply approved localization to supported individual fields on the referenced component type; do not blanket-localize every child or alter shared consumers without reviewing their semantics. Component array items also cannot carry this metadata. Keep valid array-container metadata distinct from item metadata, and do not apply this prohibition to `contentReference` or scalar properties. Include the choice in each component handoff. During Phase 2 write definitions/examples in the handoff only; application changes belong to authorized implementation. Check the generated manifest with the scoped preflight before any separately authorized tenant sync. Do not initiate a push or routine SDK lookup to check this rule. TypeScript success and preflight success do not prove full CMS acceptance.
