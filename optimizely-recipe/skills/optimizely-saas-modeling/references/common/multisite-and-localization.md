# SaaS applications, routes and localization

## Keep site, environment and language separate

An application describes a frontend's root, host and preview configuration. A tenant/environment is a provisioning boundary. A locale is a content dimension. Creating a brand or language does not automatically require a new tenant.

Source boundary: [Manage applications](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/applications), checked 2026-09-18, SaaS v1.0.0-CMS-SaaS. It describes application roots, hostnames and preview. Actual application configuration and host ownership remain unverified.

Produce a route matrix before import:

| Application | Root key | Public host | Preview host/path | Locale policy | Content identity | Public route |
|---|---|---|---|---|---|---|
| Demo site | Recorded from tenant | Approved deployment host | Pinned SDK preview route | e.g. explicit en | Landing key | / |
| Demo site | Same root | Same host | Same preview integration | Same policy | Campaign key | /campaign |

These are worksheet labels, not provisioned identifiers. Resolve route collisions using application/root and locale context. Decide canonical redirects and trailing-slash policy once; rewrite source internal links through that map.

## Field and locale ownership

Localized fields vary by branch; shared fields intentionally keep one value. The right choice follows editing needs. Product codes may remain shared while headings and alt text vary. Asset binaries may require separate localized variants when they contain text.

Source boundary: [SaaS languages](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/languages), checked 2026-09-18; version-specific UI/available locales must be checked in the tenant. Configure the required languages before creating their content. The content-model property `localized` decision and a frontend locale selector are separate concerns.

Use one content identity with its supported language branches when semantics are the same. Separate sites or items can be appropriate where ownership, structure or business meaning differs; document why. Do not create duplicate records merely because import runs once per locale.

## Missing translation and fallback

Define the desired result for a missing translation: explicit fallback, untranslated placeholder behavior, redirect or unavailable route. Verify where the selected CMS/Graph/SDK applies fallback; do not import PaaS resolution chains into Next.js. Keep query, rendered lang attribute, navigation and canonical metadata consistent.

A page using French text with English links or shared cached English content is not a passing locale test. Cache keys must preserve all rendering dimensions. Taxonomy label fallback can differ from content fallback; see [taxonomy](taxonomies-and-categories.md).

Output: application/route matrix, field locale decisions, branch map and fallback rules. QA tests same slug across sites, missing locale, cross-language links, shared navigation, preview selection and localized long-copy layout. Use actual configured behavior rather than inherited numeric locale limits.
