---
title: Defining Content Types (PaaS)
description: Use when explicitly comparing historical PaaS CMS 13 mechanics with SaaS; not for SaaS implementation.
---

# Defining Content Types (PaaS)

> Historical PaaS/CMS 13 snapshot. Source and version boundary applies to every mechanics/code block below: [comparison provenance](comparison-index.md). No mechanics here were reverified or compiled for 1.2.0; do not implement them in SaaS.

In Optimizely CMS PaaS, **content types** (page types, block types, media types) are defined as C# classes decorated with attributes from `EPiServer.DataAnnotations` and `EPiServer.Core`. During application startup the framework scans loaded assemblies for classes carrying `[ContentType]` and **synchronizes** them into the content-type database (`tblContentType`) — there is no separate build/deploy step to register a type. See [content-model-overview](../common/content-model-overview.md) for the shared page/block/media conceptual model across editions.

## Base classes

| Base class | Represents | Namespace |
|---|---|---|
| `PageData` | A page (routable, has a URL, sits in the page tree) | `EPiServer.Core` |
| `BlockData` | A reusable component with no URL of its own, placed in a `ContentArea` | `EPiServer.Core` |
| `MediaData` | A file-backed asset (documents, generic files) | `EPiServer.Core` |
| `ImageData` | A `MediaData` subtype specifically for images; adds thumbnail generation | `EPiServer.Core` |
| `VideoData` | A `MediaData` subtype for video files | `EPiServer.Core` |

A content type class inherits exactly one of these and is annotated with `[ContentType]`. Custom page/block base classes (e.g., an internal `SitePageData : PageData`) are a common pattern to share properties across many concrete types, but only concrete, `[ContentType]`-annotated classes become selectable types in the UI.

```csharp
using EPiServer.Core;
using EPiServer.DataAnnotations;
using System.ComponentModel.DataAnnotations;

[ContentType(
    DisplayName = "Article Page",
    GUID = "1f2e3d4c-5b6a-4321-9876-abcdef012345",
    Description = "A standard editorial article.",
    GroupName = "Content")]
public class ArticlePage : PageData
{
    [Display(Name = "Heading", Order = 10)]
    public virtual string Heading { get; set; }

    [Display(Name = "Main Body", Order = 20)]
    public virtual XhtmlString MainBody { get; set; }
}
```

## The `[ContentType]` attribute

Located in `EPiServer.DataAnnotations`. Key members:

| Property | Purpose | Default |
|---|---|---|
| `GUID` | Stable identifier linking the class to its database content-type record. **Required** in practice — without a fixed GUID, renaming/refactoring the class can orphan existing content. | `Guid.Empty` |
| `DisplayName` | Label shown in the CMS UI | `null` |
| `Description` | Explanatory text shown when editors pick a type | `null` |
| `GroupName` | Groups related types together in type-picker listings | `null` |
| `Order` | Sort order within a group | `100` |
| `AvailableInEditMode` | Whether editors can create instances of this type | `true` |

**Gotcha:** always set `GUID` explicitly to a fixed literal. If omitted, Optimizely generates one, and it can differ across environments/assembly rebuilds, breaking the link between code and existing stored content.

Two companion attributes:

- **`AccessAttribute`** — restricts who can *create* content of this type (`Users`, `Roles`, `VisitorGroups`). Without it, any editor with edit permissions may create the type.
- **`AvailableContentTypesAttribute`** — controls which content types are allowed as children/inside a `ContentArea` of this type, via `Availability`, `Include`, `Exclude`, `IncludeOn`, `ExcludeOn`.
- **`ImageUrlAttribute`** — sets the icon shown in content-creation dialogs via its `Path` property.

## `[PropertyDefinitionTypePlugIn]` — custom property types

To add a wholly new property data type (beyond the built-ins), implement a class deriving from `PropertyData` (or a more specific built-in property base) and decorate it with `[PropertyDefinitionTypePlugIn]`. This registers the type into the content-type/property-definition system the same way `[ContentType]` registers page/block types, making the property available in **Settings > Content Types > Properties** and to `[BackingType(typeof(...))]` on model properties. Built-in extensible base types include `PropertyBoolean`, `PropertyNumber`, `PropertyFloatNumber`, `PropertyPageType`, `PropertyPageReference`, `PropertyDate`, `PropertyString`, `PropertyLongString`, `PropertyCategory`, and `PropertyLinkCollection` — extend one of these rather than `PropertyData` directly when the storage shape matches.

```csharp
[PropertyDefinitionTypePlugIn(DisplayName = "Star Rating")]
public class PropertyStarRating : PropertyNumber
{
    // Override rendering/validation/serialization behavior as needed.
}
```

Associate a custom property type with a model property via `[BackingType(typeof(PropertyStarRating))]` on the `virtual` property, or select it as the property type when adding the property from the admin UI.

## Defining properties

Every property that should be editable and persisted **must be `virtual`** — Optimizely dynamically proxies content classes, and non-virtual properties won't be intercepted for change tracking, on-page editing, or lazy loading.

Property naming (CMS 13 constraint): `^[A-Za-z][_0-9A-Za-z]+$` — must start with a letter, contain only letters/digits/underscores, minimum 2 characters.

Common attributes placed on a property:

| Attribute | Purpose |
|---|---|
| `[Display(Name, Description, GroupName, Order)]` | Editor-facing label, help text, tab/group placement, and sort order (standard `System.ComponentModel.DataAnnotations`) |
| `[CultureSpecific]` | Marks the property as language-specific (see below) |
| `[Required]` | Editorial validation — value must be set before publish |
| `[DefaultValue(...)]` | Code-defined default value (admin-configured defaults, when present, take priority) |
| `[AllowedTypes(typeof(X), typeof(Y))]` | Restricts a `ContentReference`/`ContentArea` property to specific content types or contracts, improving type safety and enriching Optimizely Graph responses |
| `[UIHint(UIHint.Image)]` / other `UIHint` constants | Selects a specific editor UI for the property |
| `[IndexingType(IndexingType.Included \| IndexingType.Excluded)]` | Controls search indexing; replaces the removed `[Searchable(false)]` from earlier versions |

`GroupName` commonly uses the constants on `SystemTabNames` (e.g., `SystemTabNames.Content`) to place a property on a built-in editor tab, or a custom string to introduce a new tab/group.

```csharp
[ContentType(DisplayName = "Contact Block", GUID = "aa11bb22-cc33-dd44-ee55-ff6677889900")]
public class ContactBlock : BlockData
{
    [Display(Name = "Full Name", GroupName = SystemTabNames.Content, Order = 10)]
    [Required]
    public virtual string FullName { get; set; }

    [Display(Name = "Photo", Order = 20)]
    [UIHint(UIHint.Image)]
    [AllowedTypes(typeof(ImageData))]
    public virtual ContentReference Photo { get; set; }
}
```

**Gotcha:** `[AllowedTypes]` targeting a contract (an interface implemented by several content types) surfaces all implementing types in the picker and returns the full typed object from Optimizely Graph; targeting `ContentReference` with no restriction returns only a `contentLink` from Graph.

See [properties-and-property-types](../common/properties-and-property-types.md) for the current SaaS property decision guide.

## Language-specific properties

By default a property has a single value shared across all language versions of a content item. Decorate it with `[CultureSpecific]` (or set **Unique value per language** in the admin UI) to give each language its own independent value.

```csharp
[Display(Name = "Local Heading")]
[CultureSpecific]
public virtual string LocalizedHeading { get; set; }
```

Behavior:
- A property *without* `[CultureSpecific]` is editable only in the content's original/master language; it appears deactivated (with an original-language indicator icon) in other language versions' edit views.
- A property *with* `[CultureSpecific]` is independently editable in every activated language.

**Gotcha:** toggling this setting (in code, after content already exists, or via the admin UI) **deletes existing values** for that property across languages when switching away from culture-specific, and vice versa. Treat it as a one-time modeling decision, not something to flip casually post-launch.

## Content-type sync on startup

There is no manual "publish content type" step for code-defined types: on application start, Optimizely's initialization pipeline scans assemblies, finds `[ContentType]`-decorated classes (and `[PropertyDefinitionTypePlugIn]` classes), and creates/updates the corresponding rows in the content-type database, matching by `GUID`. Non-breaking changes (new properties, display metadata) sync automatically; changing a property's underlying type can require manual migration. Content types can *also* be created/edited from **Settings > Content Types** in the admin UI, but Optimizely's own guidance is to prefer defining types in code and treat the admin UI as read/adjust-only, because UI-only types aren't reproducible across environments and "changing page type settings can break the website."

**Gotcha:** if a NuGet package/assembly that registered a content type is removed without first deleting the type from CMS, the type becomes **orphaned** (`EPiServerException` at runtime, shown as base type "Undefined" in admin). Fix by either deleting the orphaned type (destructive — removes all its content instances) or deploying a minimal stub class with the same `GUID` to keep it resolvable while content is migrated off it:

```csharp
[ContentType(GUID = "YOUR_ORIGINAL_GUID_HERE", AvailableInEditMode = false)]
public class OrphanedBlockStub : BlockData
{
    // Stub only — no properties needed.
}
```

