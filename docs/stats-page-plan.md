---
title: Stats page with 3D visitor globe
status: implemented
created: 2026-10-23
route: /stats
stack: Next.js 16.2.7, React 19.3, Tailwind CSS 4.3, static export
data_source: Umami v3 HTTP API (build-time snapshot)
---

# Stats page with 3D visitor globe

Implementation complete on branch `stats-page`. Remaining manual step: add the `UMAMI_API_KEY` GitHub secret (section 9.2) before the first deploy that should include real data. Until then the page renders the empty snapshot state.

## 0. Agent instructions

- Read this entire document before editing.
- Implement the locked decisions in section 2. Do not substitute a 2D map, a client-side API call, or a share token.
- The repo is on the `lost-and-spotted-page` branch, whose spotted-page feature was just committed. Do not revert or modify that feature. `docs/LastRunMap.md` is unrelated untracked user work; leave it alone.
- Follow existing repo conventions: JavaScript (not TypeScript), camelCase filenames, default exports for components, Prettier with single quotes and semicolons.
- Run every command in section 13 before declaring the task complete.

## 1. Goal

Add a reusable visitor-stats component and render it on a hidden `/stats` page:

- A 3D globe with one extruded polygon per country.
- Hovering a country shows its name and all-time unique visitor count.
- A "Top countries" list beside/below the globe.
- Data comes from a weekly snapshot of the self-hosted Umami instance, baked into the static build.
- The Umami API key never reaches the browser or the repo.

## 2. Locked decisions

| Area             | Decision                                                                   |
| ---------------- | -------------------------------------------------------------------------- |
| Map renderer     | `react-globe.gl` (Three.js globe), client-only and lazy-loaded             |
| Data source      | Umami HTTP API, fetched by a standalone Node script before `next build`    |
| Snapshot cadence | GitHub Actions schedule, Mondays 06:00 UTC, plus every push to `main`      |
| Snapshot storage | `data/umami-country-stats.json`, committed to the repo                     |
| API auth         | `Authorization: Bearer umami_...` from the `UMAMI_API_KEY` Actions secret  |
| Page             | `app/stats/page.js`, not linked from navbar/footer, `noindex, nofollow`    |
| Reuse            | One public component, `<VisitorStats data={...} />`, with no page coupling |
| Globe theme      | Always-dark green panel in both light and dark site themes                 |
| Country geometry | Natural Earth 110m, prebuilt to a committed GeoJSON asset                  |
| Top list size    | 10 countries, sorted descending                                            |
| Tooltip          | Custom React tooltip positioned from pointer coordinates                   |

## 3. Why this shape

- The Umami tracker (`https://stats.samuelp.ing/script.js`) is write-only. It exposes `umami.track()` and `umami.identify()` but no read API. Stats must come from the HTTP API.
- The site uses `output: 'export'` (`next.config.js`), so there are no runtime API routes. Data must be resolved before or during the static build.
- Fetching in a standalone pre-build script means the API key is never imported by Next.js code, cannot be inlined into a client bundle, and cannot leak into `out/`.
- A committed snapshot gives local development and failed CI runs a real fallback instead of an empty page.

## 4. Current repo facts

| Fact                          | Value                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------- |
| Next.js                       | `^16.2.7`, App Router, `output: 'export'`                                    |
| React                         | `^19.3.0`                                                                    |
| Tailwind                      | `^4.3.3`, palette defined in `app/styles/globals.css`                        |
| Package manager               | npm, lockfile v3                                                             |
| Umami host                    | `https://stats.samuelp.ing`                                                  |
| Umami website ID              | `8f79f6fd-fcd8-4130-9467-e9eaf1d1f76e`                                       |
| Deploy workflow               | `.github/workflows/deploy.yml`, builds `out/` and publishes to GitHub Pages  |
| Path aliases                  | `@/components/*`, `@/config/*`, `@/utils/*`, `@/public/*` in `jsconfig.json` |
| Existing page width           | `max-w-2xl` for About, `max-w-5xl` in layout; use `max-w-4xl` for Stats      |
| Existing animation convention | `.page-fade`, respect `prefers-reduced-motion`                               |

## 5. Architecture

```text
Umami HTTP API
      │
      │  scripts/update-umami-snapshot.mjs
      │  (weekly CI + manual local run, uses UMAMI_API_KEY)
      ▼
data/umami-country-stats.json
      │
      │  utils/visitorStats.js (normalize only, no network)
      ▼
app/stats/page.js (server component, static)
      │
      ▼
<VisitorStats data={stats} />  (client component, reusable)
      ├── <VisitorGlobe />  (dynamic import, ssr: false)
      │     └── public/data/countries-110m.geojson (lazy fetch)
      └── top-countries list
```

The weekly workflow refreshes the snapshot file in the CI workspace, then builds. It does not commit the refreshed file. The committed file is the fallback and the local-development dataset.

## 6. File map

### New files

| Path                                     | Purpose                                                   |
| ---------------------------------------- | --------------------------------------------------------- |
| `app/stats/page.js`                      | Hidden route, loads snapshot, renders title + component   |
| `components/stats/visitorStats.js`       | Reusable client wrapper: summary, globe, list, hover sync |
| `components/stats/visitorGlobe.js`       | Client-only Three.js globe, polygons, tooltip, controls   |
| `components/stats/globeErrorBoundary.js` | Error boundary for WebGL/module failures                  |
| `components/stats/globeSkeleton.js`      | Fixed-height loading placeholder                          |
| `utils/visitorStats.js`                  | Reads/normalizes the committed JSON snapshot              |
| `utils/countryNames.js`                  | `Intl.DisplayNames` wrapper with fallback                 |
| `data/umami-country-stats.json`          | Committed snapshot / fallback                             |
| `scripts/build-country-geojson.mjs`      | One-time generator for the map geometry                   |
| `scripts/update-umami-snapshot.mjs`      | Fetches Umami and atomically rewrites the snapshot        |
| `public/data/countries-110m.geojson`     | Generated map geometry, committed                         |

### Modified files

| Path                                 | Change                                             |
| ------------------------------------ | -------------------------------------------------- |
| `package.json` / `package-lock.json` | Add `react-globe.gl`, `three`; add two npm scripts |
| `jsconfig.json`                      | Add `@/data/*` alias                               |
| `.github/workflows/deploy.yml`       | Add Monday cron + snapshot-refresh step            |

### Explicitly unchanged

`app/layout.js`, `components/analytics/umami.js`, `config/navbarButtons.config.js`, `components/layout/footer.js`, `next.config.js`.

## 7. Data contracts

### 7.1 Snapshot file

`data/umami-country-stats.json`:

```json
{
  "generatedAt": "2026-10-19T06:00:00.000Z",
  "totalVisitors": 12345,
  "countries": [
    { "code": "US", "visitors": 6789 },
    { "code": "GB", "visitors": 1234 }
  ]
}
```

Rules:

- `generatedAt`: ISO 8601 UTC string, or `null` for the empty seed.
- `totalVisitors`: unique visitors for all time from the Umami `/stats` endpoint. If that request fails, use the sum of `countries[].visitors`.
- `countries`: sorted descending by `visitors`; unique two-letter uppercase codes; only `visitors > 0`; no names stored.
- Empty seed: `{ "generatedAt": null, "totalVisitors": 0, "countries": [] }`.

### 7.2 Component props

`<VisitorStats data={...} />` accepts exactly:

```js
{
  updatedAt: string | null,
  totalVisitors: number,
  countries: Array<{ code: string, name: string, visitors: number }>,
}
```

No other props are required. Optional `className` is allowed but not required. The component must not import page-specific modules.

`name` and `updatedAt` are resolved on the server so the client never calls `Intl.DisplayNames` or `Intl.DateTimeFormat` during render. ICU data differs between Node and browsers (Node renders `Hong Kong SAR China` where Chrome renders `Hong Kong`), which causes hydration mismatches.

### 7.3 Normalized data

`utils/visitorStats.js` exports `GetVisitorStats()` (no network, no environment access):

- Import the JSON snapshot.
- Filter to `/^[A-Z]{2}$/` codes, excluding `ZZ`.
- Coerce `visitors` to a finite number and drop values `<= 0`.
- Merge duplicate codes by summing.
- Sort by `visitors` descending, then `code` ascending for deterministic ties.
- Resolve `name` per country with the server-side `GetCountryName`.
- Clamp `totalVisitors` to at least the sum of country visitors.
- Preformat the snapshot date as `updatedAt` with `Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' })`.
- Return `{ generatedAt, updatedAt, totalVisitors, countries }`.

## 8. Dependencies and scripts

Install:

```bash
npm install react-globe.gl@^2.38.0 three@^0.186.1
```

`react-globe.gl@2.38.0` depends on `globe.gl@^2.46`, which accepts `three >=0.179 <1`. The explicit `three` dependency is for `MeshPhongMaterial` and ensures a single deduped copy.

Add to `package.json`:

```json
"stats:geojson": "node scripts/build-country-geojson.mjs",
"stats:snapshot": "node scripts/update-umami-snapshot.mjs"
```

Do not use the existing `export` script; it calls the removed `next export` command. Use `npm run build`.

## 9. Implementation tasks

### 9.1 Generate country geometry

Create `scripts/build-country-geojson.mjs`:

1. Fetch this pinned source:
   `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_110m_admin_0_countries.geojson`
2. For each feature:
   - Resolve ISO alpha-2 as `ISO_A2_EH`, falling back to `ISO_A2`.
   - Skip features whose code is missing, `-99`, or `AQ` (Antarctica).
   - Emit only `{ type: 'Feature', id: <uppercase alpha-2>, properties: { name: NAME }, geometry }`.
3. Recursively round every coordinate to 2 decimal places.
4. After rounding, for each ring:
   - Remove consecutive duplicate positions.
   - Ensure the ring is closed (first position equals last); append the first if needed.
   - Drop rings with fewer than 4 positions.
   - Drop polygons with no valid rings.
5. Write minified JSON to `public/data/countries-110m.geojson`.
6. Log feature count, raw byte size, and output path. Exit non-zero on fetch/parse failure.

Run once and commit the output:

```bash
npm run stats:geojson
```

Expected result: roughly 174 features, ~160 KB raw, ~50 KB gzipped. The generator is a development tool and must not run in CI.

### 9.2 Snapshot refresh script

Create `scripts/update-umami-snapshot.mjs`. It is standalone ESM (`.mjs`), uses global `fetch`, and must not import anything from the Next.js app.

Behavior:

1. Read `UMAMI_API_KEY`. If missing or empty:
   - Print `UMAMI_API_KEY not set; keeping existing snapshot.`
   - Exit `0` without touching the file.
2. Resolve:
   - `UMAMI_URL` = env or `https://stats.samuelp.ing` (strip trailing slash).
   - `UMAMI_WEBSITE_ID` = env or `8f79f6fd-fcd8-4130-9467-e9eaf1d1f76e`.
3. Set `now = Date.now()`.
4. Request in parallel with a 15-second `AbortSignal.timeout(15000)`:
   - `GET {UMAMI_URL}/api/websites/{id}/metrics?type=country&startAt=0&endAt={now}&limit=300`
   - `GET {UMAMI_URL}/api/websites/{id}/stats?startAt=0&endAt={now}`
   - Headers on both: `Authorization: Bearer ${UMAMI_API_KEY}`, `Accept: application/json`.
5. Require the metrics response to be `ok`. Throw with status and path on failure. Never include headers or the key in an error message.
6. Parse the metrics body defensively: `Array.isArray(body) ? body : body?.data ?? []`.
7. Normalize rows:
   - `code = String(row.x ?? '').toUpperCase()`.
   - Keep only `/^[A-Z]{2}$/` and not `ZZ`.
   - `visitors = Number(row.y)`; keep only finite values `> 0`.
   - Merge duplicates with a `Map`.
8. Sort descending by visitors, then ascending by code.
9. If there are zero countries, throw and leave the existing file untouched.
10. Parse the stats response; if `ok`, use `Number(body.visitors)` when finite, otherwise fall back to the sum. A failed stats request must not fail the refresh.
11. Build `{ generatedAt: new Date(now).toISOString(), totalVisitors, countries }`.
12. Write atomically:
    - `mkdir('data', { recursive: true })`
    - write `data/.umami-country-stats.tmp`
    - `rename` over `data/umami-country-stats.json`
    - pretty-print with 2 spaces and a trailing newline.
13. On any thrown error: print a short message, `process.exitCode = 1`.

Commit an initial snapshot. If an API key is available while implementing, run the script for real; otherwise commit the empty seed from section 7.1.

Local usage:

```bash
UMAMI_API_KEY=umami_... npm run stats:snapshot
```

The key is created in Umami → Profile → Settings → API keys. It is shown once. Add it to GitHub with:

```bash
gh secret set UMAMI_API_KEY --repo samuel-ping/samuelp.ing
```

### 9.3 Country names

Create `utils/countryNames.js`:

- Create one module-level `Intl.DisplayNames(['en'], { type: 'region' })`.
- Export `GetCountryName(code, fallback)`:
  - Return `displayNames.of(code)` when non-empty.
  - Fall back to the supplied `fallback` (GeoJSON `properties.name`), then the raw code.
  - Catch `RangeError` and return the fallback/code.
- Must be safe in both server and client components.

### 9.4 Globe component

Create `components/stats/visitorGlobe.js` with `'use client'`.

Imports: `react-globe.gl`, `three`, React hooks, `GetCountryName`.

Props:

| Prop              | Type                      | Meaning                         |
| ----------------- | ------------------------- | ------------------------------- |
| `countries`       | `Array<{code, visitors}>` | Snapshot rows                   |
| `highlightedCode` | `string \| null`          | Country hovered in the top list |
| `onHoverCountry`  | `(code \| null) => void`  | Reports globe hover to parent   |

Internal state:

- `features`: GeoJSON features with a merged `visitors` field.
- `size`: `{ width, height }` from `ResizeObserver` on the panel.
- `hovered`: the feature under the pointer, or `null`.
- `pointer`: `{ x, y }` relative to the outer wrapper.
- `rotating`: user preference, default `true` unless reduced motion.
- `pointerInside`: pauses rotation while the pointer is over the panel.
- `geoError`: string or `null`.

Data loading:

- `useEffect` fetches `/data/countries-110m.geojson` with `cache: 'force-cache'`.
- On success, map features and merge counts by `feature.id` using a `Map`.
- On failure, set `geoError`; keep the list functional.

Globe props (exact names):

| Prop                         | Value                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `width` / `height`           | measured panel size                                                          |
| `backgroundColor`            | `'rgba(0,0,0,0)'`                                                            |
| `globeMaterial`              | memoized `new THREE.MeshPhongMaterial({ color: '#0b1a17', shininess: 0.3 })` |
| `showAtmosphere`             | `true`                                                                       |
| `atmosphereColor`            | `'#86ab8a'`                                                                  |
| `atmosphereAltitude`         | `0.15`                                                                       |
| `polygonsData`               | merged features                                                              |
| `polygonGeoJsonGeometry`     | `'geometry'`                                                                 |
| `polygonAltitude`            | `(d) => 0.006 + 0.14 * Math.sqrt((d.visitors ?? 0) / maxVisitors)`           |
| `polygonCapColor`            | palette function below                                                       |
| `polygonSideColor`           | `'rgba(15, 32, 28, 0.9)'`                                                    |
| `polygonStrokeColor`         | highlighted ? `'#fff8eb'` : `'rgba(238, 231, 218, 0.18)'`                    |
| `polygonsTransitionDuration` | `0` when reduced motion, otherwise `600`                                     |
| `animateIn`                  | `!prefersReducedMotion`                                                      |
| `onPolygonHover`             | updates `hovered`, calls `onHoverCountry(code)`                              |

Guard `maxVisitors === 0` so the altitude is always `0.006`.

Cap palette (index 0 = zero visitors):

```js
const PALETTE = ['#29413c', '#375954', '#4a6e50', '#86ab8a', '#c8e6c9'];

function capColor(visitors, max) {
  if (!visitors || max <= 0) return PALETTE[0];
  const t = Math.sqrt(visitors / max);
  const index = Math.min(
    PALETTE.length - 1,
    1 + Math.floor(t * (PALETTE.length - 1)),
  );
  return PALETTE[index];
}
```

Camera and controls, after mount via a ref:

- `pointOfView({ lat: 20, lng: -30, altitude: 2.2 }, 0)`
- `controls().enableZoom = false` (do not trap page scroll)
- `controls().enablePan = false`
- `controls().autoRotateSpeed = 0.35`
- `controls().autoRotate = rotating && !pointerInside && !prefersReducedMotion`

Rotation:

- Slow auto-rotate by default.
- Pause while the pointer is inside the panel.
- Add a small button in the bottom-right of the panel: `Pause rotation` / `Resume rotation`.
- Respect `prefers-reduced-motion`: default `rotating = false`, no entry animation, no polygon transition.

Tooltip:

- Render a custom absolutely positioned `div` in the outer wrapper, not `polygonLabel`.
- Show when `hovered` is non-null.
- Position from `pointer`, horizontally clamped to stay inside the panel.
- Content: country name in medium weight, then `{formattedCount} visitors`, or `No recorded visitors` when zero.
- Style: light beige surface (`bg-beige-100 text-green-800`), small shadow, rounded, `pointer-events-none`, `z-10`.
- Hide on `onPolygonHover(null)` and on pointer leave.

Panel markup:

- Outer wrapper: `relative` (tooltip lives here, no `overflow-hidden`).
- Inner canvas panel: fixed height `h-[320px] sm:h-[420px] lg:h-[480px]`, `w-full`, `overflow-hidden`, `rounded-xl`, `bg-green-800`, `shadow-card dark:shadow-none`, `ring-1 ring-green-700/60`.
- Put `aria-hidden="true"` only on the inner div that hosts the Three.js canvas, not on the panel. The pause button must be a sibling of that div so it stays keyboard- and screen-reader-accessible.
- Canvas is decorative for assistive tech; the top list is the accessible representation.

Failure states:

- GeoJSON fetch failure: centered `Map unavailable.` text inside the panel; list still renders.
- No WebGL: check for `webgl2`/`webgl` on a throwaway canvas inside `useEffect` (never during render/SSR), and render the same fallback instead of mounting the globe.
- Unexpected render error: `globeErrorBoundary.js` catches it and renders the fallback.

### 9.5 Reusable stats component

Create `components/stats/visitorStats.js` with `'use client'`.

This is the only component pages should import.

Structure:

```jsx
<section
  aria-labelledby="visitor-map-heading"
  className="flex flex-col gap-y-6"
>
  <h2 id="visitor-map-heading" className="sr-only">
    Visitors by country
  </h2>
  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
    <p>...</p>
    <p className="text-sm text-muted">Updated ...</p>
  </div>
  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
    <GlobePanel />
    <TopCountriesList />
  </div>
  <p className="text-sm text-muted">
    Country totals exclude visitors whose location could not be determined.
  </p>
</section>
```

Derived values (compute once per render with `useMemo`):

- `attributedVisitors` = sum of country visitors.
- `maxVisitors` = largest country value, or `0`.
- `totalCountries` = `countries.length`.
- `topCountries` = first 10.
- `hasData` = `countries.length > 0 && attributedVisitors > 0`.

Summary copy:

- With data: `{formatted totalVisitors} visitors from {totalCountries} countries`.
- Without data: `No visitor data yet.`
- Updated line only when `updatedAt` is non-null: render the preformatted server string as `Updated {updatedAt}`.
- Use `Intl.NumberFormat('en-US')` for all counts.

Top list:

- Heading: `Top countries` (`font-display text-xl font-medium`).
- `<ol aria-label="Top countries by visitors">`.
- Each row shows rank, country name, count, percentage, and a horizontal bar.
- Percentage denominator is `attributedVisitors`; guard against zero and show `<1%` below 1%.
- Bar width is the raw percentage with a 2% minimum for non-zero rows.
- Row hover sets `highlightedCode` and highlights the corresponding country on the globe.
- Optionally highlight the row when the globe reports the same code.
- Rows are not links and need no keyboard handler.

Globe panel:

- Dynamic import at module scope:

```js
const VisitorGlobe = dynamic(() => import('./visitorGlobe'), {
  ssr: false,
  loading: () => <GlobeSkeleton />,
});
```

- `next/dynamic` with `ssr: false` is valid here because this file is a client component. Do not move the dynamic import into the server page.
- `GlobeSkeleton` uses the same fixed panel heights (`h-[320px] sm:h-[420px] lg:h-[480px]`), rounded corners, and dark background as the real globe, with `animate-pulse motion-reduce:animate-none`, so there is no layout shift.
- Wrap the dynamic component in `GlobeErrorBoundary`.

### 9.6 Hidden page

Create `app/stats/page.js`:

```js
import PageTitle from '@/components/ui/pageTitle';
import VisitorStats from '@/components/stats/visitorStats';
import { GetVisitorStats } from '@/utils/visitorStats';

export const metadata = {
  title: 'Stats',
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  const stats = GetVisitorStats();

  return (
    <div className="mx-auto flex w-full max-w-4xl page-fade flex-col gap-y-8">
      <PageTitle text="Stats" />
      <VisitorStats data={stats} />
    </div>
  );
}
```

- No `async` needed; the snapshot is local JSON.
- Do not add the route to `config/navbarButtons.config.js` or the footer.
- Do not add an API route.

### 9.7 Weekly snapshot workflow

Modify `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [main]

  # Refresh the visitor snapshot and redeploy every Monday at 06:00 UTC.
  # GitHub may delay scheduled runs; workflow_dispatch is the manual fallback.
  schedule:
    - cron: '0 6 * * 1'

  workflow_dispatch:
```

Insert this step after `Install dependencies` and before `Build with Next.js`:

```yaml
- name: Refresh visitor stats snapshot
  continue-on-error: true
  env:
    UMAMI_API_KEY: ${{ secrets.UMAMI_API_KEY }}
  run: npm run stats:snapshot
```

Do not add `UMAMI_API_KEY` to the Next build step. The Next build does not need it.

Behavior:

- Secret present, API healthy: file is rewritten, build bakes in fresh data.
- Secret present, API down: step fails but `continue-on-error` lets the build proceed with the committed snapshot.
- Secret absent: script exits `0` and the committed snapshot is used.

### 9.8 Path alias

Add to `jsconfig.json` under `compilerOptions.paths`:

```json
"@/data/*": ["./data/*"]
```

## 10. Globe behavior details

| Behavior               | Requirement                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| Idle                   | Slow rotation at `0.35`; countries gently extruded                      |
| Pointer over panel     | Rotation pauses so tooltips are usable                                  |
| Pointer over country   | Tooltip follows pointer with name + count                               |
| Pointer leaves country | Tooltip disappears                                                      |
| Drag                   | Rotates the globe                                                       |
| Scroll                 | Page scrolls normally; globe zoom disabled                              |
| List row hover         | Matching country gets a beige outline                                   |
| Pause button           | Persists pause/resume; label reflects state                             |
| Reduced motion         | No auto-rotate, no entry animation, no altitude transition              |
| No WebGL               | Fallback message; top list still usable                                 |
| No data                | Globe renders zero-value countries; tooltip says `No recorded visitors` |
| Mobile                 | Panel is 320 px tall; list stacks below; no horizontal overflow         |

## 11. Visual and copy reference

| Element            | Copy / style                                                              |
| ------------------ | ------------------------------------------------------------------------- |
| Page title         | `Stats` via `PageTitle`                                                   |
| Section SR heading | `Visitors by country`                                                     |
| Summary            | `{n} visitors from {n} countries`                                         |
| Updated            | `Updated Oct 19, 2026` (UTC, `dateStyle: 'medium'`)                       |
| Empty summary      | `No visitor data yet.`                                                    |
| List heading       | `Top countries`                                                           |
| Tooltip with data  | `{Country}` / `{n} visitors`                                              |
| Tooltip empty      | `{Country}` / `No recorded visitors`                                      |
| Footnote           | `Country totals exclude visitors whose location could not be determined.` |
| Globe loading      | `Loading globe…`                                                          |
| Globe error        | `Map unavailable.`                                                        |
| Rotation button    | `Pause rotation` / `Resume rotation`                                      |

Styling:

- Page: `max-w-4xl`, `gap-y-8`, `page-fade`.
- Panel: always dark green, rounded, shadowed; fixed height.
- List: theme-aware Tailwind classes using the existing palette (`green-*`, `beige-*`, `text-muted`).
- Bars: `bg-green-500 dark:bg-green-300`, track `bg-green-100 dark:bg-green-700`.
- Numbers: `tabular-nums`.
- No arbitrary colors outside the existing palette except the globe's fixed WebGL colors listed above.

## 12. Accessibility

- The globe canvas is visual only. Give the canvas container `aria-hidden="true"`.
- The ordered list is the accessible equivalent: country name, visitor count, percentage.
- Do not put hover-only information exclusively in the tooltip; every value is also in the list.
- Provide the pause/resume button for the auto-rotation (WCAG 2.2.2).
- Respect `prefers-reduced-motion` for rotation, polygon transitions, entry animation, and skeleton pulse (`motion-reduce:animate-none`).
- Keep focus styles unchanged; the rotation button uses the site's global `:focus-visible` ring.
- `/stats` must emit `<meta name="robots" content="noindex, nofollow, nocache">`. It is hidden, not access-controlled; anyone with the URL can view it.

## 13. Verification

Run:

```bash
npm run lint
npm run build
find out -iname '*stats*' | head -20
grep -r "umami_" out/ || true
```

Expected:

- Lint passes.
- Build passes with `out/stats` present.
- No `umami_` API key string anywhere in `out/`.
- The globe chunk is not loaded on other routes (confirm in the devtools Network panel; an HTML preload hint, if present, does not count as loading).

Manual checks in `npm run dev`:

1. Visit `/stats`. The page is not in the navbar or footer.
2. View source / devtools: `noindex, nofollow` meta is present.
3. Globe appears inside the dark panel and rotates slowly.
4. Hover the US (or the top country): tooltip shows the correct count.
5. Hover a country with zero visitors: tooltip shows `No recorded visitors`.
6. Hover a top-list row: the matching country gets a light outline.
7. Pause button stops and resumes rotation.
8. With OS reduced motion enabled, the globe does not rotate or animate in.
9. Resize to 360 px wide: no horizontal scroll, panel stays 320 px tall, list stacks below.
10. Toggle light/dark: page text and list adapt; globe panel stays dark and readable.
11. Temporarily rename `public/data/countries-110m.geojson`: the panel shows `Map unavailable.` and the list still renders.
12. Temporarily empty the snapshot: page shows the empty state without errors.
13. Throttle to 3G: the globe chunk loads only on `/stats`, after the page shell.

Workflow check after the secret is set:

```bash
gh workflow run deploy.yml --repo samuel-ping/samuelp.ing
gh run watch --repo samuel-ping/samuelp.ing
```

Confirm the `Refresh visitor stats snapshot` step logs a country count and the deployed page's "Updated" date matches the run date.

## 14. Acceptance criteria

- [ ] `/stats` builds statically and is reachable.
- [ ] `/stats` is absent from navbar/footer and contains `noindex, nofollow`.
- [ ] `<VisitorStats data={...} />` can be imported into any page without page-specific dependencies.
- [ ] Globe renders 3D country polygons with height proportional to visitor count.
- [ ] Hovering any country shows its name and formatted visitor count.
- [ ] Top 10 countries are sorted correctly with count and percentage.
- [ ] Hovering a list row highlights the matching country.
- [ ] Auto-rotation pauses on hover and can be paused/resumed with a button.
- [ ] Reduced-motion and no-WebGL paths work.
- [ ] Weekly cron refreshes data; API failure falls back to the committed snapshot without failing the build.
- [ ] `UMAMI_API_KEY` is never present in `out/` or client bundles.
- [ ] `npm run lint` and `npm run build` pass.
- [ ] No unrelated files are modified or staged.

## 15. Out of scope

- Do not add a nav link, footer link, sitemap entry, or public share token.
- Do not call the Umami API from the browser.
- Do not add `NEXT_PUBLIC_*` variables.
- Do not add API routes, middleware, or server runtime code.
- Do not modify the Umami tracker or website ID.
- Do not add 2D fallback maps, charts, or additional stats dimensions.
- Do not commit the API key, `.env` files, or CI-generated snapshot changes.
- Do not touch `content/spotted/`, `components/spotted/`, `app/spotted/`, `docs/LastRunMap.md`, or any other unrelated file.

## 16. Risks and notes

- **Bundle size:** `react-globe.gl` pulls in Three.js. Expect a large lazy chunk. It must only load on `/stats`; verify it is absent from other pages.
- **React 19 compatibility:** `react-globe.gl@2.38.0` declares `react: "*"`. If it fails under React 19, fall back to using `globe.gl` directly: create the instance in a `useEffect` on a `div` ref, apply the same props, and dispose on unmount. Do not switch to a 2D map.
- **Scheduled workflow drift:** GitHub delays cron runs and disables schedules after long repo inactivity. `workflow_dispatch` remains available.
- **Snapshot staleness:** CI does not commit the refreshed file. The committed snapshot is only a fallback; the deployed page is fresh. Refresh the committed file manually with `npm run stats:snapshot` when desired.
- **Unknown locations:** Umami excludes visitors without a resolvable country, so the sum of country counts can be lower than `totalVisitors`. The footnote covers this.
- **Unmatched codes:** A country code returned by Umami may not exist in Natural Earth. It still appears in the top list (via `Intl.DisplayNames`) but has no polygon to highlight. Do not drop it from the list.
- **Hidden is not private:** `noindex` keeps it out of search results, but GitHub Pages serves it to anyone with the URL. Do not put sensitive data on this page.
- **Natural Earth quirks:** v5.1.2 marks a few disputed territories with `-99`; they are intentionally omitted. Kosovo uses `XK` and is included.
- **Hydration:** all formatting uses fixed `en-US` and `UTC`, and the globe is client-only, so there should be no hydration mismatch.
