# Visitor stats data pipeline

How the hidden `/stats` page gets its data. Two snapshots are merged at build
time by `utils/visitorStats.js` (synchronous, network-free):

- **Umami** (`stats.samuelp.ing`) — from May 2025 onward.
- **GoatCounter** — January 2024 to 24 May 2025, before Umami existed.

| File                                  | Written by                       | Committed?                       |
| ------------------------------------- | -------------------------------- | -------------------------------- |
| `data/umami-country-stats.json`       | `update-umami-snapshot.mjs`      | No — generated before each build |
| `data/goatcounter-country-stats.json` | `build-goatcounter-snapshot.mjs` | Yes — frozen history             |
| `public/data/countries-110m.geojson`  | `build-country-geojson.mjs`      | Yes — map geometry               |

## Scripts

Standalone ESM scripts; none is imported by the app.

### `npm run stats:geojson` — `build-country-geojson.mjs`

One-time generator for the globe geometry. Fetches pinned Natural Earth 110m
data, resolves each country's ISO alpha-2 code (skipping missing, `-99`, `AQ`),
rounds coordinates, cleans rings, and writes minified
`public/data/countries-110m.geojson`. Run once and commit; not run in CI.

### `npm run stats:snapshot` — `update-umami-snapshot.mjs`

Refreshes the Umami snapshot from the Umami HTTP API. Requires
`UMAMI_API_KEY` (missing → error, non-zero exit), fetches country metrics +
overall stats in parallel (15s timeout), normalizes to `{ code, visitors }`, and
writes `data/umami-country-stats.json` atomically. Any failure — missing key,
non-OK response, zero countries — exits non-zero without writing.

### `npm run stats:goatcounter` — `build-goatcounter-snapshot.mjs`

Converts a manually exported GoatCounter JSON dump into the frozen snapshot.
Reads from `temp/goatcounter-export/` (gitignored; override with a path
argument), requires `export_version` 1.x, excludes `event: true` paths, and
applies the hard `CUTOFF = '2025-05-25'` — the export only takes a start date
and runs to the present, so anything on/after the cutoff belongs to Umami. It
counts unknown locations in the total only, collapses `US-TX` → `US`, and
writes `data/goatcounter-country-stats.json` atomically. Run once; no CI job.

Export it from GoatCounter → Settings → Export → JSON, from date `2024-01-01`.

## Build-time refresh

`data/umami-country-stats.json` is **not committed**. `deploy.yml` runs
`npm run stats:snapshot` **before** `npx next build`, so each run bakes fresh
data into `out/`; if the fetch fails the step fails and the whole deploy stops.
There is no fallback snapshot, so local `npm run dev` / `npm run build` need the
file generated first:

```bash
UMAMI_API_KEY=umami_... npm run stats:snapshot
```

The fetch is a separate pre-build script rather than a step inside Next.js so
the API key never reaches the browser or the Next bundle.

`UMAMI_API_KEY` is a GitHub Actions secret (`gh secret set UMAMI_API_KEY`),
created in Umami → Profile → Settings → API keys.

## Merge

`GetVisitorStats()` filters to valid two-letter codes (excluding `ZZ`), dedupes
by summing, sorts by visitors then code, and sums
`umami.totalVisitors + goatcounter.totalVisitors` (clamped to the country sum).
Country names are resolved server-side to avoid ICU hydration mismatches. An
empty GoatCounter seed degrades to Umami-only.
