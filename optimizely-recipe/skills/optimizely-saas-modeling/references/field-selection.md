# Field selection and ownership

Use this contract when creating/reviewing models. QA records observed content/formatting in annotation; Developer proposes types; Specialist checks editor/tenant behavior; the user approves semantic changes. Field names such as subtitle, description or body do not determine storage type.

| Editorial requirement | Candidate semantic type | Record / verify |
|---|---|---|
| Literal short or multiline copy with no authored formatting | string | Multiline editor support must be qualified; CSS line-wrap is not rich text |
| Authored emphasis, paragraphs, inline links or lists | richText | Allowed formatting/editor preset, rendering and sanitization policy; do not strip HTML just to simulate plain text |
| Navigation/CTA | link or suitable URL/reference structure | Label, destination, target and accessibility; not unrelated free-text URLs by default |
| Image/media | supported media reference with alt/crop fields where owned | Exact type constraints and delivered asset mapping |
| Finite variant/category | supported enum/format | Approved choices/default and whether editor or renderer enforces |
| Count, amount, date, toggle | appropriate integer/float/dateTime/boolean | Units, precision, range and locale display; don't infer numeric storage for formatted identifiers |
| Repeated structured values | array with supported items | Owned items versus shared references, cardinality and order |
| Fixed structured child | component | Approved target; omit isRequired/isLocalized on component itself; child fields declare supported rules |
| Globally reused content | shared content reference | Lifecycle, affected consumers and draft/public behavior; not copied inline values |

Do not change existing property types in-place merely to improve semantics. Inventory real data and consumers; propose migration/new-property mapping with backup and approval where necessary. Screenshot appearance alone does not establish requiredness, sharing, localization or permissions. Distinguish observed vs proposed vs approved.

Every field table includes understandable type, reason, example value, required/optional, localization, validation/default, editing control, ownership and source element IDs. Technical table adds exact SDK definition and delivery mapping. A rich-text field needs a formatting rationale. A shared content model's changes require reviewing every relevant consumer.

isList is unsupported: lists use type array with items. Component isRequired and isLocalized must be absent, including false. Array-container and item metadata differ. Use current supplied validation matrix/profile; not all common metadata applies to every property type. Scope unsupported rules explicitly rather than inventing SDK fields.
