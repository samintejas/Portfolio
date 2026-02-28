---
title: Performance Without Frameworks
date: 2026-02-28
topic: Web
description: What I learned optimising this site from scratch, and why most web frameworks solve problems you probably don't have.
---

# Performance Without Frameworks

---

This site is built with Rust, HTMX, and Tailwind. No React, no Next.js, no bundler, no node_modules. Over the past few days I went through every part of the stack and optimised it. This is a record of what I did, why it mattered, and what it taught me about where performance actually comes from.

The server renders Markdown to HTML at startup using `pulldown-cmark`. Articles are stored in a `HashMap` in memory — every request is a lookup, not a file read. KaTeX is in the mix because some articles cover algorithms and math, and I wanted those to render properly without reaching for a JavaScript-heavy solution. Tailwind handles all the styling, compiled down to a single CSS file with only the classes the templates actually use.

The stack is intentionally thin. Everything here came from questioning whether something was necessary before adding it.

I'm splitting this into two categories: **perceived performance** (what the user feels) and **technical performance** (what the numbers say). They're related but not the same. A site can score 100 on Lighthouse and still feel slow. A site can have a mediocre score and feel instant. The goal is both.

---

## Perceived Performance

These changes have a direct, visible effect on how fast the site feels, even without measuring anything.

### Load on press, not release

The most noticeable change. Navigation links now trigger on `mousedown` instead of `click`.

A standard click is a two-step event: `mousedown` → `mouseup` → `click`. Browsers only fire `click` on release. The gap between press and release is typically 80–150ms. That's dead time where nothing is happening.

```html
hx-trigger="mousedown"
```

One attribute. The request starts the moment the user's finger lands. By the time they release, the response is often already back. This is the single change that made the biggest visible difference.

### Server-side math rendering

Some articles on this site cover algorithms and computer science topics that involve mathematical notation — time complexities, recurrences, proofs. Writing those as plain text or images isn't acceptable. KaTeX was the obvious choice: it renders LaTeX to clean HTML and has good browser support.

The initial approach was client-side rendering. KaTeX was loaded lazily from a CDN only when math elements were detected on the page. It worked, but the rendering happened after the page was already visible. The flow was:

1. Page loads with raw LaTeX text in the DOM
2. Deferred script runs after parse
3. KaTeX JS replaces text with rendered HTML
4. Content shifts

Switching to server-side rendering with the `katex` Rust crate eliminates all of this. The rendered HTML is in the first byte of the response. The user never sees unrendered math.

```rust
let opts = katex::Opts::builder()
    .display_mode(false)
    .throw_on_error(false)
    .build()
    .unwrap();

katex::render_with_opts(&math, opts)
```

The `katex` crate uses an embedded QuickJS engine to run the KaTeX JavaScript at startup. It's slower at build time, faster at every request.

### Eliminating layout shift from async CSS

Early in the process I tried loading CSS asynchronously using the `preload` + `onload` trick:

```html
<link
  rel="preload"
  href="/css/style.css"
  as="style"
  onload="this.rel='stylesheet'"
/>
```

The idea is that the browser fetches CSS in parallel rather than blocking on it. In practice, the page renders without styles first, then jumps when styles apply. This is a significant layout shift, visually worse than the original blocking CSS.

The right trade-off here is to keep CSS synchronous. The file is small, gzip-compressed, and cached for 30 days. The blocking time on repeat visits is zero.

### Image dimensions at the source

The profile image was 512×512 pixels. The display size is 256×256. The browser was downloading twice the data it needed and scaling it down.

```bash
ffmpeg -i profile.webp -vf scale=256:256 profile.webp
```

The file dropped to 9KB. This directly affects Largest Contentful Paint (LCP) on the home page. The profile image is likely the LCP element.

---

## Technical Performance

These changes don't always have a visible effect in isolation, but compound into measurable improvements.

### Parser-blocking scripts

A script tag without `defer` or `async` stops the HTML parser while the browser fetches and executes it:

```
Parse HTML → encounter <script> → stop → fetch → execute → resume
```

With `defer`, the script is fetched in parallel and executed after parsing completes, before `DOMContentLoaded`. The parser is never blocked.

```html
<script src="/js/htmx.min.js" defer></script>
```

The distinction between `defer` and `async` matters: `async` executes as soon as it downloads, which can be before or after `DOMContentLoaded`. For a script that listens for `DOMContentLoaded`, `async` can silently miss the event. `defer` guarantees ordering.

### Gzip on static files

The Axum `CompressionLayer` applies to routes handled by the router, but `nest_service` creates its own service chain that bypasses the top-level layer. Static files were being served uncompressed.

```rust
// wrong — CompressionLayer doesn't reach nest_service
.nest_service("/css", ServeDir::new("static/css"))
.layer(CompressionLayer::new())

// correct — each service gets its own compression
.nest_service(
    "/css",
    ServiceBuilder::new()
        .layer(CompressionLayer::new())
        .layer(SetResponseHeaderLayer::if_not_present(
            header::CACHE_CONTROL,
            HeaderValue::from_static("public, max-age=2592000"),
        ))
        .service(ServeDir::new("static/css")),
)
```

The Tailwind CSS file went from ~16KB to ~4KB on the wire.

### Self-hosting all assets

Every external CDN request adds a DNS lookup, TCP handshake, and TLS negotiation before the first byte. Even with `preconnect` hints, this is 50–200ms on a cold connection.

The original setup loaded htmx from `unpkg.com` and KaTeX from `cdn.jsdelivr.net`. Both are now served locally:

```
static/js/htmx.min.js
static/css/katex.min.css
static/css/fonts/KaTeX_*.woff2  (20 font files)
```

There are no external network requests at all. Every asset is served from the same connection the HTML came from.

### font-display: optional on KaTeX fonts

The KaTeX CSS from CDN declared `@font-face` blocks with `font-display: block`. This tells the browser to hold text rendering for up to 3 seconds waiting for the font to load.

Since the fonts are now local, load time is fast. But the `font-display` value still matters for the first visit before the fonts are cached. `optional` tells the browser: use the font only if it's already available within a short timeout (~100ms), otherwise use the system font without waiting.

```bash
sed 's/font-display:block/font-display:optional/g' katex.min.css
```

For math content (which is rare on this site), this is the correct tradeoff. The math may look slightly different on the absolute first visit. Every subsequent visit it's rendered with the correct font, already cached.

### Cache headers on static assets

```
Cache-Control: public, max-age=2592000
```

30 days. After the first visit, every CSS file, JS file, font, and image is served from the browser's local cache. Zero network requests, zero latency.

This only works correctly when assets are versioned or content-addressed. If you update a CSS file, the browser won't see the change for 30 days unless the URL changes. For a personal site with infrequent deploys, this is acceptable. For a high-traffic product, you'd append a content hash to filenames.

---

## Why Modern Frameworks Are Overkill for Most Use Cases

Every framework exists to solve a problem. React solves the problem of building complex UIs with lots of interactive state. Next.js solves the problem of server-rendering those UIs and routing between them. Webpack solves the problem of bundling thousands of JS modules.

These are real problems. If you're building a social feed with real-time updates, collaborative editing, or a data dashboard with dozens of interactive components, these tools are the right choice.

Most sites are not that.

A portfolio is content with navigation. A blog is text with links. A landing page is layout and copy. None of these have complex interactive state. None of them need a virtual DOM. None of them need a build step that takes 40 seconds.

### What you actually get with a modern framework

- A 300KB JavaScript bundle that runs before the user sees anything
- A build pipeline you have to maintain, upgrade, and occasionally debug
- Server components, hydration, islands, suspense boundaries: concepts that exist to recover performance lost by the framework itself
- `node_modules` with thousands of transitive dependencies you didn't ask for

This site's entire JavaScript is one file: `htmx.min.js` at 51KB. It adds navigation without full page reloads. That's the entire client-side story.

### What HTMX actually is

HTMX is not a framework. It's a small library that extends HTML with a few attributes. It doesn't manage state. It doesn't have a component model. It doesn't need a build step.

```html
<a
  href="/article"
  hx-get="/article"
  hx-target="#content"
  hx-swap="innerHTML transition:true"
  hx-push-url="true"
  >Articles</a
>
```

This says: when this link is clicked, fetch `/article`, replace `#content` with the response, and update the browser URL. The server returns a fragment of HTML. No JSON parsing, no client-side routing, no state reconciliation.

The mental model is the same as regular HTML links. The server does what servers do. The browser does what browsers do. HTMX just makes the boundary between them a bit more flexible.

### The Rust server

The entire server is two files: `main.rs` and `article.rs`. Templates are HTML files loaded from disk at startup and kept in memory. Articles are Markdown files parsed and rendered at startup, stored in a `HashMap`. Every request is a string lookup followed by a string replace.

There is no ORM. There is no dependency injection container. There is no middleware stack with 20 layers. There are no abstractions over abstractions.

The result is a server that handles thousands of concurrent requests on a single core, uses ~10MB of memory, and compiles to a single binary you can copy anywhere and run.

### The actual question

The question isn't "which framework should I use?" It's "does this problem require a framework?"

For a blog: no. A Markdown parser, a template string, and a file server are enough. The complexity budget should go into the writing, not the infrastructure.

For a SaaS product with user accounts, real-time collaboration, and complex UI: maybe. Even then, reach for complexity only when the simpler thing actually fails.

Most of the time, the simpler thing doesn't fail. Most of the time, the framework is solving a problem you don't have, at the cost of problems you now do.

---

Performance is not a feature you add at the end. It's what remains when you stop adding things that aren't necessary.
