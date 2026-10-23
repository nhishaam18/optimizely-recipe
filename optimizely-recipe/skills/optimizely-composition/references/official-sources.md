# Official SaaS sources and qualification boundaries

Reviewed 2026-09-29 for recipe authoring. Runtime agents read the supplied summary relevant to their operation; this list is not a mandatory browsing sequence or permission for routine SDK reads.

| Source | Supports |
|---|---|
| [Content types](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/content-types-saas) | sectionEnabled / elementEnabled placement; property types and references |
| [Visual Builder configuration](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/configure-visual-builder) | Composition, display templates, copied/detached blueprints; SaaS UI/API blueprint examples |
| [Shared and inline blocks](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/blocks) | Shared instance lifecycle versus page-owned inline values |
| [Enable live preview](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/enable-live-preview-saas) | Application host, communication script, token-authorized draft access, overlays and refresh |
| [Applications](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/applications) | Application routing roots and host/preview settings |

SaaS concepts do not certify any installed SDK version or generated manifest. Preserve model-validator profile v4 from 1.4.4, including its partial-coverage limits. isList, component isRequired and component isLocalized corrections remain mandatory; the latter two are supported by reported CMS rejection, not a blanket reading of common property metadata. Version recipe/template/SDK/CLI/API/profile separately. Do not upgrade dependencies to match a recipe number.
