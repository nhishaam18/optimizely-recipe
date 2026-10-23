# From source evidence to a reusable design system

This is a project method, not a claim about the unseen source site. Developer proposes tokens/components; QA supplies observations and independently compares the result. A URL plus screenshots establishes rendered states, not the original design library or CMS identity.

## Observe, infer, decide

1. Join each screenshot region to a stable block occurrence ID, source URL, viewport, scroll position, selector, content and UI state. Preserve the original screenshot; annotations are separate files.
2. Inspect the authorized live URL to identify font files, computed styles, image sources, widths, layout behavior and interactions. Record asset provenance and permission. If access fails, mark inferred values; do not report screenshot estimation as a measured CSS value.
3. Compare at least the approved desktop and mobile states. Determine content max-width, horizontal gutters, type hierarchy, vertical rhythm, color roles, border/radius, controls, image crop/focal point and layering. Similar values may be one token with optical variation; do not make a token for every pixel.
4. Propose responsive rules from evidence. Screenshots at two widths do not reveal an exact breakpoint. Inspect intermediate widths and content stress states to choose the point where the layout needs to change. Record the chosen rule and inference separately from observations.
5. Map the approved token table into the existing CSS/Tailwind system. Reuse shared typography, container, button and media primitives. A React Button is normally a presentation primitive, not a CMS content type.

Required `design-tokens.md` table:

| Token/behavior | Value or rule | Evidence | Confidence | Consumers | QA acceptance |
|---|---|---|---|---|---|
| `font.body` | Actual licensed font/fallback stack | URL/font response or screenshot ID | Observed/inferred | Body, controls | Font loaded; matching line wraps |
| `space.section` | Approved desktop/mobile values | Region measurements | Observed/inferred | Hero, FAQ | Agreed spacing tolerance |
| `layout.container` | Max-width plus gutters | Two route captures | Observed/inferred | Shared wrappers | No horizontal overflow |
| `hero.media` | Aspect ratio, crop and mobile order | Desktop/mobile block IDs | Observed/inferred | Hero | Subject retained; no layout shift |

Record actual values during discovery; this bundle does not supply a source site from which to measure them. Keep an explicit status of proposed/accepted/implemented/verified per decision.

## Connect tokens to editorial choices

Content fields answer what is said: heading, body, image, alt text and CTA. Display settings answer which supported presentation is used: for example theme and alignment. Register a display template and map its choice keys to fixed classes/tokens. A CMS value must never become raw CSS, a Tailwind class string or executable markup.

The [official display template guide](https://github.com/episerver/content-js-sdk/blob/main/docs/9-display-settings.md), checked 2026-09-18, supports templates targeted at a content type, base type or structural node. The [Hero walkthrough](block-walkthrough.md) uses a type-specific theme selector. Its CSS values are illustrative fixtures, not source measurements; replace them from the accepted table and compile against the pinned SDK.

## Visual and behavioral verification

QA compares matched content, fonts, viewport and interaction state. Check geometry before details: container, column order, spacing, type wrapping, image crop, controls and focus. Exercise long headings, empty optional text/image/CTA, zoom and an intermediate viewport; a static screenshot match cannot prove responsive behavior. Record screenshot/DOM evidence, defect location, expected/actual and retest. Discovering an unimplemented variant requires either an implementation or an explicit scope decision, not silent fallback acceptance.

## Consume an existing approved visual contract

When a [visual/model handoff](../../website-visual-qa/references/implementation-handoff.md) supplies approved tokens, layouts, asset references and responsive rules, implement those values directly. Run the observe/infer/decide procedure above only for missing or changed design decisions. Keep shared tokens authoritative in one document and record occurrence overrides separately. Fixing a local gap does not require recapturing every source route; retest all impacted consumers if a shared token changes.

## Measured styling without repeated inspection

Consume relevant [style extraction](../../website-visual-qa/references/style-extraction.md) samples and root crops when supplied. Exact-value groups are candidate inventories, not a recovered source design system. Map consumers to existing semantic tokens, preserve intentional differences and record approved changes for approximate consolidation. Raw data stays immutable. Read only the selected block/parts and its shared token mapping; do not rerun live extraction for an already documented implementation slice.
