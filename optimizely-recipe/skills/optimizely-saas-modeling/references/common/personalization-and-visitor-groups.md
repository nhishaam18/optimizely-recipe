# SaaS variations and personalization boundaries

## Separate the content variant from its selector

A variation stores alternative content. Personalization determines which visitor receives it. An experiment adds assignment and measurement rules. A screenshot of one variant establishes none of the selection logic, audience source or consent behavior.

For ordinary reconstruction, deliver the agreed baseline. Add personalized behavior only when scoped. Record audience/provider, content variation identity, allocation/selection rule, fallback, consent assumptions, caching and QA identities. Do not port PaaS Visitor Group classes or .NET configuration into Next.js.

## Documented delivery mechanic

Source boundary: [Graph content variations](https://docs.developers.optimizely.com/platform-optimizely/docs/content-variation), checked 2026-09-18, current Graph guide; no integration executed. It documents querying content variations for delivery. The separate [Feature Experimentation integration](https://docs.developers.optimizely.com/feature-experimentation/docs/configure-optimizely-cms-saas), also checked 2026-09-18, illustrates a provider selecting a CMS variation. It does not establish that this client's tenant owns or enables that product.

Use the selected provider/SDK's exact variation selector. Keep stable base content identity, locale and variation identity separate in the delivery contract. Do not guess that a variant is a new page route or that Graph automatically chooses an audience.

## Model an example before integration

Suppose an approved Hero has baseline and returning-customer copy. Reuse the Hero schema. Document which fields vary, who edits them and which content versions are published. The frontend must receive a deterministic selection or fall back to baseline. A failed provider request should not make the whole page disappear.

Cache design follows the selection. A public shared cache containing one visitor's personalized result can show it to others. Choose an appropriate partitioned/private strategy and test two identities in sequence. Do not pass identifying visitor information through query strings or evidence logs unnecessarily.

## Acceptance and change control

A useful QA matrix names the visitor context, expected selector output, selected content identity, locale, fallback and analytics outcome. Test baseline, each scoped audience, unknown visitor, missing/unpublished variation and provider failure. Separate content rendering proof from experiment measurement proof.

Output: variation map, selector contract, integration dependency and fallback/cache tests. Report unavailable provider access as blocked; visual similarity alone cannot certify personalization.
