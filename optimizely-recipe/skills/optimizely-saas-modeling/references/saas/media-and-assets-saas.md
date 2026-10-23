# SaaS assets, image semantics and delivery

## Identity and ownership

An asset has binary identity, editorial metadata and usages. A Hero occurrence has contextual image meaning. Keep source URL, owner/license provenance, checksum, dimensions, MIME type and target content key in the asset manifest. Duplicate files can share one binary when ownership permits, while separate usages keep their own alt text and crop intent.

Screenshots are evidence of appearance, not necessarily reusable source assets. Prefer authorized originals; record substitutions. Do not infer a license or treat a remote URL as permission to republish.

## Upload mechanics

Source boundary: [Manage media using REST](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/manage-media-using-the-rest-api), checked 2026-09-18, CMS REST v1. Documented upload uses multipart `POST /v1/content` with `content` JSON and `file` binary parts; the model needs a supported media type and actual container. A JSON-only content request is not a binary upload. Verify accepted extensions and current request limits before batching; no upload was performed for this bundle.

Read back both content identity and media metadata. Verify the returned public/draft URL through the same delivery path the frontend uses. Do not store an administrator download URL as the public image URL.

## Alt text, crops and locale

Proposed policy: meaningful images have contextual equivalent text on the consuming component; decorative images have intentional empty alt text. Asset-global captions/credit can remain on the asset. Text baked into an image may require separate localized binaries even when the asset model itself is not language-branched.

Define aspect ratio and crop per placement. A reused wide photo may need a different mobile crop. Treat focal point/transformation support as a capability to verify, not a field to invent. Where unsupported, prepare approved variants and model their selection explicitly.

A restricted image picker does not prove delivery includes dimensions, URL and metadata. Inspect a real Graph result and use the pinned SDK's supported image path. See [Graph](content-graph-and-delivery-api-saas.md).

## Import and replacement behavior

Hash candidates before creating them; use the manifest to resume after uncertain upload responses. File names are not unique keys. A changed source binary at the same URL is a change, not a deduplication match. Decide whether to version the existing asset or create a new one based on sharing impact and recovery needs.

After replacement, retest every shared usage and cache layer. A frontend rollback cannot restore a replaced CMS asset. Preserve previous content/version identifiers in the change manifest.

Output: asset manifest, usage/crop/alt matrix and unresolved licensing or delivery items. QA checks dimensions, crop, responsive quality, keyboard-linked images, alt text, missing binaries, public access and shared replacement impact.
