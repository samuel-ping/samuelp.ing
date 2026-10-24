# Last Run Map — Implementation Plan

## 0. Metadata

| Field                      | Value                                                  |
| -------------------------- | ------------------------------------------------------ |
| Status                     | Rebased onto `main`; bootstrap/CI verification pending |
| Last updated               | 2026-10-24                                             |
| Branch                     | `last-run-map`                                         |
| Target page                | `/about`                                               |
| Feature                    | “Latest run” card with a build-time map image          |
| Primary stack              | MapLibre GL JS + OpenFreeMap                           |
| Static renderer            | MapLibre GL JS in headless Chromium via Playwright     |
| Tile provider              | OpenFreeMap public instance                            |
| Map API key                | None for OpenFreeMap                                   |
| Units                      | Miles for distance and pace                            |
| Fallback                   | Previous successful deployment snapshot                |
| Runtime Dreeve access      | None                                                   |
| Runtime map JS on `/about` | None                                                   |
| Future requirement         | Shared map foundation for interactive maps             |

### 0.1 Agent guardrails

- Implementation is approved as of 2026-10-23. Do not change the provider, renderer, fallback, or snapshot contract without updating this document.
- MUST NOT expose `DREEVE_API_KEY`, raw Dreeve responses, or `encodedPolyline` to the browser.
- MUST NOT call Dreeve from client-side code.
- MUST keep the About map as a static image; no MapLibre JS on `/about`.
- MUST use MapLibre + OpenFreeMap. Do not introduce Mapbox, MapTiler, Stadia, Google Maps, or Geoapify.
- MUST treat a new run snapshot as atomic: metadata and both theme images succeed or the previous snapshot remains.
- MUST use the previous successful deployment as the fallback source.
- MUST keep the card map label-free.
- MUST preserve attribution for OpenFreeMap, OpenMapTiles, and OpenStreetMap.
- SHOULD emit WebP images.
- SHOULD keep the style factory and route helpers portable to future interactive maps.
- SHOULD keep the static renderer isolated in `scripts/`; it must not ship to the client.

### 0.2 Agent parsing contract

- Treat `MUST`, `SHOULD`, and `MAY` as normative keywords.
- Treat tables as the source of truth for decisions, files, variables, and dimensions.
- Use stable IDs: `D*` for decisions, `T*` for tasks, and section numbers for cross-references.
- Do not infer a different provider, renderer, fallback, or map style from prose.
- If a requirement conflicts with this document, stop and ask; do not silently choose.
- Implementation order is `T1 → T2 → T3 → T4 → T5 → T6 → T7 → T8 → T9`.
- `T10` is deferred until the first interactive-map feature.

Canonical terms:

| Term          | Meaning                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| Snapshot      | The JSON plus light/dark WebP image pair for one activity                      |
| Promotion     | Atomically replacing the current snapshot with a new one                       |
| Fallback      | The previous successful deployment snapshot, then the committed bootstrap      |
| Bootstrap     | The committed known-good snapshot used for local dev and first-deploy failures |
| Card          | The “Latest run” UI block on `/about`                                          |
| Static render | MapLibre output generated at build time; no browser map runtime                |
| Shared style  | `utils/mapStyle.mjs` output used by static and future interactive maps         |

## 1. Decisions

| ID  | Decision                | Value                                                        |
| --- | ----------------------- | ------------------------------------------------------------ |
| D1  | Map stack               | MapLibre GL JS + OpenFreeMap                                 |
| D2  | Static image generation | MapLibre GL JS in headless Chromium via Playwright           |
| D3  | Theme output            | Two images: light and dark                                   |
| D4  | Image format            | WebP, quality ~82                                            |
| D5  | Image dimensions        | 1344 × 672 output; displayed at 672 × 336 (2×)               |
| D6  | Aspect ratio            | 2:1                                                          |
| D7  | Labels on card map      | None                                                         |
| D8  | Markers on card map     | None                                                         |
| D9  | Data source             | Dreeve API at build time                                     |
| D10 | Fallback source         | `https://samuelp.ing/last-run.json` plus images              |
| D11 | Bootstrap fallback      | Committed `public/last-run.json` and image pair              |
| D12 | Tile hosting            | OpenFreeMap public instance; no self-hosting for v1          |
| D13 | Future interactive maps | Same MapLibre style factory; lazy-loaded client component    |
| D14 | Dreeve filters          | `Run,TrailRun`; `hasGpx=true`; newest first; size 1          |
| D15 | Activity link           | Omit for v1                                                  |
| D16 | Schedule                | Daily at 13:17 UTC; keep `workflow_dispatch` and push builds |

### 1.1 Task index

| ID    | Task                                        | Depends on | Status   | Primary files                                                                                    |
| ----- | ------------------------------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------ |
| `T1`  | Add configuration and palette               | —          | done     | `config/mapConfig.mjs`, `config/mapPalette.mjs`                                                  |
| `T2`  | Add route utilities                         | `T1`       | done     | `utils/mapRoute.mjs`                                                                             |
| `T3`  | Add style factory                           | `T1`, `T2` | done     | `utils/mapStyle.mjs`                                                                             |
| `T4`  | Add static renderer                         | `T3`       | done     | `scripts/render-map.mjs`, `scripts/map-render-entry.js`                                          |
| `T5`  | Add Dreeve fetch and fallback orchestration | `T2`, `T4` | done     | `scripts/fetch-last-run.mjs`, `utils/lastRun.mjs`                                                |
| `T6`  | Add About card                              | `T5`       | done     | `components/sections/lastRunSection.js`, `components/map/mapAttribution.js`, `app/about/page.js` |
| `T7`  | Update workflow and package metadata        | `T5`       | done     | `package.json`, `package-lock.json`, `.github/workflows/deploy.yml`                              |
| `T8`  | Bootstrap snapshot                          | `T4`, `T5` | pending  | `public/last-run.json`, `public/last-run/light.webp`, `public/last-run/dark.webp`                |
| `T9`  | Verification                                | `T1`–`T8`  | pending  | none                                                                                             |
| `T10` | Future interactive scaffold                 | `T3`       | deferred | `components/map/interactiveMap.js`                                                               |

## 2. Architecture

```text
GitHub Actions
  └─ fetch Dreeve activities
       └─ select newest Run/TrailRun with GPX
            └─ decode polyline5
                 └─ simplify route (~20 m)
                      └─ compute padded bounding box
                           └─ render light + dark map images
                                └─ MapLibre GL JS in headless Chromium
                                     └─ OpenFreeMap vector tiles
                                          ├─ public/last-run/light-<id>-style<v>.webp
                                          ├─ public/last-run/dark-<id>-style<v>.webp
                                          └─ public/last-run.json
                                               └─ next build
                                                    └─ /about static card
```

```text
Failure path
  ├─ Dreeve fetch fails, map render fails, or snapshot validation fails
  │    └─ GET https://samuelp.ing/last-run.json?t=<timestamp>
  │         └─ download light/dark images
  │              └─ use previous successful deployment snapshot
  ├─ live snapshot unavailable
  │    └─ use committed bootstrap snapshot
  └─ bootstrap unavailable
       └─ omit the section; do not break the page
```

## 3. Data Contract

### 3.1 Dreeve request

```text
GET {DREEVE_API_URL}/api/v1/activities
  ?filters[sportType]=Run,TrailRun
  &filters[hasGpx]=true
  &pagination[size]=1
Authorization: Bearer {DREEVE_API_KEY}
Accept: application/json
```

Response is newest first. Use only the first activity.

Required fields:

| Field                  | Use                         |
| ---------------------- | --------------------------- |
| `id`                   | Cache-busting key           |
| `name`                 | Card title                  |
| `startDateLocal`       | Date label                  |
| `distanceInMeter`      | Miles conversion            |
| `movingTimeInSeconds`  | Pace calculation            |
| `location.city`        | Optional location label     |
| `location.state`       | Optional location label     |
| `location.countryCode` | Fallback location label     |
| `encodedPolyline`      | Route geometry; precision 5 |
| `hasGpx`               | Validation only             |

### 3.2 Snapshot file

Path: `public/last-run.json`

The file is public. It MUST NOT contain the API key, raw Dreeve response, or raw/simplified coordinates.

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-10-23T13:17:00.000Z",
  "activity": {
    "id": "activity-id",
    "name": "Morning Run",
    "startDateLocal": "2026-10-23T07:12:00",
    "distanceInMeter": 10000,
    "movingTimeInSeconds": 3000,
    "location": {
      "city": "Brooklyn",
      "state": "New York",
      "countryCode": "us"
    }
  },
  "map": {
    "light": "/last-run/light-activity-id-style1.webp",
    "dark": "/last-run/dark-activity-id-style1.webp",
    "width": 1344,
    "height": 672,
    "styleVersion": 1
  }
}
```

Snapshot rules:

- `schemaVersion` is an integer. Reject unknown versions.
- `styleVersion` is an integer. A fallback image may use an older style version; display it as-is.
- Image paths are root-relative, live under `/last-run/`, and include the activity id plus style version in the filename.
- A query string may be appended for cache busting, but the versioned filename is the primary cache key.
- Raw coordinates are discarded after rendering.
- Missing optional location fields are allowed.
- Missing distance or moving time is allowed; the formatter must degrade to `—`.
- The component formats miles, pace, and date at build time.

### 3.3 Formatting rules

| Output      | Rule                                                                    |
| ----------- | ----------------------------------------------------------------------- |
| Miles       | `distanceInMeter / 1609.344`, one decimal place                         |
| Pace        | `movingTimeInSeconds / 60 / miles`, formatted `m:ss /mi`                |
| Pace guard  | If miles ≤ 0 or moving time is missing, output `—`                      |
| Date        | Parse `startDateLocal` components directly; do not apply UTC conversion |
| Date format | `MMM D` for current year; `MMM D, YYYY` otherwise                       |
| Location    | `city, state`; fall back to `city, countryCode`; omit if empty          |

## 4. Map Rendering

### 4.1 Renderer choice

Primary: MapLibre GL JS in headless Chromium via Playwright.

Why:

- Same renderer as future interactive maps.
- Exact style parity between the static card and interactive maps.
- No native MapLibre binaries.
- Playwright can later be reused for interactive-map visual tests.
- The browser entry is a tiny module; MapLibre's ESM build and worker are served alongside it, so no bundling step is needed.

Alternative: `@maplibre/maplibre-gl-native` + `sharp`.

- Use only if Playwright/WebGL proves unreliable or CI cost is unacceptable.
- The style factory, route helpers, and snapshot contract remain unchanged.
- Document the renderer swap in `scripts/render-map.mjs`; do not change the card.

### 4.2 Build-time render flow

1. `scripts/fetch-last-run.mjs` gets activity metadata and route geometry.
2. `utils/mapStyle.mjs` builds a MapLibre style object for the requested theme.
3. `scripts/render-map.mjs`:
   - Copies MapLibre's ESM build, worker, CSS, and `map-render-entry.js` into a temp directory.
   - Writes a temporary HTML page with a 672 × 336 map container.
   - Starts a local HTTP server on an ephemeral port.
   - Opens the page in Playwright Chromium.
   - Sets `deviceScaleFactor: 2` so the screenshot is 1344 × 672.
   - Calls `map.fitBounds(bounds, { padding: 48, duration: 0 })`.
   - Waits for `map.load()` and the subsequent `idle` event.
   - Waits for a short settle period (120 ms).
   - Screenshots the map container.
   - Converts the PNG screenshot to WebP with `sharp`.
   - Verifies output dimensions and non-empty file size.
   - Closes the browser and local server, then removes the temp directory.
4. Repeat for light and dark.
5. Write both images to versioned filenames, then write the JSON snapshot.
6. Remove stale versioned images only after the JSON is safely in place.

### 4.3 Playwright/Chromium requirements

- Add `playwright` as a devDependency.
- Add `sharp` as a devDependency.
- Install Chromium in CI with `npx playwright install --with-deps chromium`.
- Cache `~/.cache/ms-playwright` keyed by `package-lock.json` hash.
- Chromium launch flags:
  - `--enable-unsafe-swiftshader`
  - `--use-angle=swiftshader`
  - `--ignore-gpu-blocklist`
  - `--enable-webgl`
- Do NOT use `--disable-gpu`.
- Set a render timeout of 30 seconds per image.
- Treat any `map.on("error")` tile/style error as a render failure.
- If one theme fails, do not promote either image.

### 4.4 Map style

Base reference: OpenFreeMap `positron` (light) and `dark` (dark).

Exact source:

- Vector source name: `openmaptiles`
- Vector source URL: `https://tiles.openfreemap.org/planet`
- Reference styles: `https://tiles.openfreemap.org/styles/positron`, `https://tiles.openfreemap.org/styles/dark`
- Remove the `ne2_shaded` raster source and all its layers.

Implementation preference: a minimal local style with only the required layers, derived from Positron/Dark. Do not depend on the remote OpenFreeMap style at build time.

Style requirements:

- No `symbol` layers.
- No labels, POIs, house numbers, road names, shields, or transit stops.
- No boundaries, railways, aeroways, terrain, hillshade, satellite, or raster `ne2_shaded`.
- No buildings, or hide them entirely for a flatter look.
- No patterns, gradients, or 3D.
- Route layers added last, on top of the basemap.

Layer plan:

| Layer ID              | Source layer     | Selection                        | Light paint | Dark paint |
| --------------------- | ---------------- | -------------------------------- | ----------- | ---------- |
| `background`          | —                | —                                | `#fff8eb`   | `#233835`  |
| `water`               | `water`          | polygons, exclude tunnels        | `#d9e6df`   | `#1b2e2b`  |
| `waterway`            | `waterway`       | all                              | `#d9e6df`   | `#1b2e2b`  |
| `park`                | `park`           | polygons                         | `#e6ecdd`   | `#2a453f`  |
| `landcover_wood`      | `landcover`      | wood/forest                      | `#e6ecdd`   | `#2a453f`  |
| `landuse_residential` | `landuse`        | residential/neighbourhood        | `#f7f0e3`   | `#28413d`  |
| `road_casing`         | `transportation` | major/minor roads                | `#e6ddcf`   | `#2e4b46`  |
| `road_major`          | `transportation` | motorway/trunk/primary/secondary | `#fffdf8`   | `#375954`  |
| `road_minor`          | `transportation` | tertiary/minor/service           | `#f3ecdf`   | `#2e4b46`  |
| `road_path`           | `transportation` | path/track                       | `#f3ecdf`   | `#2e4b46`  |
| `route_casing`        | GeoJSON          | route LineString                 | `#fff8eb`   | `#233835`  |
| `route_line`          | GeoJSON          | route LineString                 | `#375954`   | `#aec8ac`  |

Suggested line widths (CSS pixels):

| Layer             | Width          |
| ----------------- | -------------- |
| `route_casing`    | 9              |
| `route_line`      | 5              |
| Major road casing | 2.5–7 by zoom  |
| Major road inner  | 1.5–5 by zoom  |
| Minor road        | 0.75–2 by zoom |

Route line requirements:

- `line-cap: round`
- `line-join: round`
- `line-opacity: 1`
- No dash, glow, or gradient.
- No start/end markers.

### 4.5 Palette

| Token                | Hex       |
| -------------------- | --------- |
| `beige-100`          | `#fff8eb` |
| `beige-200`          | `#eee7da` |
| `green-200`          | `#aec8ac` |
| `green-600`          | `#375954` |
| `green-650`          | `#2e4b46` |
| `green-700`          | `#28413d` |
| `green-800`          | `#233835` |
| Water light          | `#d9e6df` |
| Water dark           | `#1b2e2b` |
| Park light           | `#e6ecdd` |
| Park dark            | `#2a453f` |
| Residential light    | `#f7f0e3` |
| Residential dark     | `#28413d` |
| Road light           | `#fffdf8` |
| Road light secondary | `#f3ecdf` |
| Road casing light    | `#e6ddcf` |
| Road dark            | `#375954` |
| Road dark secondary  | `#2e4b46` |

Create `config/mapPalette.mjs` as the single JS source of truth. Mirror the values in `app/styles/globals.css` and add a comment that both must be updated together.

### 4.6 Attribution

Static image: no MapLibre attribution control is baked into the image. Render with `attributionControl: false`.

HTML attribution below the map:

```text
Map data © OpenStreetMap contributors · Tiles/styles © OpenFreeMap · © OpenMapTiles
```

Include links:

- `https://www.openstreetmap.org/copyright`
- `https://openfreemap.org`
- `https://openmaptiles.org`

Future interactive maps: use MapLibre’s attribution control or a custom compact control with the same links.

## 5. Fallback: Previous Successful Deployment

### 5.1 Stable public paths

| Path                                               | Purpose                                      |
| -------------------------------------------------- | -------------------------------------------- |
| `public/last-run.json`                             | Current snapshot, served at `/last-run.json` |
| `public/last-run/light-<activityId>-style<v>.webp` | Current light map image                      |
| `public/last-run/dark-<activityId>-style<v>.webp`  | Current dark map image                       |
| `public/last-run/light.webp` / `dark.webp`         | Optional committed bootstrap pair            |

The snapshot image paths are versioned by activity id and style version, so a failed promotion cannot make the old JSON point at new image bytes. A query string may be added, but it is not required.

### 5.2 Promotion rules

- A new snapshot is promoted only after:
  - Dreeve activity validation succeeds.
  - Route geometry succeeds.
  - Both light and dark images render successfully.
  - Both images convert and validate.
  - JSON serialization succeeds.
- Write files to temporary paths first, then rename into place.
- If any step fails, leave the existing snapshot untouched.
- Never combine metadata from one activity with an image from another.
- The writer MUST use the activity id that produced the route for both image filenames and the snapshot.
- Both image files MUST have identical dimensions and the same `styleVersion`.
- The JSON MUST be written only after both images are final.
- After JSON promotion, remove stale versioned images. Stable bootstrap files may remain.

### 5.3 Fallback flow

1. Try Dreeve and map rendering.
2. On failure, fetch `{SITE_URL}/last-run.json?t={Date.now()}` with `cache: "no-store"`.
3. Validate `schemaVersion` and required fields.
4. Resolve image paths against `SITE_URL`.
5. Download both images.
6. Validate each image with `sharp`: WebP, 1344 × 672, nonzero size.
7. Rewrite image paths to versioned local `/last-run/light-<id>-style<v>.webp` and `/last-run/dark-<id>-style<v>.webp` paths.
8. Write the versioned images, then the JSON snapshot.
9. Use the snapshot.
10. If the live snapshot fails, use the committed bootstrap snapshot.
11. If no valid bootstrap exists, `LastRunSection` returns `null`.

### 5.4 Semantics

Default fallback means “last successful deployment”:

- The build runs before the new deployment.
- `https://samuelp.ing` still serves the previous successful deployment.
- If deployment fails after a successful build, the live site remains the previous snapshot.
- The next build fallback uses the previous snapshot.

If “last successful build even when deployment failed” is required:

- Commit the snapshot after a successful build, or
- Store it as a GitHub Release asset, or
- Use a separate data branch.

Do not use GitHub Actions cache or artifacts as the durable fallback. They expire and are awkward to restore.

### 5.5 Bootstrap

Commit one known-good snapshot and image pair:

- `public/last-run.json`
- `public/last-run/light.webp`
- `public/last-run/dark.webp`

The bootstrap supports local development and first-deploy failures. It is overwritten in the CI workspace by a successful fetch, not committed after every run.

## 6. About Card UI

### 6.1 Placement

Modify `app/about/page.js`:

```text
<PageTitle />
<MDXContent />
<NowSection />
<LastRunSection />   ← add after NowSection
```

### 6.2 Structure

- `<section>` with heading “Latest run”.
- Heading style: `font-display text-2xl font-medium`.
- Card: `rounded-lg bg-beige-100 shadow-card dark:bg-green-700 dark:shadow-none`.
- Map panel: full width, `aspect-2/1`, `last-run-map`, `bg-beige-200 dark:bg-green-800`.
- Stats block: padding, title, date/location, distance/pace.
- Attribution line: `text-xs text-muted`, links underlined.
- No outer link for v1.

### 6.3 Theme image swap

Use CSS custom properties so only the active theme image is requested:

- Component sets `--last-run-map-light` and `--last-run-map-dark`.
- Base rule: `background-image: var(--last-run-map-light)`.
- `.dark` rule: `background-image: var(--last-run-map-dark)`.
- `background-size: cover`
- `background-position: center`

Do not use two `<img>` elements with `hidden` classes; browsers may load both.

### 6.4 Accessibility

- Use a `<figure>` with a visible caption: “Approximate route.”
- Map panel: `role="img"` with an `aria-label` that includes run name, date, and distance.
- Stats are real text and remain accessible if the image fails.
- Attribution links are keyboard accessible.
- Ensure route/map contrast in both themes.
- Avoid making the map the only source of information.

### 6.5 Responsive behavior

- Map remains 2:1 at all widths.
- Stats stack vertically below `sm`.
- Title truncates or wraps without overflow.
- Card must not exceed the `max-w-2xl` About column.

## 7. Future Interactive Maps

### 7.1 Packages

- `maplibre-gl` — already added for the build-time renderer.
- `@vis.gl/react-maplibre` — add when the first interactive feature is implemented.
- Alternative wrapper: `react-map-gl/maplibre`.

### 7.2 Shared modules

Interactive maps MUST reuse:

- `config/mapConfig.mjs`
- `config/mapPalette.mjs`
- `utils/mapStyle.mjs`
- `utils/mapRoute.mjs`
- `components/map/mapAttribution.js`

### 7.3 Component contract

`components/map/interactiveMap.js`:

- `'use client'`.
- Lazy-loaded with `next/dynamic` and `ssr: false`.
- Props: `route`, `bounds`, `labels`, `height`, `className`, `interactive`.
- Uses `Map`, `Source`, `Layer`, `NavigationControl`, `ScaleControl`, `AttributionControl`.
- Style from `createMapStyle({ theme, labels, route })`.
- Fixed height or aspect ratio to avoid layout shift.
- Lazy-loaded so MapLibre JS is not included on pages without maps.

### 7.4 Theme changes

MapLibre `setStyle` resets custom sources and layers. Choose one:

- Recommended for v1: remount the map with `key={theme}`. Simple and correct; accepts a brief reload.
- Optimization later: call `setStyle` and re-add the route source/layer after `styledata`.

### 7.5 Data and security

- Dreeve API key MUST remain server-side.
- Interactive maps may use build-time baked route data, public data, or a server/proxy endpoint.
- Do not call Dreeve directly from the browser.
- If live activity data is needed, add a Cloudflare Worker or equivalent proxy; do not expose the read/write Dreeve key.

### 7.6 Tile hosting

- Use the OpenFreeMap public instance for v1.
- No home-server exposure.
- If self-hosting later:
  - OpenFreeMap self-host requires roughly 300 GB SSD and 4 GB RAM for the prebuilt planet.
  - Protomaps PMTiles is a lighter alternative; host on Cloudflare R2 or GitHub Releases.
  - If home-hosted, use Cloudflare Tunnel or Tailscale; never direct port-forward.
  - Only change the source URL in `config/mapConfig.mjs`; keep components unchanged.

## 8. Files

| Path                                       | Action                | Responsibility                                                           |
| ------------------------------------------ | --------------------- | ------------------------------------------------------------------------ |
| `docs/LastRunMap.md`                       | add                   | This implementation plan                                                 |
| `config/mapConfig.mjs`                     | add                   | OpenFreeMap URLs, dimensions, attribution, simplify tolerance, timeouts  |
| `config/mapPalette.mjs`                    | add                   | Light/dark palette mirrored from `globals.css`                           |
| `utils/mapRoute.mjs`                       | add                   | Decode polyline5, simplify, bbox, GeoJSON, fit padding                   |
| `utils/mapStyle.mjs`                       | add                   | Build MapLibre style object for light/dark, labels on/off, route overlay |
| `utils/lastRun.mjs`                        | add                   | Miles/pace/date/location formatting and snapshot validation              |
| `scripts/render-map.mjs`                   | add                   | Playwright + local server + MapLibre ESM static map renderer             |
| `scripts/map-render-entry.js`              | add                   | Browser entry that initializes MapLibre and signals readiness            |
| `scripts/fetch-last-run.mjs`               | add                   | Orchestrate Dreeve fetch, render, fallback, atomic snapshot write        |
| `components/sections/lastRunSection.js`    | add                   | Server component that reads the snapshot and renders the card            |
| `components/map/mapAttribution.js`         | add                   | Shared attribution links                                                 |
| `components/map/interactiveMap.js`         | future                | Client component for future interactive maps                             |
| `app/about/page.js`                        | modify                | Insert `<LastRunSection />` after `<NowSection />`                       |
| `app/styles/globals.css`                   | modify                | `last-run-map` theme image utility                                       |
| `package.json`                             | modify                | Dependencies and `fetch:last-run` script                                 |
| `package-lock.json`                        | modify                | Locked dependency graph                                                  |
| `.github/workflows/deploy.yml`             | modify                | Schedule, Node 22, Playwright install/cache, fetch step                  |
| `public/last-run.json`                     | generated + bootstrap | Public snapshot                                                          |
| `public/last-run/light-<id>-style<v>.webp` | generated             | Current light map image                                                  |
| `public/last-run/dark-<id>-style<v>.webp`  | generated             | Current dark map image                                                   |
| `public/last-run/light.webp` / `dark.webp` | optional bootstrap    | Stable committed bootstrap pair                                          |

## 9. Package Changes

### 9.1 Dependencies

| Package                  | Type              | Reason                                       |
| ------------------------ | ----------------- | -------------------------------------------- |
| `maplibre-gl`            | dependency        | Build-time renderer; future interactive maps |
| `@vis.gl/react-maplibre` | dependency, later | Future interactive map wrapper               |
| `playwright`             | devDependency     | Headless Chromium for static rendering       |
| `sharp`                  | devDependency     | PNG screenshot → WebP conversion             |

The static renderer serves MapLibre's ESM build, worker, CSS, and a tiny entry module directly from a temp directory. No bundling step is required.

### 9.2 Scripts

```json
{
  "scripts": {
    "fetch:last-run": "node scripts/fetch-last-run.mjs"
  }
}
```

Do not add the fetch step to the default `build` script. CI calls it explicitly before `next build`; local builds without secrets should still work using the bootstrap snapshot.

## 10. GitHub Actions Changes

### 10.1 Triggers

Keep:

- `push` to `main`
- `workflow_dispatch`

Add:

- `schedule` daily at `17 13 * * *` UTC for the latest-run refresh.
- Keep the existing `0 6 * * *` UTC visitor-stats refresh; both schedules run the full workflow.

Adjust the latest-run time after the user’s typical run schedule.

### 10.2 Job changes

| Step               | Change                                                           |
| ------------------ | ---------------------------------------------------------------- |
| Runner             | Keep `ubuntu-latest`                                             |
| Node               | Bump from 20 to 22                                               |
| Install            | `npm ci`                                                         |
| Playwright cache   | Cache `~/.cache/ms-playwright` keyed by `package-lock.json` hash |
| Playwright install | `npx playwright install --with-deps chromium`                    |
| Fetch              | `npm run fetch:last-run` with Dreeve env vars                    |
| Build              | `npx next build`                                                 |
| Deploy             | Unchanged                                                        |

### 10.3 Environment variables

| Variable                | Scope           | Required | Default               |
| ----------------------- | --------------- | -------- | --------------------- |
| `DREEVE_API_URL`        | Fetch step only | Yes      | none                  |
| `DREEVE_API_KEY`        | Fetch step only | Yes      | none                  |
| `SITE_URL`              | Fetch step only | No       | `https://samuelp.ing` |
| `MAP_RENDER_TIMEOUT_MS` | Fetch step only | No       | `30000`               |

Do not expose any of these to `next build` or the client.

### 10.4 Failure behavior

- The fetch script MUST exit 0 when it can use a fallback.
- The fetch script SHOULD emit `::warning::` annotations for fallback use.
- The build MUST continue without the section if no snapshot exists.
- The deploy MUST NOT be blocked by Dreeve or OpenFreeMap outages.

## 11. Implementation Tasks

### T1 — Add configuration and palette

Files:

- `config/mapConfig.mjs`
- `config/mapPalette.mjs`

Acceptance:

- OpenFreeMap style/source URLs are centralized.
- Map dimensions, tolerance, timeout, and attribution are centralized.
- Export `LAST_RUN_SCHEMA_VERSION = 1` and `MAP_STYLE_VERSION = 1`.
- Palette values match `app/styles/globals.css`.

### T2 — Add route utilities

Files:

- `utils/mapRoute.mjs`

Acceptance:

- Decodes precision-5 encoded polylines.
- Simplifies to ~20 m tolerance.
- Computes a padded bbox.
- Emits GeoJSON LineString coordinates in `[lon, lat]` order.
- Handles empty or single-point routes by failing validation.

### T3 — Add style factory

Files:

- `utils/mapStyle.mjs`

Acceptance:

- Produces light and dark style objects.
- Removes all symbol layers.
- Removes/hides boundaries, railways, aeroways, buildings, and raster relief.
- Adds route casing and route line on top.
- Accepts `labels: false` for the card and `labels: true` for future maps.
- Does not require glyphs or sprites when labels are false.

### T4 — Add static renderer

Files:

- `scripts/render-map.mjs`
- `scripts/map-render-entry.js`

Acceptance:

- Renders 1344 × 672 WebP.
- Waits for tiles and idle state.
- Fails on tile/style errors.
- Respects timeout.
- Cleans temporary files.
- Can render both themes from the same route/style config.

### T5 — Add Dreeve fetch and fallback orchestration

Files:

- `scripts/fetch-last-run.mjs`
- `utils/lastRun.mjs`

Acceptance:

- Fetches the newest Run/TrailRun with GPX.
- Validates activity data.
- Renders both images.
- Writes snapshot atomically.
- Uses live deployment fallback on failure.
- Uses committed bootstrap as second fallback.
- Exits 0 with a warning when fallback succeeds.
- Exits 0 and omits the snapshot when no fallback exists.

### T6 — Add About card

Files:

- `components/sections/lastRunSection.js`
- `components/map/mapAttribution.js`
- `app/about/page.js`

Acceptance:

- Section appears after `<NowSection />`.
- Light/dark image swaps via CSS variables.
- Distance is miles; pace is `m:ss /mi`.
- Map has no labels or markers.
- Attribution is visible and linked.
- Missing snapshot renders nothing without error.
- No client JS is added for the map.

### T7 — Update workflow and package metadata

Files:

- `package.json`
- `package-lock.json`
- `.github/workflows/deploy.yml`

Acceptance:

- Node 22.
- Playwright Chromium installed and cached.
- Fetch step runs before build.
- Secrets are scoped to the fetch step.
- Daily schedule and manual trigger exist.
- Build succeeds if fetch uses fallback.

### T8 — Bootstrap snapshot

Status: pending. Local development has no `DREEVE_API_URL` / `DREEVE_API_KEY`, and `https://samuelp.ing/last-run.json` currently returns 404. Run once with real credentials to create the bootstrap; do not commit synthetic preview data.

Files:

- `public/last-run.json`
- `public/last-run/light.webp`
- `public/last-run/dark.webp`

Acceptance:

- Generated once from a real activity.
- Valid schema.
- Correct image dimensions.
- Serves as local-dev and first-deploy fallback.

### T8.1 Local bootstrap commands

Run from the repository root. The fetch script reads the process environment
directly; it does not load `.env`.

```bash
cd /Users/samuelping/samuelp.ing-last-run-map

export DREEVE_API_URL='https://your-dreeve-host.example.com'
export DREEVE_API_KEY='your-dreeve-api-key'

npm ci
npx playwright install chromium
npm run fetch:last-run
```

`DREEVE_API_URL` is the base URL only. Do not append `/api/v1/activities`; the
script adds that path.

Verify the generated files:

```bash
jq . public/last-run.json
find public/last-run -maxdepth 1 -type f -name '*.webp' -print
sips -g pixelWidth -g pixelHeight public/last-run/*.webp
```

If these should become the committed bootstrap, commit them explicitly:

```bash
git add public/last-run.json public/last-run
git commit -m 'Add latest run bootstrap snapshot'
```

### T9 — Verification

Run the checklist in section 12.

### T9.1 Local verification

| Check                                             | Result                                      |
| ------------------------------------------------- | ------------------------------------------- |
| `npm run lint`                                    | pass                                        |
| `npx prettier --check` on changed files           | pass                                        |
| `npm ci` then `npm run build`                     | pass                                        |
| `npm run build` with a temporary preview snapshot | pass                                        |
| Light and dark WebP render                        | pass, 1344 × 672                            |
| About card renders after “Currently”              | pass                                        |
| Light/dark image swap                             | pass                                        |
| Mobile layout at 390 px                           | pass                                        |
| Dreeve success + render + write (local mock)      | pass                                        |
| Previous deployment fallback (local mock site)    | pass                                        |
| Dreeve missing credentials path                   | pass, exits 0 and omits the section         |
| Real Dreeve fetch                                 | not run locally; requires CI secrets        |
| Bootstrap snapshot                                | not committed; requires one real Dreeve run |

### T10 — Future interactive scaffold (deferred)

Files:

- `components/map/interactiveMap.js`

Acceptance:

- Can render OpenFreeMap with the shared style factory.
- Lazy-loaded; no impact on `/about`.
- Theme switch does not lose the route layer.
- Uses the shared attribution component.
- No Dreeve key in client code.

## 12. Verification Checklist

### Build and data

- [ ] `npm run fetch:last-run` succeeds with valid Dreeve credentials.
- [ ] `public/last-run.json` has `schemaVersion: 1`.
- [ ] Snapshot contains no coordinates, raw polyline, or API key.
- [ ] Both WebP files are 1344 × 672.
- [ ] Image file size is acceptable; target < 250 KB each.
- [ ] `npm run build` succeeds.
- [ ] `out/last-run.json` and `out/last-run/*.webp` exist.

### Fallback

- [ ] Simulate Dreeve failure with an unreachable `DREEVE_API_URL`.
- [ ] Confirm the live deployment snapshot is downloaded and used.
- [ ] Simulate map-render failure; confirm the previous snapshot is retained.
- [ ] Confirm metadata and images are never mixed across activities.
- [ ] Remove the live snapshot and bootstrap; confirm the section is omitted.
- [ ] Confirm the build still succeeds in all fallback cases.

### UI

- [ ] Card appears after “Currently” on `/about`.
- [ ] Light mode uses the light image.
- [ ] Dark mode uses the dark image.
- [ ] Only one theme image is requested by the browser.
- [ ] Map has no labels, POIs, buildings, boundaries, or markers.
- [ ] Route is visible in both themes.
- [ ] Distance displays in miles.
- [ ] Pace displays as `m:ss /mi`.
- [ ] Date does not shift by timezone.
- [ ] Layout works at 320 px, 768 px, and desktop widths.
- [ ] Attribution links are visible and keyboard accessible.
- [ ] Screen-reader label describes the map.

### Security and performance

- [ ] `grep -R "DREEVE" out` returns no secret.
- [ ] `grep -R "drv_" out` returns no key.
- [ ] `grep -R "encodedPolyline" out` returns no raw route.
- [ ] `/about` does not load MapLibre JS.
- [ ] No runtime requests to Dreeve.
- [ ] No runtime requests to a map tile provider for the card.

### Workflow

- [ ] Scheduled run triggers successfully.
- [ ] Manual `workflow_dispatch` triggers successfully.
- [ ] Playwright browser cache restores on subsequent runs.
- [ ] Fetch step failure does not block deployment when fallback exists.
- [ ] Secrets are not available to the build step.

## 13. Risks and Mitigations

| Risk                                       | Impact                       | Mitigation                                                       |
| ------------------------------------------ | ---------------------------- | ---------------------------------------------------------------- |
| Playwright/WebGL fails in CI               | No new image                 | Use SwiftShader flags, wait for idle, timeout, fallback snapshot |
| Playwright install is slow                 | Longer builds                | Cache `~/.cache/ms-playwright`; render only two images           |
| OpenFreeMap outage                         | Tile requests fail           | Fallback snapshot; no SLA assumed                                |
| Live site fallback unavailable             | No previous snapshot         | Committed bootstrap; omit section as last resort                 |
| Style drift between static and interactive | Visual inconsistency         | Shared style factory; simple fill/line layers; no labels         |
| GitHub Pages caches snapshot               | Stale fallback               | `cache: no-store`; timestamp query; versioned image URLs         |
| Dreeve key leaks                           | Serious; key can mutate data | Fetch-step-only env; never client; grep build output             |
| Image weight too high                      | Slower About page            | WebP quality 82; one theme loaded; target < 250 KB               |
| Theme switch loses route layer             | Broken interactive map       | Remount on theme change or re-add route after `styledata`        |
| OpenFreeMap style changes                  | Build instability            | Use a local minimal style, not the remote style URL              |
| Native renderer complexity                 | CI fragility                 | Use Playwright primary; Native only as alternative               |

## 14. Open Questions and Defaults

| Question                                                | Default if no response                        |
| ------------------------------------------------------- | --------------------------------------------- |
| Static renderer: Playwright or MapLibre Native?         | Playwright                                    |
| Fallback: last deployment or last successful build?     | Last successful deployment                    |
| Schedule: daily or every 6 hours?                       | Daily at 13:17 UTC                            |
| Labels on card map: none or city-only?                  | None                                          |
| Add interactive-map scaffold now or with first feature? | With first feature; keep shared modules ready |
| Commit bootstrap snapshot?                              | Yes, one known-good pair                      |
| Self-host tiles now?                                    | No; use OpenFreeMap public                    |
| Activity link?                                          | Omit for v1                                   |

## 15. Appendix A — Why not Geoapify

Geoapify was considered for the static card and is a good standalone static-map API. It is not selected because:

- The site will need interactive maps later.
- Using Geoapify now would create a second map style/provider system.
- OpenFreeMap + MapLibre keeps one style factory, one palette, and one tile source for both static and interactive maps.
- OpenFreeMap requires no API key and is self-hostable later.

## 16. Appendix B — MapLibre Native alternative

If Playwright/WebGL becomes unreliable or build time is unacceptable:

- Replace `scripts/render-map.mjs` with `@maplibre/maplibre-gl-native` + `sharp`.
- Pin `ubuntu-24.04` and Node 22/24.
- Use `ratio: 2` and verify the raw RGBA buffer dimensions.
- Compute center/zoom from the padded bbox; MapLibre Native does not provide `fitBounds`.
- Keep `utils/mapStyle.mjs`, `utils/mapRoute.mjs`, and the snapshot contract unchanged.
- Use the same local minimal style to minimize renderer differences.
- Keep Playwright as an optional visual-regression tool for future interactive maps.

## 17. Appendix C — Reference URLs

- Dreeve API: `https://docs.dreeve.app/api/`
- Dreeve OpenAPI: `https://docs.dreeve.app/api/openapi.yaml`
- OpenFreeMap: `https://openfreemap.org`
- OpenFreeMap styles: `https://tiles.openfreemap.org/styles/positron`, `https://tiles.openfreemap.org/styles/dark`
- MapLibre GL JS: `https://maplibre.org/maplibre-gl-js/docs/`
- MapLibre style spec: `https://maplibre.org/maplibre-style-spec/`
- Playwright: `https://playwright.dev`
- Maputnik: `https://maputnik.github.io`
