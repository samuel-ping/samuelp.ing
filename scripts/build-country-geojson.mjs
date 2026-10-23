import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_110m_admin_0_countries.geojson';
const OUTPUT_PATH = path.join('public', 'data', 'countries-110m.geojson');

const round = (value) => {
  const rounded = Math.round(value * 100) / 100;
  return Object.is(rounded, -0) ? 0 : rounded;
};

const roundCoordinates = (coordinates) => {
  if (typeof coordinates === 'number') {
    return round(coordinates);
  }

  return coordinates.map(roundCoordinates);
};

const positionsEqual = (a, b) => a[0] === b[0] && a[1] === b[1];

const cleanRing = (ring) => {
  const cleaned = [];

  for (const position of ring) {
    const previous = cleaned.at(-1);
    if (!previous || !positionsEqual(previous, position)) {
      cleaned.push(position);
    }
  }

  if (cleaned.length > 0 && !positionsEqual(cleaned[0], cleaned.at(-1))) {
    cleaned.push([...cleaned[0]]);
  }

  return cleaned.length >= 4 ? cleaned : null;
};

const cleanPolygon = (rings) => {
  const cleaned = rings.map(cleanRing).filter(Boolean);
  return cleaned.length > 0 ? cleaned : null;
};

const cleanGeometry = (geometry) => {
  if (!geometry) return null;

  if (geometry.type === 'Polygon') {
    const coordinates = cleanPolygon(geometry.coordinates);
    return coordinates ? { type: 'Polygon', coordinates } : null;
  }

  if (geometry.type === 'MultiPolygon') {
    const coordinates = geometry.coordinates.map(cleanPolygon).filter(Boolean);
    return coordinates.length > 0
      ? { type: 'MultiPolygon', coordinates }
      : null;
  }

  return null;
};

const getCountryCode = (properties) => {
  const candidates = [properties.ISO_A2_EH, properties.ISO_A2];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && /^[A-Z]{2}$/.test(candidate)) {
      return candidate;
    }
  }

  return null;
};

const response = await fetch(SOURCE_URL);
if (!response.ok) {
  throw new Error(`Failed to download Natural Earth data: ${response.status}`);
}

const source = await response.json();
const features = [];

for (const feature of source.features) {
  const code = getCountryCode(feature.properties);
  if (!code || code === 'AQ') continue;

  const geometry = cleanGeometry({
    type: feature.geometry.type,
    coordinates: roundCoordinates(feature.geometry.coordinates),
  });
  if (!geometry) continue;

  features.push({
    type: 'Feature',
    id: code,
    properties: { name: feature.properties.NAME },
    geometry,
  });
}

features.sort((a, b) => a.id.localeCompare(b.id));

const output = JSON.stringify({
  type: 'FeatureCollection',
  features,
});

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, output);

console.log(
  `Wrote ${features.length} countries to ${OUTPUT_PATH} (${(output.length / 1024).toFixed(0)} KB).`,
);
