/**
 * Shared MapLibre/OpenFreeMap configuration.
 *
 * Keep this module free of Node-only APIs: future interactive map components
 * will import it in the browser.
 */
export const MAP_CONFIG = Object.freeze({
  sourceName: 'openmaptiles',
  sourceUrl: 'https://tiles.openfreemap.org/planet',
  glyphsUrl: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  referenceStyleUrls: {
    light: 'https://tiles.openfreemap.org/styles/positron',
    dark: 'https://tiles.openfreemap.org/styles/dark',
  },
  dimensions: Object.freeze({
    width: 1344,
    height: 672,
    displayWidth: 672,
    displayHeight: 336,
    pixelRatio: 2,
  }),
  fitPadding: 48,
  maxFitZoom: 16,
  simplifyToleranceMeters: 20,
  renderTimeoutMs: 30_000,
  route: Object.freeze({
    sourceId: 'last-run-route',
    casingLayerId: 'last-run-route-casing',
    lineLayerId: 'last-run-route-line',
    casingWidth: 9,
    lineWidth: 5,
  }),
  attribution: Object.freeze([
    {
      prefix: 'Map data ©',
      label: 'OpenStreetMap contributors',
      href: 'https://www.openstreetmap.org/copyright',
    },
    {
      prefix: 'Tiles/styles ©',
      label: 'OpenFreeMap',
      href: 'https://openfreemap.org',
    },
    {
      prefix: '©',
      label: 'OpenMapTiles',
      href: 'https://openmaptiles.org',
    },
  ]),
});

export const LAST_RUN_CONFIG = Object.freeze({
  schemaVersion: 1,
  styleVersion: 1,
  snapshotPath: 'public/last-run.json',
  imageDir: 'public/last-run',
  publicImageDir: '/last-run',
  siteUrl: 'https://samuelp.ing',
  fallbackTimeoutMs: 20_000,
});
