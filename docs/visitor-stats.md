# Visitor stats data pipeline

How the hidden `/stats` page gets its data. Two committed snapshots are merged
at build time by `utils/visitorStats.js` (synchronous, network-free):

- **Umami** (`stats.samuelp.ing`) — from May 2025 onward.
- **GoatCounter** — January 2024 to 24 May 2025, before Umami existed.

| File                                  | Written by                       | Committed?           |
| ------------------------------------- | -------------------------------- | -------------------- |
| `data/umami-country-stats.json`       | `update-umami-snapshot.mjs`      | Yes — fallback       |
| `data/goatcounter-country-stats.json` | `build-goatcounter-snapshot.mjs` | Yes — frozen history |
| `public/data/countries-110m.geojson`  | `build-country-geojson.mjs`      | Yes — map geometry   |

## Scripts

Standalone ESM scripts; none is imported by the app.

### `npm run stats:geojson` — `build-country-geojson.mjs`

One-time generator for the globe geometry. Fetches pinned Natural Earth 110m
data, resolves each country's ISO alpha-2 code (skipping missing, `-99`, `AQ`),
rounds coordinates, cleans rings, and writes minified
`public/data/countries-110m.geojson`. Run once and commit; not run in CI.

### `npm run stats:snapshot` — `update-umami-snapshot.mjs`

Refreshes the Umami snapshot from the Umami HTTP API. Reads `UMAMI_API_KEY`
(missing → warn, exit `0`, keep the file), fetches country metrics + overall
stats in parallel (15s timeout), normalizes to `{ code, visitors }`, and writes
`data/umami-country-stats.json` atomically. Bails without touching the file if
zero countries come back.

### `npm run stats:goatcounter` — `build-goatcounter-snapshot.mjs`

Converts a manually exported GoatCounter JSON dump into the frozen snapshot.
Reads from `temp/goatcounter-export/` (gitignored; override with a path
argument), requires `export_version` 1.x, excludes `event: true` paths, and
applies the hard `CUTOFF = '2025-05-25'` — the export only takes a start date
and runs to the present, so anything on/after the cutoff belongs to Umami. It
counts unknown locations in the total only, collapses `US-TX` → `US`, and
writes `data/goatcounter-country-stats.json` atomically. Run once; no CI job.

Export it from GoatCounter → Settings → Export → JSON, from date `2024-01-01`.

## Is the Umami snapshot fetched at build time?

Yes, in CI — just not by Next.js. `deploy.yml` runs `npm run stats:snapshot`
**before** `npx next build`, so each run bakes fresh data into `out/`. It's a
separate pre-build script because the API key must never reach the browser or
the Next bundle; a fetch inside `next build` would need the key in the Next
environment. The committed file is only a fallback for local dev and for when
the key/API is unavailable (`continue-on-error: true`). Refresh it by hand with
`UMAMI_API_KEY=umami_... npm run stats:snapshot`.

`UMAMI_API_KEY` is a GitHub Actions secret (`gh secret set UMAMI_API_KEY`),
created in Umami → Profile → Settings → API keys.

## Merge

`GetVisitorStats()` filters to valid two-letter codes (excluding `ZZ`), dedupes
by summing, sorts by visitors then code, and sums
`umami.totalVisitors + goatcounter.totalVisitors` (clamped to the country sum).
Country names are resolved server-side to avoid ICU hydration mismatches. An
empty GoatCounter seed degrades to Umami-only.
