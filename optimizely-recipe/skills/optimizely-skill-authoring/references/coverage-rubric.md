# Knowledge coverage rubric

Breadth is useful only when agents can make the right choice and verify it. Every applicable domain needs concept, decision criteria, mechanics, example, constraints, source/version, deliverable and QA check. Mark optional features not applicable to a particular demo; retain reference depth for later projects.

| Topic | Required decision and evidence |
|---|---|
| Architecture | Public routes, CMS editorial tree, composition and frontend components are distinct; trace one block across all four |
| Types and identities | Stable type keys/base types versus content-instance identity; separate copies, inline values and shared references |
| Properties | REST data type/format, required/localized/default, validation, groups, indexing and actual Graph shape |
| Shared fields | Selected SDK contracts, inheritance/composition limits, field collisions and schema-change impact; groups are not shared-field schemas |
| Visual Builder | Experiences, sections, components, eligibility, bounded display choices, blueprints and independently verified editor restrictions |
| Design system | Observed fonts/colors/spacing/breakpoints, reusable tokens, accessible interactions and source versus inferred behavior |
| Assets and links | Ownership, import/deduplication, crops, alt text, safe rich text and source-to-target internal links |
| Routing and delivery | Application/site/root, host/locale mapping, typed SDK/Graph retrieval, pagination, errors, redirects and SEO |
| Preview and freshness | Correct draft identity, authorization, hosted preview, public-cache isolation and publication timing |
| Lifecycle and permissions | Real actor rights, drafts/review/publish/schedule/expiry and environment boundaries |
| Localization and multisite | Shared/localized fields, locale resolution, missing translation and cross-site collision/cache tests |
| Taxonomy and personalization | Stable terms/filtering; variants distinct from audience evaluation, provider/consent/fallback requirements |
| Migration and recovery | Identity maps, dependency order, uncertain writes, concurrency, resumability and separate frontend/CMS recovery |
| Deployment | Host selection, build/runtime configuration, release identity, public/preview mapping, deployed QA and rollback |
| Orchestration | Exactly three roles, pending-run handling, revision scope, reused authorization and independent QA |

Use one full section walkthrough to connect modeling to delivery and editorial acceptance. Additional broader scenarios can cover multilingual/multisite, timed legal review, taxonomy and audience campaigns without making them mandatory first-demo scope. Explain concepts directly through Optimizely definitions, editorial behavior and verified API/SDK contracts. Keep terminology and examples focused on Optimizely.
