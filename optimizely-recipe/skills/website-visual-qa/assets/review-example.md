# Example review - Course teaser C07 - revision 2

Illustrative example only; not a required component or actual project finding.

**What it is:** A card linking to a course detail page. Three cards use the same design with different course content. The approved screenshot reference would be linked here. The card's own content is independent; the site header is shared content managed separately.

**What changed:** Changed the summary proposal from rich text to plain text because editors need literal copy with no inline formatting. The legal note keeps formatted text because it contains an inline policy link.

| Field | Meaning/example | Proposed type and reason | Required / localized | Editor rule |
|---|---|---|---|---|
| Course name (`title`) | Introduction to Design | Plain text: literal name | Yes / yes | Proposed 100-character limit; confirm before approval |
| Summary (`summary`) | Learn practical design methods. | Plain text: no authored formatting | No / yes | Visual wrapping handled by CSS |
| Legal note (`legalNote`) | Refund terms with a policy link | Rich text: inline link is required | No / yes | Limit toolbar to approved formatting if supported |
| Tuition (`tuition`) | 250 | Number: must support numeric ordering | No / no | Currency is separate; precision/range confirmed before implementation |
| Destination (`link`) | Course details page | Link: structured destination | Yes / yes | Internal/external behavior explicit |
| Picture (`image`) | Course illustration | Media reference | No / no | Alt text owned by this card when usage-specific |

**Reuse:** One component definition, multiple owned instances. It is an element inside a CourseGrid, not a free-standing page section by default. Editors may reorder cards in the grid; page-wide header placement stays fixed. These are proposals until approved and enforcement is verified.

**Review needed:** Confirm title limit, numeric tuition/currency policy and optional image behavior. No screenshot, CMS validation or approval is claimed by this illustrative example.

**Technical section:** In a real component document, follow this readable summary with the complete supported model definition, annotation IDs, exact repo paths, supplied SDK snippet, renderer mapping and scoped checks. Do not generate implementation from this example.
