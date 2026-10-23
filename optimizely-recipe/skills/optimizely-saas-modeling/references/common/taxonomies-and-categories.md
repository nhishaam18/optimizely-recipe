# SaaS taxonomy and classification

## Decide whether classification is needed

Taxonomy gives content stable, shared classifications for filtering, search or navigation. It is not a composition tree, a React variant tag or a Commerce catalogue. A small approved display choice belongs in display settings; an editorial Topic used across many articles may deserve taxonomy.

Define the term owner, stable key, localized labels, hierarchy, assignment policy and intended public filters. Do not infer a full taxonomy from a few visible navigation labels. Navigation can be deliberately curated independently of classification.

## Graph mechanics

Source boundary: [Taxonomies in Graph](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/taxonomies), checked 2026-09-18, SaaS/Graph documentation; not queried on a tenant.

Content category assignments use URI references in `_itemMetadata.categories`; term labels/details are separate `_TaxonomyTerm` documents. Visible categories are indexed on content. The source says both Public and Internal usage values can be queried, so “Internal” is not a secrecy guarantee. It also describes missing translated labels without automatic master-language fallback. Verify the selected query's locale result and handle missing labels deliberately.

Illustrative category identity: `cms://taxonomy/categories/sustainability`. Treat that as an example, not an existing term. Build the real filter from stored keys, not translated labels. Inspect the tenant's query operators and schema before constructing the final GraphQL.

## Evolve without breaking consumers

A renamed label should not force every content assignment to change. If restructuring requires new term identities, retain a mapping and update assignments/filters together. Check actual API move/delete constraints before planning the operation; this guide intentionally does not repeat old numeric limits or claim all category parents are movable.

For a Topic filter, verify three independent facts: the item has the intended assignment; Graph includes it; the frontend maps it to the correct label and result set. A missing translated label is not necessarily a missing item. An empty filter result could instead be publication, locale or indexing.

Output: term dictionary, source-to-target map, hierarchy and affected filters. QA covers unassigned content, multiple terms, renamed labels, missing translations, hidden categories and a filter with no results. Do not create taxonomy when the migration has no classification requirement.
