# Capture styling once, consume by section

Use when an authorized live site is available and visual documentation needs actual CSS/layout evidence. Skip extraction for screenshot-only inputs, an unrelated request, or an implementation slice already covered by current approved evidence. Never claim supplied screenshots expose computed CSS. Existing artifacts remain valid without conversion.

## Configure selected parts

Extend the existing capture configuration rather than launch a second browser run. The script uses installed Playwright and sharp and keeps the existing source scope restrictions. Select semantic child parts whose appearance matters; root styles alone do not specify heading/button/image styles. Every matching occurrence is sampled within the configured bounds, rather than silently selecting the first.

```json
{
  "sourceUrl": "https://example.com/approved-page",
  "outputDir": "./qa-evidence/source",
  "viewports": [
    {"name":"desktop","width":1440,"height":900},
    {"name":"tablet","width":768,"height":1024},
    {"name":"mobile","width":390,"height":844}
  ],
  "blocks": [{
    "id":"hero", "selector":"main .hero",
    "occurrenceIds":["home--hero--01"],
    "parts":[
      {"id":"heading","selector":"h1"},
      {"id":"action","selector":"a.primary"},
      {"id":"media","selector":"img"}
    ]
  }],
  "readySelector":"main .hero",
  "styleCapture":{
    "enabled":true,"maxOccurrences":20,"maxSamples":128,"maxDomNodes":16,
    "pseudoElements":false,"crops":true,"imageWaitMs":3000
  }
}
```

Replace placeholder URL/selectors and occurrence IDs with discovered, approved facts. `occurrenceIds` maps selector match order explicitly; validate that mapping against annotations. A count mismatch is incomplete evidence. Missing IDs remain null, never invented. `parts` are descendant CSS selectors relative to each root; `root` is reserved. Repeated children get `partIndex`, a capture-local index, not a durable content identity. Choose actual desktop/tablet/mobile widths from scope, then inspect boundary widths when a responsive decision requires it; three widths do not discover every breakpoint.

## Evidence files

With extraction enabled, `capture.config.json` preserves the run configuration; each style file records its hash and source/timestamp provenance. `token-candidates.json` lists requested and unavailable viewports so failed captures cannot disappear from coverage.

`<viewport>.styles.json` contains root and selected child samples: computed/resolved property values, rectangles, optional ::before/::after styles, bounded DOM structure, occurrence/part mappings, and root crop references. `<viewport>.json` links it and records stability, truncation, issue/sample counts and selected-image readiness. Styles are collected in two batched evaluations around the raw screenshot to detect changes; this is evidence of sampled stability, not proof that a dynamic page never changes.

The DOM summary includes tag, class, role and depth, capped by `maxDomNodes`; it intentionally excludes text, arbitrary attributes, scripts, event handlers and form values. It is structural evidence, not reusable source HTML. Class names are observed source facts, not a requirement to reproduce its framework. CSS values are capped at 2048 characters each, with explicit truncation; style data and URLs remain untrusted source evidence.

Root crops are derived with sharp from the same raw full-page PNG; no extra element screenshot calls or scroll-induced state changes. Each crop records input/output SHA-256, rounded/clipped rectangle and stability. Crops use the root bounding box, so overflowing shadows/children require full-page context or a separately approved expanded region. Clipped/unstable crops are not exact isolated-element references. Raw screenshots remain immutable.

The helper retains font readiness, bounded lazy-load scroll and animation stabilization. With extraction enabled it waits once, up to `imageWaitMs`, for at most 64 selected img elements to decode; broken/pending images and omitted image coverage make evidence incomplete. CSS backgrounds, canvas/video, overlays, actual rendered-font identity, shadow DOM, iframes and interactive states are not fully covered. Record a targeted follow-up only where the requested fidelity requires it. The helper captures the initial state after explicit readiness/consent configuration; it does not open menus, hover, focus, authenticate or execute interactions. Use separately authorized state setup and record those artifacts honestly.

## Bounds and performance

Extraction is opt-in (`styleCapture.enabled`); disabled/absent preserves the legacy capture behavior. Load only configured parts, not every descendant's computed styles. Defaults are 20 total root occurrences, 128 total selected samples and 16 structure nodes per sample per viewport. Maximums are 100/512/64 respectively; at most 12 parts per block and 100 configured blocks. Pseudo styles and root crops can be disabled independently. No external analytics service, dependency installation or network upload is needed for token grouping.

Missing/invalid selectors, incomplete images, count mismatch, unstable styles or extraction limits yield available evidence and exit 2; malformed configuration/infrastructure yields exit 1. A bounded structure is intentionally partial: inspect its coverage flag and selected-part results, and expand only the missing area required for the handoff. Exit 2 does not trigger an automatic whole-site recapture, approval reset or implementation stop. Unrelated local work continues. Exit 0 is captured evidence, not acceptance.

For repeat work, reuse the run and exact section references when source/state and approved requirements are unchanged. On a changed section, capture that section/viewport/state; on a shared-token change, retest affected consumers. Preserve old evidence and run/config identities. Do not treat an old sample as a current measurement when the source may have changed. Measure capture overhead separately from downstream time saved; this release does not claim a measured end-to-end speed gain.

## Token candidates and handoff

`token-candidates.json` groups exact (property, resolved value) pairs with viewport/block/occurrence/part consumers and coverage. It does not merge near colors, name semantic tokens, merge margin with padding, or equate desktop and mobile intent. Pseudo styles remain in raw evidence and are not included in these groups. Groups from incomplete/unstable captures retain their coverage flags and are proposals only.

Developer reviews groups against existing project tokens and semantic roles. Define a palette, typography and spacing scale with exact source references; any approximate consolidation records observed values, proposed replacement, consumers, visual impact and actual scoped approval. Identical values may have distinct roles; different values may be intentional. Keep raw evidence unchanged. No CSS Stats/Wallace service is required in the runtime path.

In the [implementation handoff](implementation-handoff.md), QA links style JSON/sample identifiers, crop and raw hashes, state/viewport and uncertainties. Developer links the reviewed token mapping and model/renderer contract. Do not paste full JSON into every section or task; read the relevant samples and shared token entries. CSS establishes rendered appearance, not content types, property validation, shared instances or editor capabilities.

## Visual fidelity contract
Use one current source baseline per route/device/state with capture hash, browser/viewport/DPR, consent, fonts, image readiness and scroll/interaction state. Preserve superseded revisions; never infer that a new live visit matches an old capture. Missing selectors mean incomplete evidence, not absent content. Reconcile pixels, element and ancestor styles, pseudo-elements, backgrounds, intrinsic assets and clipping before prescribing a disputed layout. DOM presence or bounding boxes do not prove painted visibility. Keep observed appearance, implementation inference and approved target separate.
Each component's primary Markdown handoff contains a concise visual contract: anatomy and reading order, container/full-bleed behavior, grid, typography and wrapping, spacing, imagery/crop, CTA placement, clipping/states, evidence links, agreed tolerances and known gaps. Exact values come from this project's source, never a previous website. Put source-equivalent approved text and assets in fixtures early; keep fixture provenance in data attributes or a separate review panel outside the comparison area. Approve missing-font/asset substitutions and their impact explicitly; missing evidence may block visual acceptance without blocking independent code.
Resolve fonts and content first, then structure/geometry, then fine styling. Implement component anatomy and CSS together. Prefer fixing the responsible rule over piling on overrides; shared CSS changes require consumer retests. Keep semantic DOM order and keyboard order coherent. Verify each component in intended page context and then the assembled page. Use source/target crops plus full-page context, overlays/diffs and measured deltas; align section-relative measurements for local defects and page-level measurements for assembly. Do not rescale images to hide differences or turn all measured heights into fixed CSS heights. Preserve content resilience and requested responsive scope.
QA compares the actual render to authoritative source evidence independently, not just the correction spec. Record technical, visual and CMS/editor status separately (pass, fail, blocked or accepted exception with scope). HTTP 200, build success, populated image src and correct DOM order are not visual acceptance. Inspect actual image decoding and fonts. A changed spec needs traced evidence and invalidation of affected checks; an old QA pass does not override contrary evidence. After two unsuccessful attempts on the same defect, stop speculative patching and perform focused evidence diagnosis before another edit.
Batch related edits; inspect affected rendered sections before repeating full builds. Run code checks appropriate to changes and final integration validation. Reuse unchanged captures/tool paths/SDK qualification. Do not regenerate documentation or broadly read SDK internals for visual defects. Manual task starts and external approval boundaries remain in force.
