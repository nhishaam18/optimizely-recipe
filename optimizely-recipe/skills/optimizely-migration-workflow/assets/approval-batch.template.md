# Proposed external change batch

- Batch ID / revision / artifact digest:
- Action (schema / assets / draft content / application settings / publish / frontend deploy):
- Tenant/environment or host/project:
- Resource IDs and existing versions; create/update distinction:
- User-readable before/after summary and affected pages/shared consumers:
- Preconditions and checks already passed; unchecked items:
- Exact commands/tool calls and effects (including implicit writes):
- Backup/version snapshot, recovery procedure and limits:
- Re-run/idempotency key and partial-failure handling:
- Exclusions:

## Decision receipt
Authenticated user / real decision reference / time / approved revision and scope / rejected or pending points. No agent may supply this decision on the user's behalf. Changes to destination, material effects or revision require renewed approval.

## Applied result
Actual operations, IDs, resulting versions, timestamps, readback and failures. Preserve successful receipts and resume only unapplied actions; never blindly replay a partly applied batch.
