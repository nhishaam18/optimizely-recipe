# SaaS architecture and editorial decisions

## Responsibilities and boundaries

CMS stores editorial definitions, content versions, assets and composition. Graph delivers a queryable representation. Next.js resolves requests, renders selected content, implements interactions and manages its caches. Publishing CMS content, indexing it in Graph, invalidating a frontend cache and deploying code are separate events. When a change is missing, establish which event has not completed before changing the model.

This is the migration's architectural recommendation, informed by the [SaaS overview](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/overview-saas) and [applications guide](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/applications). Checked 2026-09-18, namespace v1.0.0-CMS-SaaS; no client tenant or deployment verified.

Developer translates QA's source evidence into models and renderers. QA challenges editing and reuse behavior. Orchestrator carries one coherent approved revision through implementation and acceptance. Screenshots reveal visible occurrences, not original content identity, private workflow, unpublished locales or source CMS internals.

## Choose a semantic unit

A useful editorial unit has business meaning, a clear editor and a lifecycle. Ask: can it change independently; should one edit affect several pages; is it independently routable; must it reorder; does it need separate permissions or localization? Choose identity and ownership before field types.

| Observation | Proposed decision | Evidence that could change it |
|---|---|---|
| Same navigation on two pages | Site-owned shared Navigation instance | Different business/site ownership or independent publishing |
| Similar Hero on two pages | One Hero type and renderer, two local occurrences | Explicit requirement for one shared campaign message |
| CTA inside Hero | Hero fields consumed by React Button | Independently managed CTA library with shared lifecycle |
| Repeated cards | Local ordered values or references, selected by reuse needs | Editors need to link to or update cards independently |
| Article with its own route | Structured page content | It is merely a local visual teaser |

Do not create a schema for each screenshot rectangle. Layout wrappers, icons and Button primitives normally stay in the design system. An entire page in rich HTML prevents meaningful constraints and section reordering.

## Maintain four different trees

| Tree | Example | Governs |
|---|---|---|
| Public route hierarchy | `example.test/`, `/campaign`, `/articles/launch` | Host/locale routing, canonical URLs, redirects |
| CMS editorial tree | Site root, pages, site settings, shared assets, local ownership | Organization, identity, access, lifecycle |
| Composition tree | Campaign experience → Hero, Card Grid, FAQ | Section order, display settings, supported layout nodes |
| React tree | SiteShell → Navigation + Experience → Hero → Button | Rendering, semantics, responsive layout and interaction |

Record mappings; do not assume these structures are isomorphic. A shared footer has many rendered occurrences and no independent public route. A CMS folder need not add a URL segment. A React wrapper need not become an editable composition node. Reordering must preserve section content identity and frontend behavior.

## Ownership is not folder placement alone

Global content is shared only across explicitly agreed sites. Site content belongs to one application/brand. Page-local content changes with its parent experience. An independently referenced item may still be site-owned rather than globally shared. Define owner, editor, locale, publication dependency, deletion impact and reuse policy. Verify actual parent/owner mechanics before importing.

Prefer site-level Navigation/Footer references from a common shell. Keep body sections local until sharing is intentional. Reusing an asset binary does not mean every occurrence shares its alt text or crop. A blueprint is a starting copy; a shared instance has continuing shared identity.

## Optimizely content concepts

| Concept | Meaning and design question |
|---|---|
| Content type and properties | Define the schema for content instances. Which semantic fields and validations does each type need? |
| Content instance and renderer | Editorial values and React implementation have separate identities. Reuse a renderer without sharing values unless shared editing is intended. |
| Visual Builder composition | Stores the editable arrangement of approved sections. Which section types, order and layout capabilities must editors control? |
| Display templates and settings | Expose bounded presentation choices separately from semantic content fields. |
| SDK contracts | Share field definitions across types. Define collision and evolution policies; each content instance keeps its own values. |
| Blueprints | Supply a starting copy of content/composition. Decide whether independent copies or continuing shared content identity is needed. |
| Draft preview | Connects the requested draft to the deployed frontend. Verify editing bindings, version/locale selection and public-content isolation. |
| Applications | Associate content roots with hosts and locales. Record public routing and preview configuration explicitly. |

Deliver the [model contract](migration-contract.md) and test one shared Navigation edit, one independent Hero edit and one section reorder. Those tests expose mistaken ownership faster than a diagram alone.
