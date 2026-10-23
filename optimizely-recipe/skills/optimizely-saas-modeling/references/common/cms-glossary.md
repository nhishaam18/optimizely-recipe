# Shared Optimizely CMS vocabulary

Consult this during initial preparation or for an unresolved term as Orchestrator, Developer or QA. Reuse recorded understanding; this is not a prerequisite to each implementation task. Target: CMS SaaS with the official JavaScript SDK. CMS 12/13 .NET implementations are outside this execution path. Checked 2026-09-22; SDK terminology is tied to the [source ledger](../sdk-source-ledger.md).

| Term | Meaning and practical consequence |
|---|---|
| CMS instance / tenant | The authoring and management destination. Record the actual tenant and environment before a write; an application inside it is not an isolated database or permission boundary. |
| Application | CMS configuration connecting an entry-point content item, hosts and preview settings. A tenant can serve several applications. It is not the Next.js repository, deployment, API key or content type. |
| Entry point / start page | A content **instance** used as the application's routing root. In SDK bootstrap config, `entryPoint` can refer to a `content[].key` alias that the CLI resolves to a CMS content reference. |
| Host / authority | Hostname plus optional port, without scheme or path. Scheme and locale are separate settings. Next.js hosting, DNS and the CMS host mapping must agree; creating an application does not deploy a website. |
| Content type / definition | The reusable schema: stable key, base type, fields, labels and constraints. `MigrationHero` describes many Hero instances. |
| Content item / instance | Actual authored content with its own identity. Reusing a type does not share values. Decide deliberately whether pages reference one shared instance or own independent instances. |
| Content version and locale | A particular revision/language of an item. Draft, preview and published delivery are distinct states. A successful type push creates neither complete translations nor a published site. |
| Property / field | One schema entry and its values, such as heading, image or CTA. Requiredness, localization, length and indexing are explicit model decisions. |
| Contract | Reusable field definitions applied through SDK `contract()` / `extends`. It shares schema, not one content instance. A contract has no page renderer or routable identity of its own. |
| Property group | Editor organization of fields into tabs/groups. A group named SEO does not define SEO fields or enforce shared schema. |
| Content tree | Ownership/container hierarchy. It can differ from URL routes and from Visual Builder layout. `mayContainTypes` controls child content creation; it is not a canvas allowlist. |
| Composition | Stored ordered layout nodes for an experience/section. Render stored node identities and order; do not reconstruct the layout from DOM screenshots at runtime. |
| Visual Builder | Editorial UI for composing supported experiences, sections and elements. API definitions, renderer coverage and editorial restrictions all need verification. |
| Section vs element | A section is a movable layout/content unit; an element is placed inside a composition structure. A screenshot rectangle does not automatically deserve either a new type or independent editing. |
| Display template / display settings | Definitions of approved presentation choices and the selected values, separate from content fields. Map choices to implemented styles; they are not raw arbitrary CSS. |
| Blueprint | An editorial starting pattern for creating experiences/sections. It is not a TypeScript type, SDK project template or evidence that future instances share content values. Verify actual tenant behavior. |
| Graph | Read/query delivery layer with indexing and schema derived from CMS. Management success, Graph visibility and frontend freshness are separate checks. |
| Management API / CLI | Tools for schema, content and application changes. Their credentials and authority differ from a public delivery key. |
| SDK registry | Runtime mapping for models, display templates or React renderers. Registering a model in memory does not install it in the CMS. |
| Configuration manifest | Serialized schema/display/property-group payload produced from code. The CLI also has application/content/locale operations outside that manifest. |

## Content families and how to choose

| Base type / concept | Typical use | Decision rule |
|---|---|---|
| `_page` | Article, product or other structured route | Use when a defined page renderer owns layout and fields. |
| `_experience` | Landing page with Visual Builder composition | Use for the agreed editor experience of adding/reordering approved sections. |
| `_component` (block) | Hero, card, CTA, reusable editorial unit | No independent page URL by default. Can be embedded as an owned `component` property or referenced as an independent item. |
| Section-enabled `_component` | A complete Hero or Cards strip moved as one unit | `compositionBehaviors: ['sectionEnabled']` provides eligibility, not the full allowed-section policy. This is the default demo pattern. |
| Element-enabled `_component` | A heading/button/image inside a flexible section | Use `elementEnabled` only when this editing freedom is required. Do not expose every visual primitive automatically. |
| `_section` | Structural grid section containing rows, columns and elements | Present in Stride; it needs structural renderers and preview identity handling. The SDK calls this internal; do not make it the universal business-block base type. Qualify against the tenant. |
| `_image`, `_video`, `_media` | Image, video and other managed files | Keep original media identity and contextual alt/crop decisions; media references are not arbitrary strings. |
| `_folder` | Content organization | A container, not a routable content page or a substitute for a rendered section. |

## Cross-role use

- Orchestrator asks which application, root, hosts, locales and editor freedoms are in scope, then records the model decision and implementation dependencies.
- Developer chooses types and relationships from editorial ownership and reuse, produces code/configuration and maps every approved type to rendering.
- QA verifies meaning in the product: editing one independent Hero does not change another; shared content changes where intended; type constraints, locale, draft isolation and stored order work in the CMS and deployed site.

Sources: [CMS applications](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/applications), [CMS content types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-saas), pinned SDK/model/template files in the [ledger](../sdk-source-ledger.md). Application-specific asset organization is not a substitute for permission checks. See [architecture](../architecture.md), [lifecycle](workflows-and-versioning.md) and [multisite/localization](multisite-and-localization.md) for detailed execution rules.
