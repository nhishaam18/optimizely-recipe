# Field worksheet

Use this compact worksheet while filling the [migration contract](migration-contract.md); consult the [property guide](common/properties-and-property-types.md) for decisions. It is a project record, not an API payload.

| Field | Meaning/editor | REST or SDK type | Required/locale | Validation | Indexing intent | Empty/broken behavior | Delivery/renderer |
|---|---|---|---|---|---|---|---|
| Hero.heading | Main section message | string | Required, selected locale | Approved text rule | Searchable only if needed | Editorial failure | Heading selected by query |
| Hero.image | Asset identity | constrained reference | Optional by design | Image target | Delivered | Text-only layout | Resolve actual Graph asset shape |
| Hero.imageAlt | Contextual equivalent | string | Localized | Paired with meaningful image | Delivered | Decorative policy or defect | HTML alt |
| Hero.ctaLabel / ctaUrl | Action and destination | string / url | Pair policy | Rewrite internal targets | Delivered | Omit incomplete action; flag in QA | Accessible link |
| Hero alignment | Presentation choice | display setting | Safe renderer default | Approved choices | Not a content search concern | Default alignment | Class/token mapping |

Values above are proposed decisions, not universal requirements. Remove fields absent from the evidence; add only approved semantics. Do not make alignment a semantic content field merely because it is a string.

Check three layers independently: the schema accepts/rejects a value; the editor can perform the intended operation; the frontend handles delivered data correctly. Tenant capabilities and SDK version determine how much can be enforced in each layer.

For supported SDK option placement, arrays and ownership rules use the [supported modeling contract](supported-model-contract.md) during preparation; embed only the relevant pattern in each component handoff. Add explicit default/conditional-rule enforcement locations and a current model-validation command. Do not treat documentation completeness as executable schema validation.
