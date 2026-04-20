# Personal website, Balasubramaniam Srinivasan

A single-page, zero-framework static site. Hand-rolled HTML, CSS, and a
small amount of JS (theme toggle, scroll reveal, stat counters,
publications accordion, rotating hero word via Typed.js). Dark-mode
first with a light toggle, fully responsive, WCAG AA contrast, and SEO
+ OpenGraph + schema.org JSON-LD baked in.

## Files

```
website/
├── index.html      the whole page
├── style.css       all styles (no external CSS)
├── script.js       theme toggle, scroll reveal, counters, pub accordion
├── main.pdf        the CV, linked from the site
├── photo.jpg       (optional) avatar image, 400x400 or larger square
├── robots.txt      search engine directives
├── sitemap.xml     sitemap for search engines
├── .nojekyll       tells GitHub Pages to skip Jekyll processing
└── README.md       this file
```

## Local preview

Any static server works:

```bash
# Python
python3 -m http.server 8000
# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Deploy to GitHub Pages (recommended)

GitHub Pages is free, fast, has a CDN, is versioned, and is the
convention for researcher sites. Two simple paths:

### Option A: user site at `balasrini32.github.io` (recommended)

1. Create a new public repo named **exactly** `balasrini32.github.io`
   (replace with your actual GitHub username if different).
2. Copy the contents of this `website/` folder to the repo root:

   ```bash
   cd ~/some/path
   git clone https://github.com/<user>/<user>.github.io.git
   cp -r /path/to/website/* /path/to/website/.nojekyll <user>.github.io/
   cd <user>.github.io
   git add .
   git commit -m "Initial site"
   git push origin main
   ```

3. In the GitHub repo: **Settings → Pages** → set Source to
   `Deploy from a branch`, Branch `main` / `/ (root)`. Save.
4. Wait about 30 seconds. Visit `https://<user>.github.io`.

### Option B: project site at `<user>.github.io/<repo>`

Use this if you want the site to live in a repo called, say,
`personal-site`. Same steps, but:

- Update every absolute URL in `sitemap.xml`, `robots.txt`,
  and the `og:url` meta to include the `/personal-site/` prefix.
- Your live URL is `https://<user>.github.io/personal-site/`.

Option A is cleaner; pick it unless you already own the username repo.

## Custom domain (optional but nice)

If you own (or buy) `balasrinivasan.dev` / `bala.ai` / etc.:

1. Add a file called `CNAME` at the repo root with just the bare domain:

   ```
   balasrinivasan.dev
   ```

2. At your DNS provider set:
   - `A` records for `@` pointing to GitHub's IPs
     (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
   - A `CNAME` record for `www` pointing to `<user>.github.io`.
3. In GitHub **Settings → Pages**, enter the custom domain.
   Check **Enforce HTTPS** once the TLS cert is issued (5 to 30 minutes).
4. Update the `og:url` in `index.html` and URLs in `sitemap.xml` /
   `robots.txt` to the custom domain.

## Updating content

Everything lives in `index.html`:

- **Hero / bio**, top of `<section id="top">`.
- **Research cards**, `<section id="research">`.
- **Projects**, `<section id="projects">` (7 cards, timeline style).
- **Publications**, `<section id="publications">`. Each entry is a
  `<button class="pub-toggle">` paired with a `<div class="pub-abs" hidden>`
  block; the accordion handler is in `script.js`.
- **News**, `<section id="news">`; edit the two-column list.
- **CV**, replace `main.pdf` with your latest build.

When you update the CV, also bump `<lastmod>` in `sitemap.xml`.

## Adding a photo

Drop a square photo (400x400 or larger, JPEG or WebP) into
`website/` as `photo.jpg`. The hero already includes:

```html
<img src="photo.jpg" alt="Balasubramaniam Srinivasan"
     onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
<div class="avatar-initials">BS</div>
```

If `photo.jpg` is missing, the `BS` initials fallback shows
automatically. No code changes needed.

## Analytics (optional)

If you want simple, privacy-respecting analytics, add Plausible,
GoatCounter, or Fathom. Google Analytics tends to be slow and invasive,
so most researcher sites in 2026 have moved away from it.

## Design notes

- **Dark first, light toggle.** Most researcher and frontier-lab folks
  browse dark, so we default to dark and respect `prefers-color-scheme`
  on first visit. The user's choice is remembered in `localStorage`.
- **No framework.** Karpathy-style. Loads in one round trip, no build,
  no lock-in, easy to maintain five years from now.
- **Bricolage Grotesque + DM Sans + JetBrains Mono** via Google Fonts.
- **Accent color `#6ba8ff`** on dark, `#004f90` on light (matches the
  CV header), both tuned for WCAG AA contrast.
- **Semantic HTML** (`<header>`, `<main>`, `<section>`, `<nav>`,
  `<footer>`) and ARIA labels so screen readers parse the page cleanly.
- **No em-dashes** anywhere in the page copy or the CV PDF, by design.
