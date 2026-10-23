---
title: Presentation (PaaS)
description: Use when explicitly comparing historical PaaS CMS 13 mechanics with SaaS; not for SaaS implementation.
---

# Presentation (PaaS)

> Historical PaaS/CMS 13 snapshot. Source and version boundary applies to every mechanics/code block below: [comparison provenance](comparison-index.md). No mechanics here were reverified or compiled for 1.2.0; do not implement them in SaaS.

Optimizely CMS PaaS renders content through ASP.NET Core MVC/Razor. A **template** is any registered component (controller+view, Razor Page, view component, or endpoint) capable of rendering a content instance; the framework's `TemplateResolver` picks which template applies for a given content item, rendering mode, and context. See [content-model-overview](../common/content-model-overview.md) for how content types relate to their templates conceptually.

## Rendering pages: controllers and views

Page controllers inherit from `EPiServer.Web.Mvc.PageController<T>` (or the more general `EPiServer.Web.Mvc.ContentController<T>`), where `T` is the page's content-model type, and live in a **Controllers** folder:

```csharp
public class ArticlePageController : PageController<ArticlePage>
{
    public IActionResult Index(ArticlePage currentPage)
    {
        return View(currentPage);
    }
}
```

The matching view lives under `Views/ArticlePage/Index.cshtml` (standard MVC convention) or is located via the `[TemplateDescriptor]` attribute / `IViewLocationExpander`. Implementing `EPiServer.Web.IRenderTemplate<T>` — which these base classes do for you — is what makes the controller auto-register as a template candidate.

An alternative is **Razor Pages**: a page model inherits `EPiServer.Web.Mvc.RazorPageModel<T>`, split into `.cshtml` (markup) and `.cshtml.cs` (code-behind), giving the current content via `RazorPageModel<T>.CurrentContent`.

## Rendering blocks: view components and partial views

Blocks (`BlockData`) render either as:

- **View components** — a class inheriting `EPiServer.Web.Mvc.BlockComponent<TBlockData>` (or `AsyncBlockComponent<TBlockData>`), placed in a **Components** folder, with its view at `Views/Shared/Components/{ComponentName}/Default.cshtml`.
- **Convention-based partial views** — a `.cshtml` file under `Views/Shared` whose filename matches the block type name (e.g. `TeaserBlock.cshtml` renders `TeaserBlock` instances) with no controller/component class required at all.

Other content types placed into a `ContentArea` (not just blocks) use `EPiServer.Web.Mvc.PartialContentComponent<TContentData>` / `AsyncPartialContentComponent<TContentData>` for the view-component approach.

View components/partials receive the current content instance through a parameter conventionally named `currentContent` or `currentBlock`.

## `TemplateDescriptor`

`[TemplateDescriptor]` (namespace `EPiServer.Framework.DataAnnotations`) is an **optional** attribute added to a controller/component/endpoint class to control how it's matched by the template resolver, beyond automatic registration.

| Property | Purpose | Default |
|---|---|---|
| `Path` | Explicit view location when not following MVC convention | `null` |
| `ModelType` | The model type this template applies to (can be an interface/abstract type) | `null` |
| `Inherited` | If `true`, the template is also available to subtypes of `ModelType` — used for fallback/base templates | `false` |
| `Tags` | Tags this template matches against (see display channels/options below) | — |
| `AvailableWithoutTag` | Whether the template is still selectable when no tag is requested | — |
| `Description` | Free-text description | `null` |
| `TemplateTypeCategory` | Explicit template category; normally resolved from `ModelType` | resolved |

```csharp
[TemplateDescriptor(Inherited = true, Tags = new[] { RenderingTags.Sidebar })]
public class DefaultPageController : PageController<PageData>
{
    // Fallback renderer for any PageData subtype without its own controller.
}
```

**Gotcha:** without the attribute, a controller registered for a concrete type does **not** automatically apply to subtypes — add `Inherited = true` explicitly to make a controller act as a fallback for a whole type hierarchy.

Endpoint-style templates (custom ASP.NET Core endpoints rather than MVC controllers) use `[TemplateDescriptor(Inherited = true, TemplateTypeCategory = TemplateTypeCategories.HttpHandler)]` and require adding a `ContentActionDescriptor` with the `CmsPolicyNames.Read` / `CmsPolicyNames.Preview` authorization policies to the endpoint metadata.

## Template selection algorithm

`TemplateResolver` selects a template in five steps:

1. `ITemplateResolverEvents.TemplateResolving` fires first; a handler can short-circuit resolution by supplying a template directly.
2. Filter by **rendering mode** (page vs. partial) — pages consider controllers/Razor Pages/endpoints; partials consider view components/partial views.
3. Filter by **tag**, if one was requested (e.g., from a display channel or display option); falls back to untagged templates if nothing matches the tag.
4. Among remaining candidates, pick the one with the **shortest inheritance chain** to the model type — a template registered directly for the concrete content type wins over one registered for a base class/interface; untagged templates are preferred over tagged ones at equal distance.
5. `TemplateResolver.TemplateResolved` fires, allowing a final override.

Tag-specific convention-based partial views follow `{ContentTypeName}.{Tag}.cshtml` (e.g. `TeaserBlock.Wide.cshtml`), checked before the untagged default `{ContentTypeName}.cshtml`.

## Content area rendering

`ContentArea` properties render their child items by resolving each item's own partial template. Two mechanisms influence *how* an item in a content area renders:

### Display options

**Display options** let editors pick a rendering variant (e.g., width/layout) for an individual content-area item from the CMS UI, via a context menu. Configure them with the `DisplayOptions` options class:

```csharp
services.Configure<DisplayOptions>(options => {
    options
        .Add("full", "/displayoptions/full", Global.ContentAreaTags.FullWidth, "", "epi-icon__layout--full")
        .Add("wide", "/displayoptions/wide", Global.ContentAreaTags.TwoThirdsWidth, "", "epi-icon__layout--two-thirds")
        .Add("narrow", "/displayoptions/narrow", Global.ContentAreaTags.OneThirdWidth, "", "epi-icon__layout--one-third");
});
```

`EPiServer.Web.DisplayOption` / `DisplayOptions` live in `EPiServer.Web`. Selecting a display option applies its associated **tag** during template resolution (step 3 above); the default **Automatic** option uses the content area's own designated template with no tag override.

**Gotcha:** if an editor picks a display option whose tag doesn't match any registered template for that content type, the content area shows an error instead of the content.

### Display channels

**Display channels** (`EPiServer.Web.DisplayChannel`) let a template be selected based on the *requesting device/viewport* rather than editor choice — e.g. a distinct mobile rendering. Implement a custom channel by:

- Overriding `IsActive(HttpContext context)` to decide when the channel is active.
- Implementing `ChannelName` (string identifier matched against `[TemplateDescriptor(Tags = ...)]`).

Also relevant: `EPiServer.Web.IDisplayResolution`, which supplies preview-resolution options (`Height`, `Width`, `Id`, `Name`) in the editorial UI's device-preview dropdown; CSS classes for preview viewports are auto-generated as `epi-viewPort-{width}x{height}`.

Channels are discovered and registered automatically at startup — no manual registration call is needed. Changes to `module.config` require an application restart.

## View models and partial views

A **view model** carries data to a view beyond the raw `IContentData` instance — typically built by the controller and passed to `View(model)`:

```csharp
public interface IPageViewModel<T> where T : PageData
{
    T CurrentPage { get; }
    PageData Section { get; }
}

public class DefaultPageViewModel<T> : IPageViewModel<T> where T : PageData
{
    public DefaultPageViewModel(T currentPage)
    {
        CurrentPage = currentPage;
        Section = currentPage.GetSection(); // ContentExtensions.GetSection()
    }

    public T CurrentPage { get; }
    public PageData Section { get; }
}
```

In the view, use the `epi-property` tag helper (preferred) to render a property with on-page editing support, rather than the older `Html.PropertyFor` HTML helper:

```html
<h1 epi-property="@Model.CurrentPage.PageName"></h1>
```

**Partial views** factor out shared markup (navigation, footers) and are rendered with the standard `<partial name="Navigation" />` tag helper; a partial can inject services directly, e.g. `@inject IContentLoader ContentLoader`, and enumerate content with `ContentLoader.GetChildren<PageData>(...)`. The editorial quick-navigator widget is rendered via `@await Html.RenderEPiServerQuickNavigatorAsync()`.

A common pattern is an internal base `PageControllerBase<T> : PageController<T>` implementing shared concerns (layout toggling via a `ModifyLayout()` method, a `Logout()` action, edit hints for global content) that concrete page controllers inherit from, to avoid repeating boilerplate across many controllers.

## Editor templates (admin UI, not content rendering)

Distinct from content *display* templates: **editor templates** customize the *editing* UI for things like visitor-group audience criteria, built as React/TypeScript components. A criteria editor component receives props conforming to `CriteriaEditorProps` (`id`, `settings`, `editorConfig`, `errors`, `onValueChange(value)`, localization helpers, etc.) and is wired to a C# `VisitorGroupCriterion`-derived class via `[VisitorGroupCriterion(Category, DisplayName, Description, ScriptUrl)]`, with the server-side matching logic in an override of `CriterionBase<T>.IsMatch()`. This is a narrower, UI-extension mechanism — not the page/block rendering pipeline described above.

