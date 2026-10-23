# Model and composition decision

Revision / scope / source evidence / owner / approval reference:

## Four structures

Record public routes, CMS content tree, composition tree and frontend component tree separately with explicit mappings, site/locale roots and shared settings.

| blockId / occurrenceId | Editorial meaning | Type key / base type | Shared/local/reference | Fields/validation | Composition/styles | SDK query / renderer | QA requirement |
|---|---|---|---|---|---|---|---|

For each field record API/SDK layer, type/format, required/localized/default, constraints, allowed references, editor group, indexing intent and empty/long-value behavior. For each shared-field contract record consumers and change impact. For each instance record owner, source key, target identity and lifecycle.

Record eligible types, section ordering/freedom, display choices, breakpoints and image crop/alt ownership. Distinguish CMS-enforced controls, frontend enforcement and editorial conventions; verify required constraints in the target tenant.

Link expected QA tests and evidence. Label inference and missing inputs. Preserve accepted requirements for corrections within scope; revise affected decisions when editorial behavior or model semantics change.

## Code-first implementation record (filled as work executes)

Local implementation begins from the approved semantic fields, identities and composition above. Export paths, commands, manifest and readback below are implementation outputs, not additional approval prerequisites. Mark not-yet-generated evidence pending; missing tenant evidence blocks synchronization/acceptance only. Reuse the task checkpoint for SDK qualification.

- Source revision and exact installed SDK/CLI/template versions:
- Model file paths, export names, stable keys and chosen ownership/base types:
- Configuration path and discovery globs; expected discovered keys/duplicate check:
- Field flag representation and emitted validation/locale constraints:
- Runtime model/display/React registry entries and renderer paths:
- Manifest path/hash and tenant comparison/readback:
- Separate locale, bootstrap content, application/entry-point/host/preview change plan:
- Commands/exits; local versus authentication versus tenant verification results:
- Partial-operation checkpoints and recovery; blocked editorial capabilities:
- Independent QA tests for invalid input, owned/shared values, references and ordering:
