# SDK qualification — compact preparation record

- Recipe release (recipeVersion, provenance only):
- SDK package name / resolved version / repository evidence path:
- CLI package name / resolved version / repository evidence path:
- Lockfile/package fingerprint:
- Relevant existing model/renderer/config pattern paths:
- Pattern's verified SDK version and actual check/result:
- Unsupported API/property, concrete evidence and affected operation (if any):
- Independent next edit/check:
- Lookup/correction already resolved; reuse on resume:

Recipe and SDK versions occupy different namespaces. Recipe 1.3.6 with SDK 2.2.0 is not a compatibility blocker. Different SDK example and installed SDK versions need a compatible existing pattern or a scoped unresolved mapping, not an automatic upgrade. Metadata alone does not qualify APIs. Reuse an existing record; do not make a duplicate qualification document an implementation prerequisite. Routine dependency reads remain prohibited; follow the concrete-error-only lookup policy during implementation.
