# Visitor stats data pipeline

Notes on how the hidden `/stats` page gets its data. The page shows a 3D visitor
globe and a top-countries list; the numbers come from two committed JSON
snapshots that are merged at build time.

- **Umami** (`https://stats.samuelp.ing`) — from May 2025 onward.
- **GoatCounter** — January 2024 to 24 May 2025, before Umami existed.

## Data files

| File | Written by | Committed? |
| --- | --- | --- |
| `data/umami-country-stats.json` | `update-umami-snapshot.mjs` | Yes — fallback snapshot |
| `data/goatcounter-country-stats.json` | `build-goatcounter-snapshot.mjs` | Yes — one-time, frozen history |
| `public/data/countries-110m.geojson` | `build-country-geojson.mjs` | Yes — map geometry |

`utils/visitorStats.js` imports the two country snapshots, merges them, and is
the only thing the page reads. It is synchronous and network-free.

## Scripts

Three standalone ESM scripts live in `scripts/`. None of them is imported by the
Next.js app; they only write the JSON/GeoJSON files above.

### `build-country-geojson.mjs` — `npm run stats:geojson`

One-time generator for the globe's country geometry.

- Fetches the pinned Natural Earth 110m countries GeoJSON
  (`nvkelso/natural-earth-vector@v5.1.2`).
- Resolves each country's ISO alpha-2 code (`ISO_A2_EH`, falling back to
  `ISO_A2`), skipping missing, `-99`, and `AQ` (Antarctica).
- Rounds coordinates to 2 decimals, drops duplicate/closing-less rings and
  degenerate polygons, and writes minified
  `public/data/countries-110m.geojson`.
- **Run once and commit the output.** It is a development tool and must not run
  in CI.

### `update-umami-snapshot.mjs` — `npm run stats:snapshot`

Refreshes the Umami snapshot from the Umami HTTP API.

- Reads `UMAMI_API_KEY`. If it is missing or empty it prints a warning, exits
  `0`, and leaves the existing snapshot untouched.
- Requests, in parallel with a 15-second timeout, the country metrics
  (`type=country&startAt=0&endAt=<now>`) and the overall stats for the site.
- Normalizes rows to `{ code, visitors }`, keeps only `/^[A-Z]{2}$/` codes that
  are not `ZZ`, dedupes by summing, and sorts descending.
- Bails out without touching the file if the API returns zero countries.
- Writes `data/umami-country-stats.json` atomically (`.tmp` + `rename`).
- Run by CI before the build (see below), or locally with
  `UMAMI_API_KEY=umami_... npm run stats:snapshot`.

### `build-goatcounter-snapshot.mjs` — `npm run stats:goatcounter`

Converts a manually exported GoatCounter JSON dump into the frozen GoatCounter
snapshot. Run once; there is no CI job.

- Reads the export from `temp/goatcounter-export/` (gitignored; accepts either
  the raw files or the single folder the ZIP extracts into). Override with
  `node scripts/build-goatcounter-snapshot.mjs <dir>`.
- Requires `info.json` `export_version` to start with `1.`.
- Reads `paths.jsonl` and excludes any path with `event: true`.
- Reads `location_stats.jsonl` and applies the hard cutoff
  **`CUTOFF = '2025-05-25'`**: the export only takes a *start* date and always
  runs to the present, so everything on/after that date belongs to Umami and is
  skipped. This is what makes the snapshot frozen and re-exports idempotent.
- Counts unknown locations toward the total but not toward any country, and
  collapses `US-TX` to `US`.
- Cross-checks against `hit_stats.jsonl` and warns on a mismatch.
- Writes `data/goatcounter-country-stats.json` atomically.

The user produces the export from GoatCounter → **Settings → Export → JSON**,
with **Export from date = 2024-01-01**. The raw export is never committed.

## Is the Umami snapshot fetched at build time?

Yes — just not *by Next.js*.

The site is a static export (`output: 'export'`), so there is no server at
runtime; all data has to be resolved before or during `next build`. The
`.github/workflows/deploy.yml` workflow runs `npm run stats:snapshot` as a step
**before** `npx next build`, so every scheduled/manual run fetches fresh Umami
data and bakes it into `out/`.

It is a separate pre-build step rather than a fetch inside Next.js on purpose:
the Umami API key must never reach the browser or the Next.js bundle. A fetch
inside `next build` would need the key in the Next build environment and could
inline it into server/client output in `out/`. Keeping it in a standalone script
means the key never enters the Next.js process.

The committed `data/umami-country-stats.json` is only a **fallback**:

- It gives local `npm run dev` / `npm run build` real data with no API key.
- It keeps `/stats` working if the API is down or the secret is missing — the
  refresh step has `continue-on-error: true`, so the build proceeds with the
  committed copy.

The refreshed file is never committed; only the fallback is. To refresh the
fallback by hand, run `npm run stats:snapshot` locally with a key.

`UMAMI_API_KEY` is stored as a GitHub Actions secret
(`gh secret set UMAMI_API_KEY --repo samuel-ping/samuelp.ing`), created in
Umami → Profile → Settings → API keys.

## Merging

`utils/visitorStats.js` (`GetVisitorStats`):

- Reads both snapshots, filters to valid two-letter codes (excluding `ZZ`),
  dedupes by summing, and sorts by visitors descending then code ascending.
- Resolves country names server-side via `Intl.DisplayNames` and passes them to
  the client, so there is no hydration mismatch from ICU differences.
- Sums `umami.totalVisitors + goatcounter.totalVisitors`, clamped up to the sum
  of the country rows.
- Returns `{ totalVisitors, countries, sources }`. The empty GoatCounter seed
  (`totalVisitors: 0`, `countries: []`) degrades cleanly to Umami-only.

## Commands

```bash
npm run stats:geojson       # regenerate public/data/countries-110m.geojson
npm run stats:snapshot      # refresh data/umami-country-stats.json (needs UMAMI_API_KEY)
npm run stats:goatcounter   # rebuild data/goatcounter-country-stats.json from temp/goatcounter-export/
```
