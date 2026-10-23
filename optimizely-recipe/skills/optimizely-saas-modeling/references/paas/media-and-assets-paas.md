---
title: Media and Assets (PaaS)
description: Use when explicitly comparing historical PaaS CMS 13 mechanics with SaaS; not for SaaS implementation.
---

# Media and Assets (PaaS)

> Historical PaaS/CMS 13 snapshot. Source and version boundary applies to every mechanics/code block below: [comparison provenance](comparison-index.md). No mechanics here were reverified or compiled for 1.2.0; do not implement them in SaaS.

> **Note on source coverage:** the official docs treat this as a fairly thin topic compared to content modeling and presentation — there is no single deep "media API reference" page. This file is assembled from the dedicated media-types/media-management pages plus incidental mentions on content-modeling pages; class members not explicitly confirmed in the fetched docs are not asserted here.

## Media content types

A **media type** is a content type whose properties describe a file-backed asset; a **media** is an instance of the .NET class implementing that type. As with pages and blocks, during startup Optimizely scans assemblies for classes decorated with `[ContentType]` that inherit from a media base class, and syncs them into the content-type database — see [defining-content-types-paas](defining-content-types-paas.md) for the general mechanism.

| Base class | Use for | Notes |
|---|---|---|
| `MediaData` (`EPiServer.Core`) | Generic files (PDF, Word, any binary) | Base for all media types |
| `ImageData` (`EPiServer.Core`) | Images | Displays a thumbnail in the Media folder listing; supports the `ImageDescriptor` attribute for generated scaled versions |
| `VideoData` (`EPiServer.Core`) | Video files | Same folder/thumbnail treatment as images where supported |

```csharp
[ContentType(DisplayName = "GenericMedia",
    GUID = "89761dbb-bf22-4cee-93c7-9d661d75cad8")]
[MediaDescriptor(ExtensionString = "pdf,doc,docx")]
public class GenericMedia : MediaData
{
    [Display(Name = "Description", GroupName = SystemTabNames.Content)]
    public virtual string Description { get; set; }
}
```

```csharp
[ContentType(DisplayName = "VideoFile",
    GUID = "f2285e5a-be15-47b6-8952-e3c61deaefd2")]
[MediaDescriptor(ExtensionString = "flv,mp4,webm")]
public class VideoFile : VideoData
{
    [UIHint(UIHint.Image)]
    public virtual ContentReference PreviewImage { get; set; }
}
```

### `MediaDescriptor`

Associates a media content type with the file extensions it handles, via `ExtensionString` (comma-separated, e.g. `"pdf,doc,docx"`). **Gotcha:** omitting the extension list maps the content type as a wildcard valid for *all* extensions — only do this for a genuinely generic fallback type, since it will compete with more specific media types for extension matching.

### `ImageDescriptor`

Applies to a BLOB-typed property on an `ImageData`-derived type; when that property is `null`, the system generates a scaled thumbnail/version from the content's binary data (`IBinaryStorable.BinaryData`) automatically.

## File storage and handling

Media content stores its binary payload as a BLOB, accessed through `IBinaryStorable.BinaryData`. Content extraction (e.g., for search indexing) happens at **upload time**, not at indexing time.

**Upload size limit** (default ~30 MB) is configured in `appsettings.json`:

```text
"EPiServer": {
  "CmsUI": {
    "Upload": {
      "FileSizeLimit": 104857600
    }
  }
}
```

**Custom media handling / response customization** (e.g., setting response headers for PDFs) is done by registering an `IStaticFilePreProcessor` implementation:

```csharp
services.Configure<MediaOptions>(o =>
    o.AddPreProcessor<PdfStaticFilePreProcessor>());
```

For fuller custom control over how a media request is served, define a custom endpoint template decorated with `[TemplateDescriptor(Inherited = true, TemplateTypeCategory = TemplateTypeCategories.HttpHandler)]` (see [presentation-paas](presentation-paas.md#templatedescriptor)) — `IStaticFilePreProcessor` is the lighter-weight option for simple response tweaks.

## Asset organization

Media/asset folders are represented by `EPiServer.Core.ContentFolder` (an organizing container with no rendering of its own):

- **`GlobalAssetsRoot`** — shared media available across all sites in a multi-site installation.
- **`SiteAssetsRoot`** — media scoped to a single site.
- Editors also get per-content **"For This Page"/"For This Block"** local folders, used automatically when a file is dragged directly onto a page/block's content-area editor rather than uploaded via the Assets panel.

Editorial access rights on these folders (Create/Publish) gate upload and publish behavior; auto-publish on upload is disabled wherever approval sequences or projects are active on a folder. **Gotcha:** automatically published media is indexed by search engines and publicly discoverable immediately — sensitive files uploaded with auto-publish enabled are not private by default.

Media participates in the same versioning system as pages/blocks (tracked and restorable via the Versions gadget), and renaming preserves internal CMS links while breaking any external links to the old URL.

## Digital Asset Management (DAM) integration

CMS 13 offers three distinct ways to connect to a digital asset management system; these are integration/UI choices rather than content-modeling APIs:

| Approach | Description | PaaS/on-prem support |
|---|---|---|
| **Embedded DAM** | DAM library embedded directly in the CMS UI via Optimizely Graph sync; browse/filter/manage folders, tags, renditions without leaving CMS | Requires a DXP environment — **not supported on-premises or on HIPAA environments** |
| **Content Manager** | Source-agnostic asset picker spanning Optimizely CMS, Optimizely DAM, external DAMs (Aprimo, Bynder), and commerce platforms; DAM-specific metadata (folder hierarchy, tags) is not surfaced, sources appear flattened | Supported |
| **DAM asset picker** | Dedicated pop-up/tab picker window with full DAM folder/tag/filter support; requires developer installation and a picker-launch button | Marked as **being retired** in favor of the other two |

For an on-premises/PaaS CMS 13 install specifically, Embedded DAM is unavailable, so asset-source integration is done through **Content Manager** or the (legacy) **DAM asset picker**. General setup steps referenced by the docs: configure Opti ID, enable Optimizely Graph, update content models if using Visual Builder, and migrate media assets if moving from local media to Embedded DAM.

See [content-model-overview](../common/content-model-overview.md) for how media/asset content types fit into the broader content model shared with the SaaS edition.

