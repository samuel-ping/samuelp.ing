import { LAST_RUN_CONFIG, MAP_CONFIG } from '../config/mapConfig.mjs';
import { MAP_PALETTE } from '../config/mapPalette.mjs';

const MAJOR_ROAD_CLASSES = ['motorway', 'trunk', 'primary', 'secondary'];
const MINOR_ROAD_CLASSES = ['tertiary', 'minor', 'service'];
const PATH_CLASSES = ['path', 'track'];
const LABEL_CLASSES = ['city', 'town'];

function sourceLayers() {
  return {
    [MAP_CONFIG.sourceName]: {
      type: 'vector',
      url: MAP_CONFIG.sourceUrl,
    },
  };
}

function inFilter(property, values) {
  return ['in', ['get', property], ['literal', values]];
}

function roadFilter(classes) {
  return [
    'all',
    ['==', ['geometry-type'], 'LineString'],
    inFilter('class', classes),
  ];
}

function lineWidth(stops) {
  return ['interpolate', ['linear'], ['zoom'], ...stops];
}

export function createMapStyle({
  theme = 'light',
  labels = false,
  route = null,
} = {}) {
  const palette = MAP_PALETTE[theme];
  if (!palette) {
    throw new Error(`Unknown map theme: ${theme}`);
  }

  const sources = sourceLayers();
  if (route) {
    sources[MAP_CONFIG.route.sourceId] = {
      type: 'geojson',
      data: route,
    };
  }

  const style = {
    version: 8,
    name: `samuelp.ing ${theme}`,
    metadata: {
      'samuelp:theme': theme,
      'samuelp:labels': labels,
      'samuelp:styleVersion': LAST_RUN_CONFIG.styleVersion,
    },
    sources,
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': palette.background,
        },
      },
      {
        id: 'landuse_residential',
        type: 'fill',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'landuse',
        filter: inFilter('class', ['residential', 'neighbourhood']),
        paint: {
          'fill-color': palette.residential,
        },
      },
      {
        id: 'park',
        type: 'fill',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'park',
        filter: ['==', ['geometry-type'], 'Polygon'],
        paint: {
          'fill-color': palette.park,
        },
      },
      {
        id: 'landcover_wood',
        type: 'fill',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'landcover',
        filter: [
          'all',
          ['==', ['geometry-type'], 'Polygon'],
          ['==', ['get', 'class'], 'wood'],
        ],
        paint: {
          'fill-color': palette.wood,
        },
      },
      {
        id: 'water',
        type: 'fill',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'water',
        filter: [
          'all',
          ['==', ['geometry-type'], 'Polygon'],
          ['!=', ['get', 'intermittent'], 1],
        ],
        paint: {
          'fill-color': palette.water,
        },
      },
      {
        id: 'waterway',
        type: 'line',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'waterway',
        filter: ['==', ['geometry-type'], 'LineString'],
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': palette.waterway,
          'line-width': lineWidth([8, 0.5, 14, 1.5, 18, 3]),
        },
      },
      {
        id: 'road_casing_major',
        type: 'line',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'transportation',
        filter: roadFilter(MAJOR_ROAD_CLASSES),
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': palette.roadCasing,
          'line-width': lineWidth([8, 2.5, 12, 4, 16, 7]),
        },
      },
      {
        id: 'road_casing_minor',
        type: 'line',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'transportation',
        filter: roadFilter([...MINOR_ROAD_CLASSES, ...PATH_CLASSES]),
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': palette.roadCasing,
          'line-width': lineWidth([10, 1.25, 14, 2.5, 18, 4]),
        },
      },
      {
        id: 'road_path',
        type: 'line',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'transportation',
        filter: roadFilter(PATH_CLASSES),
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': palette.roadPath,
          'line-width': lineWidth([12, 0.5, 16, 1.25]),
        },
      },
      {
        id: 'road_minor',
        type: 'line',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'transportation',
        filter: roadFilter(MINOR_ROAD_CLASSES),
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': palette.roadMinor,
          'line-width': lineWidth([10, 0.75, 14, 1.5, 18, 2]),
        },
      },
      {
        id: 'road_major',
        type: 'line',
        source: MAP_CONFIG.sourceName,
        'source-layer': 'transportation',
        filter: roadFilter(MAJOR_ROAD_CLASSES),
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': palette.roadMajor,
          'line-width': lineWidth([8, 1.5, 12, 3, 16, 5]),
        },
      },
    ],
  };

  if (route) {
    style.layers.push(
      {
        id: MAP_CONFIG.route.casingLayerId,
        type: 'line',
        source: MAP_CONFIG.route.sourceId,
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': palette.routeCasing,
          'line-width': MAP_CONFIG.route.casingWidth,
          'line-opacity': 1,
        },
      },
      {
        id: MAP_CONFIG.route.lineLayerId,
        type: 'line',
        source: MAP_CONFIG.route.sourceId,
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': palette.routeLine,
          'line-width': MAP_CONFIG.route.lineWidth,
          'line-opacity': 1,
        },
      },
    );
  }

  if (labels) {
    style.glyphs = MAP_CONFIG.glyphsUrl;
    style.layers.push({
      id: 'labels_place',
      type: 'symbol',
      source: MAP_CONFIG.sourceName,
      'source-layer': 'place',
      minzoom: 7,
      filter: inFilter('class', LABEL_CLASSES),
      layout: {
        'text-field': ['coalesce', ['get', 'name_en'], ['get', 'name']],
        'text-font': ['Noto Sans Regular'],
        'text-size': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7,
          10,
          12,
          13,
          16,
          16,
        ],
        'text-max-width': 8,
        'text-padding': 4,
      },
      paint: {
        'text-color': palette.labelText,
        'text-halo-color': palette.labelHalo,
        'text-halo-width': 1,
      },
    });
  }

  return style;
}
