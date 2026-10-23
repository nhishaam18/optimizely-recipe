# Example: Hero handoff

This entire example is illustrative: synthetic screenshot facts and hypothetical decisions, not measurements, approval, SDK qualification or tenant results from a real site. Replace evidence paths/hashes and approval references in an actual handoff. The fixture is not a tenant API payload. Its flattened CTA fields illustrate one semantic design, not a mandate to change existing approved nested link models.

## Index

- Revision: demo-r3; hypothetical approved semantic scope: independent Hero on `/` and `/about`. No tenant writes authorized by this document.
- blockId: `hero`; occurrences: `home--hero--01`, `about--hero--01`.
- Evidence: EVD-D/A02–A05 and EVD-M/A02–A05; original/annotated files and SHA-256 would resolve through the real capture manifest. No real PNG hashes supplied here.
- Model decision: demo-M3 below. SDK mapping: pending first bounded installed-package check; reuse a matching checkpoint if available.
- First slice: `home--hero--01`; about uses the same type/renderer with independent content. No shared instance inferred from visual similarity.

## Visual contract

| Element | Desktop | Mobile | Evidence/status |
|---|---|---|---|
| Hero/A02 | Text left, image right | Text then image | Synthetic observed arrangement |
| Heading/A03 | 56px/60px | 36px/40px | Hypothetical approved typography, not measured CSS |
| Container/A02 | max 1200px; 32px gutter | 20px gutter | Hypothetical approved tokens |
| Image/A05 | 4:3 cover, centered | 4:3 cover, centered | Proposed crop; confirm subject retention |
| CTA/A04 | Inline link styled as button | Full width | Hypothetical approved behavior |

Switch at 768px is a hypothetical approved inference, not recoverable from two screenshots alone. Validate intermediate widths and long text. Source PNG coordinates must include dimensions/DPR and scale before comparison. Asset `hero-team.webp` is a placeholder asset name pending supplied original/rights; do not crop it out of a screenshot and call it an original. Font identity is unknown; font-dependent visual acceptance is blocked until resolved, while model work can proceed.

## Model inventory — demo-M3

| Key | Role | Ownership | Placement | Supporting types/contracts | Source/renderer |
|---|---|---|---|---|---|
| Hero | Semantic section-enabled component; SDK/base mapping pending | Independent instance per page occurrence | Approved main composition | None; image references managed media | `src/content-types/Hero.ts` / `src/components/sections/HeroSection.tsx` |

### Properties — Hero

| Key/label | Semantic type | Required | Localized | Default | Validation/cardinality | Ownership/targets | Delivery/nullability |
|---|---|---|---|---|---|---|---|
| heading / Heading | Short text | Yes | Yes | None | 1–100 characters; one value | Owned scalar | heading, non-null after validation |
| description / Description | Plain long text | No | Yes | None | Up to 300 characters | Owned scalar | description, nullable; omit empty paragraph |
| image / Image | Image reference | Yes | No | None | Exactly one image | Reference to managed image; alt belongs to occurrence | image, verified delivery shape pending |
| imageAlt / Image alternative | Short text | Yes | Yes | None | 1–200 characters; informative image in this scope | Owned scalar | imageAlt, non-null after validation |
| ctaLabel / Action label | Short text | Yes | Yes | None | 1–40 characters | Owned scalar | ctaLabel, non-null after validation |
| ctaUrl / Action destination | URL/link | Yes | Yes | None | Internal route or supported HTTPS URL | Scalar link here, not a shared button instance | ctaUrl, non-null after validation |

SDK mapping for every row: pending qualification; map the semantic decisions to installed declarations and inspect emitted flags. Delivery names above are target semantic fields; image/link delivery representation needs verification. Enforcement: requiredness, localization and lengths are proposed CMS constraints pending supported API verification; frontend handles absent optional description and invalid runtime data safely. Record unsupported constraints and an approved alternative; never claim editor enforcement from a table alone. No guessed REST payload is supplied.

| Property | SDK mapping / qualification | Enforcement / status |
|---|---|---|
| heading | Pending installed text declaration and required/localized flags | Required/length proposed CMS constraints; not tested |
| description | Pending installed text declaration and optional/localized flags | Optional/length proposed CMS constraints; omit empty text in renderer |
| image | Pending installed image-reference and delivery shape | Required/image-target restriction pending tenant validation |
| imageAlt | Pending installed text declaration and required/localized flags | Required/length proposed CMS constraints; informative image rule checked by QA |
| ctaLabel | Pending installed text declaration and required/localized flags | Required/length proposed CMS constraints; accessible link text checked by QA |
| ctaUrl | Pending installed URL/link representation | Required/allowed-destination policy pending supported validation; verify navigation |

Editor grouping, help text and field order are hypothetical design decisions still pending. Indexing/search is outside this example's approved scope. No source-CMS import is authorized; content values come from approved public evidence or supplied originals. Lifecycle proposal: each page-owned Hero follows its parent's draft/publication and locale workflow; verify actual ownership behavior before editorial acceptance. Route view: `/` and `/about` resolve to their respective pages; content view: separate Hero values with managed-media references; composition view: each page's main container owns its Hero; React view: both routes reuse `HeroSection` and shared link/media primitives. Actual application roots and registry paths come from the repository/tenant contract, not the screenshots.

### Composition and display

Main composition allows Hero and other separately approved sections. Hypothetical rule: one Hero, first, no Hero nesting. Enforcement mechanism is pending target qualification; editor acceptance of these rules remains blocked until verified or an alternative is approved. This does not block local model/renderer code.

Display setting `theme`: `light` or `dark`, default `light`, fixed token mapping; unsupported values render the approved light fallback. Font sizes, spacing and breakpoint are renderer tokens, not editable CMS fields. Native display-definition mapping is pending installed SDK verification.

### Renderer mapping and fixture

`Hero` → `HeroSection`: heading→h1 (page contract ensures one h1), description→optional paragraph, image/imageAlt→media renderer, ctaLabel/ctaUrl→accessible anchor. Reuse existing registry and discovery config paths from the repository checkpoint; inspect one local example if absent. Verify actual paths before editing; these filenames are illustrative targets.

```json
{
  "type": "Hero",
  "occurrenceId": "home--hero--01",
  "heading": "Build better digital experiences",
  "description": "Create experiences your customers love.",
  "image": "fixture:hero-team",
  "imageAlt": "Team collaborating around a meeting table.",
  "ctaLabel": "Explore our services",
  "ctaUrl": "/services"
}
```

`type`, `occurrenceId` and `fixture:` are fixture metadata, not asserted CMS properties/IDs. `/about` has its own values; editing its heading must leave `/` unchanged.

## Implementation and acceptance

Read this slice and its checkpoint; verify missing SDK patterns once, persist them, write/type-check Hero, then renderer/registry/discovery and local fixture. Generate/review the manifest afterward before any separately authorized tenant sync. Asset/font absence blocks faithful visual acceptance, not unrelated model work.

| Check | Expected | Evidence/status |
|---|---|---|
| Local at 1440×900, 390×844 and 768px boundary | Correct order, no overflow, optional description omitted, CTA keyboard focus/navigation | Not run; local browser/DOM |
| Visual geometry | Hypothetical approved tolerance: ±4 CSS px for container/gaps after source-scale normalization | Not run; matched screenshots; font/asset unresolved |
| Semantic content | Exact approved text and destination; descriptive alt; one h1 | Not run; DOM |
| Independent ownership | Edit about Hero without changing home | Not run; tenant/editor |
| Composition and property constraints | Required-field and invalid-value rejection plus actual ordering mechanism | Blocked until qualified; tenant/editor |

Changed scope example: a home-only CTA gap fix updates its scoped renderer rule and local comparison. It does not regenerate the model, handoff or SDK study. Changing a shared spacing token requires retesting all declared consumers. A heading localization change revises the Hero contract and affected approval/checks only.
