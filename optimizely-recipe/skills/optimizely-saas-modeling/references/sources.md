# Modeling source ledger

Checked 2026-09-18. CMS sources target documentation namespace v1.0.0-CMS-SaaS and REST v1; Graph sources target the current platform guide. SDK links point to moving main and include v3-era guidance. No exact SDK package/commit, OpenAPI snapshot or tenant is qualified by these checks. Pin those in the project's version record before execution.

The following official primary sources were opened or inspected in this revision. “Checked” means documentation/source reading, not a successful request, build or editor test.

| Source | Inspected concern | Boundary |
|---|---|---|
| [SaaS overview](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/overview-saas) | Managed headless CMS, model and delivery responsibilities | Architecture, no client provisioning verified |
| [Content types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-saas) | Base types, properties, required/localized, constraints, indexing | Concept guide; conflict with tutorial noted below |
| [Create type API](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/contenttypes_create) | Type resource, contracts, creation rights, composition field | Expanded nested OpenAPI fields not captured |
| [Manage types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-content-types-using-the-rest-api) | POST/PATCH/read, immutable key/base type | Tutorial contains conflicting property flag examples |
| [SDK modeling](https://github.com/episerver/content-js-sdk/blob/main/docs/3-modelling.md) | contentType, contract, extends, relationship constraints, rich-text behavior | Moving main, uncompiled; default indexing disagreement |
| [SDK experiences](https://github.com/episerver/content-js-sdk/blob/main/docs/8-experience.md) | Experience composition, section/element eligibility, rendering | Does not prove locked editor layout |
| [SDK display settings](https://github.com/episerver/content-js-sdk/blob/main/docs/9-display-settings.md) | displayTemplate, target, settings/choices and registration | Illustrative declarations need exact package verification |
| [Visual Builder concepts](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/get-started-with-visual-builder) | Outline, sections, reorder, blueprint concepts | Actual editor controls untested |
| [Content-admin types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-content-admins) | Section/element enablement and complex nested blocks restriction | Do not generalize to every property combination |
| [Property schemas](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/property-schemas-saas) | Graph Link, ContentReference and ContentUrl representations | Delivery shapes are not management payloads |
| [Graph modeling](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-modeling-saas-graph) | Indexing intent, component property shape, SearchIndexer Read on items | Actual indexed schema/data unqueried |
| [Graph authentication](https://docs.developers.optimizely.com/platform-optimizely/docs/authentication) | Public, restricted and administrative modes | Actual tenant access/preview integration untested |
| [Media REST](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-media-using-the-rest-api) | Multipart content/file upload and versioned media | No binary uploaded; current size/extension limits require target check |
| [Content REST](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-content-using-the-rest-api) | Initial versions/value wrappers, status transitions and concurrency | Example identities are fictional; no import/publication performed |
| [Import/export](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/import-and-export-data) | Manifest versus data packages, experimental packaging | No broad import or data-loss override authorized by this guide |
| [REST authentication](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/reference/authentication-and-authorization) | OAuth client credentials, bearer, API client rights | No credentials retrieved or tenant authenticated |
| [Access rights](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/access-rights) | Editorial rights/inheritance concerns | Roles and actual rights remain tenant-specific |
| [Applications](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/applications) | Root, hosts and preview configuration | No environment/hostname configured |
| [Languages](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/languages) | Content languages and access context | Available branches/fallback must be tested |
| [Taxonomies](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/taxonomies) | Category URI references, term documents, visibility, label fallback | No live filter/query executed |
| [Graph variations](https://docs.developers.optimizely.com/platform-optimizely/docs/content-variation) | Variation delivery | Does not provide an audience selector automatically |
| [Feature Experimentation integration](https://docs.developers.optimizely.com/feature-experimentation/docs/configure-optimizely-cms-saas) | Separate provider-to-variation selection | Optional product dependency, not assumed enabled |

## Reconciliation decisions

The default REST examples use `required` and `localized` from the type concept reference. The management tutorial still shows prefixed alternatives. The visible API page did not expose the nested property schema sufficiently to settle accepted aliases. Preserve this disagreement and confirm against target OpenAPI plus readback before claiming payload validation.

For indexing, the CMS REST/Graph description and SDK main default wording differ. The recipe specifies indexing intent and requires inspection of actual SDK output; it does not treat the two defaults as interchangeable. Property visibility in an editor is not Graph exclusion.

For composition, the type API exposes a canvas `composition` object, and docs describe section/element flags plus nesting limitations. Exact controls for an approved-only editor workflow remain a qualification item. No lock-layout property was invented.

Some attempted abbreviated documentation/Markdown URLs did not resolve through the browser tool; they are not cited as supporting evidence. The versioned content-type and Visual Builder links above were used instead. No inaccessible page was replaced with a product homepage and called verified.

## Next project checks

Capture a dated/versioned OpenAPI schema, exact SDK/starter/package pins, generated definition diff and target readback. Test the Hero field/locale behavior and section eligibility, then actual editor restrictions. Inspect Graph data with public and preview identities. Complete the deployed path and independent QA before promoting any example to tenant-verified.

Historical PaaS content has separate provenance in the [comparison index](paas/comparison-index.md); none of its mechanics was refreshed as SaaS evidence.

## 1.3.0 pinned implementation study

The [SDK source ledger](sdk-source-ledger.md) records commit, package manifests, sample/template connections and implementation/documentation conflicts checked on 2026-09-22. The shared glossary and code-first recipe take precedence over earlier generic SDK prose at those specific boundaries.
