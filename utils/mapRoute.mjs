import { MAP_CONFIG } from '../config/mapConfig.mjs';

const DEG_TO_RAD = Math.PI / 180;
const METERS_PER_DEG_LAT = 110_540;

export function decodePolyline(encoded, precision = 5) {
  if (typeof encoded !== 'string' || encoded.length === 0) {
    return [];
  }

  const factor = 10 ** precision;
  const coordinates = [];
  let index = 0;
  let latitude = 0;
  let longitude = 0;

  const decodeValue = () => {
    let result = 0;
    let shift = 0;
    let byte;

    do {
      if (index >= encoded.length) {
        throw new Error('Encoded polyline ended unexpectedly.');
      }

      byte = encoded.charCodeAt(index++) - 63;
      if (byte < 0 || byte > 63) {
        throw new Error('Encoded polyline contains an invalid character.');
      }

      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    return result & 1 ? ~(result >> 1) : result >> 1;
  };

  while (index < encoded.length) {
    latitude += decodeValue();
    longitude += decodeValue();
    coordinates.push([longitude / factor, latitude / factor]);
  }

  return coordinates;
}

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function dedupeConsecutive(coordinates) {
  const deduped = [];

  for (const coordinate of coordinates) {
    const previous = deduped.at(-1);
    if (
      !previous ||
      previous[0] !== coordinate[0] ||
      previous[1] !== coordinate[1]
    ) {
      deduped.push(coordinate);
    }
  }

  return deduped;
}

export function validateRoute(coordinates) {
  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    throw new Error('A route needs at least two coordinates.');
  }

  for (const coordinate of coordinates) {
    if (
      !Array.isArray(coordinate) ||
      coordinate.length !== 2 ||
      !isFiniteNumber(coordinate[0]) ||
      !isFiniteNumber(coordinate[1])
    ) {
      throw new Error(
        'Route coordinates must be finite [longitude, latitude] pairs.',
      );
    }

    const [longitude, latitude] = coordinate;
    if (
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      throw new Error(
        'Route coordinate is outside the valid longitude/latitude range.',
      );
    }
  }

  return coordinates;
}

function squareSegmentDistance(point, start, end) {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;

  if (dx !== 0 || dy !== 0) {
    const t = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x = end[0];
      y = end[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = point[0] - x;
  dy = point[1] - y;
  return dx * dx + dy * dy;
}

function simplifyStep(points, first, last, squareTolerance, simplifiedIndices) {
  let maxSquareDistance = squareTolerance;
  let splitIndex = -1;

  for (let index = first + 1; index < last; index += 1) {
    const squareDistance = squareSegmentDistance(
      points[index],
      points[first],
      points[last],
    );

    if (squareDistance > maxSquareDistance) {
      splitIndex = index;
      maxSquareDistance = squareDistance;
    }
  }

  if (splitIndex === -1) {
    return;
  }

  if (splitIndex - first > 1) {
    simplifyStep(points, first, splitIndex, squareTolerance, simplifiedIndices);
  }

  simplifiedIndices.push(splitIndex);

  if (last - splitIndex > 1) {
    simplifyStep(points, splitIndex, last, squareTolerance, simplifiedIndices);
  }
}

/**
 * Ramer-Douglas-Peucker simplification in a local equirectangular projection.
 * Good enough for a run-sized route and avoids pulling in a GIS dependency.
 */
export function simplifyRoute(
  coordinates,
  toleranceMeters = MAP_CONFIG.simplifyToleranceMeters,
) {
  validateRoute(coordinates);

  if (coordinates.length <= 2) {
    return coordinates.map((coordinate) => [...coordinate]);
  }

  let minLatitude = Infinity;
  let maxLatitude = -Infinity;

  for (const coordinate of coordinates) {
    minLatitude = Math.min(minLatitude, coordinate[1]);
    maxLatitude = Math.max(maxLatitude, coordinate[1]);
  }

  const originLatitude = (minLatitude + maxLatitude) / 2;
  const metersPerDegreeLongitude =
    111_320 * Math.cos(originLatitude * DEG_TO_RAD);

  const projected = coordinates.map(([longitude, latitude]) => [
    longitude * metersPerDegreeLongitude,
    latitude * METERS_PER_DEG_LAT,
  ]);

  const simplifiedIndices = [0];
  simplifyStep(
    projected,
    0,
    projected.length - 1,
    toleranceMeters ** 2,
    simplifiedIndices,
  );
  simplifiedIndices.push(projected.length - 1);

  return simplifiedIndices.map((index) => [...coordinates[index]]);
}

export function getRouteBounds(coordinates) {
  validateRoute(coordinates);

  let west = Infinity;
  let south = Infinity;
  let east = -Infinity;
  let north = -Infinity;

  for (const [longitude, latitude] of coordinates) {
    west = Math.min(west, longitude);
    east = Math.max(east, longitude);
    south = Math.min(south, latitude);
    north = Math.max(north, latitude);
  }

  // Keep very short routes from producing a degenerate camera.
  const minimumSpan = 0.001;
  if (east - west < minimumSpan) {
    const midpoint = (east + west) / 2;
    west = midpoint - minimumSpan / 2;
    east = midpoint + minimumSpan / 2;
  }
  if (north - south < minimumSpan) {
    const midpoint = (north + south) / 2;
    south = midpoint - minimumSpan / 2;
    north = midpoint + minimumSpan / 2;
  }

  return [
    [west, south],
    [east, north],
  ];
}

export function routeToGeoJSON(coordinates) {
  validateRoute(coordinates);

  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  };
}

export function prepareRoute(
  encodedPolyline,
  { toleranceMeters = MAP_CONFIG.simplifyToleranceMeters } = {},
) {
  const decoded = dedupeConsecutive(decodePolyline(encodedPolyline, 5));
  validateRoute(decoded);

  const coordinates = simplifyRoute(decoded, toleranceMeters);
  const bounds = getRouteBounds(coordinates);

  return {
    coordinates,
    bounds,
    feature: routeToGeoJSON(coordinates),
    sourcePointCount: decoded.length,
    simplifiedPointCount: coordinates.length,
  };
}
