import { LAST_RUN_CONFIG, MAP_CONFIG } from '../config/mapConfig.mjs';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const METERS_PER_MILE = 1609.344;

function cleanString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function optionalNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function formatMiles(distanceInMeter) {
  const meters = optionalNumber(distanceInMeter);
  if (meters === null || meters < 0) {
    return '—';
  }

  return (meters / METERS_PER_MILE).toFixed(1);
}

export function formatPace(movingTimeInSeconds, distanceInMeter) {
  const seconds = optionalNumber(movingTimeInSeconds);
  const meters = optionalNumber(distanceInMeter);

  if (seconds === null || seconds <= 0 || meters === null || meters <= 0) {
    return '—';
  }

  const totalSeconds = Math.round(seconds / (meters / METERS_PER_MILE));
  const minutes = Math.floor(totalSeconds / 60);
  const remainder = totalSeconds % 60;

  return `${minutes}:${String(remainder).padStart(2, '0')} /mi`;
}

export function formatRunDate(startDateLocal, now = new Date()) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(startDateLocal ?? ''));
  if (!match) {
    return '—';
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return '—';
  }

  const shortDate = `${MONTHS[month - 1]} ${day}`;
  return year === now.getFullYear() ? shortDate : `${shortDate}, ${year}`;
}

export function normalizeLocation(location) {
  if (!location || typeof location !== 'object') {
    return { city: null, state: null, countryCode: null };
  }

  return {
    city: cleanString(location.city),
    state: cleanString(location.state),
    countryCode: cleanString(location.countryCode)?.toLowerCase() ?? null,
  };
}

export function formatLocation(location) {
  const normalized = normalizeLocation(location);
  const country = normalized.countryCode?.toUpperCase() ?? null;

  if (normalized.city && normalized.state) {
    return `${normalized.city}, ${normalized.state}`;
  }
  if (normalized.city && country) {
    return `${normalized.city}, ${country}`;
  }
  if (normalized.city) {
    return normalized.city;
  }
  if (normalized.state) {
    return normalized.state;
  }
  if (country) {
    return country;
  }

  return '';
}

export function normalizeActivity(activity) {
  if (!activity || typeof activity !== 'object') {
    throw new Error('Activity metadata is missing.');
  }

  const id = cleanString(activity.id);
  const startDateLocal = cleanString(activity.startDateLocal);

  if (!id) {
    throw new Error('Activity id is missing.');
  }
  if (!startDateLocal) {
    throw new Error('Activity startDateLocal is missing.');
  }

  return {
    id,
    name: cleanString(activity.name) ?? 'Latest run',
    startDateLocal,
    distanceInMeter: optionalNumber(activity.distanceInMeter),
    movingTimeInSeconds: optionalNumber(activity.movingTimeInSeconds),
    location: normalizeLocation(activity.location),
  };
}

export function sanitizeKey(value) {
  const sanitized = String(value ?? '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return sanitized || 'run';
}

export function makeImageVersion(
  activityId,
  styleVersion = LAST_RUN_CONFIG.styleVersion,
) {
  return `${sanitizeKey(activityId)}-style${styleVersion}`;
}

export function makeImageFileName(
  theme,
  activityId,
  styleVersion = LAST_RUN_CONFIG.styleVersion,
) {
  if (theme !== 'light' && theme !== 'dark') {
    throw new Error(`Unknown image theme: ${theme}`);
  }

  return `${theme}-${makeImageVersion(activityId, styleVersion)}.webp`;
}

export function makeImagePath(fileName) {
  return `${LAST_RUN_CONFIG.publicImageDir}/${fileName}`;
}

export function isSnapshotImagePath(value) {
  if (typeof value !== 'string' || !value.startsWith('/')) {
    return false;
  }

  const pathname = value.split('?')[0];
  return (
    pathname.startsWith(`${LAST_RUN_CONFIG.publicImageDir}/`) &&
    !pathname.includes('..')
  );
}

export function validateSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    throw new Error('Snapshot is not an object.');
  }
  if (snapshot.schemaVersion !== LAST_RUN_CONFIG.schemaVersion) {
    throw new Error(
      `Unsupported snapshot schemaVersion: ${snapshot.schemaVersion}`,
    );
  }

  const activity = normalizeActivity(snapshot.activity);
  const map = snapshot.map;

  if (!map || typeof map !== 'object') {
    throw new Error('Snapshot map metadata is missing.');
  }
  if (!isSnapshotImagePath(map.light) || !isSnapshotImagePath(map.dark)) {
    throw new Error(
      'Snapshot image paths must be root-relative under /last-run/.',
    );
  }
  if (
    map.width !== MAP_CONFIG.dimensions.width ||
    map.height !== MAP_CONFIG.dimensions.height
  ) {
    throw new Error('Snapshot image dimensions do not match the map config.');
  }
  if (!Number.isInteger(map.styleVersion) || map.styleVersion < 1) {
    throw new Error('Snapshot map.styleVersion is invalid.');
  }

  return {
    schemaVersion: LAST_RUN_CONFIG.schemaVersion,
    generatedAt:
      typeof snapshot.generatedAt === 'string'
        ? snapshot.generatedAt
        : new Date().toISOString(),
    activity,
    map: {
      light: map.light,
      dark: map.dark,
      width: map.width,
      height: map.height,
      styleVersion: map.styleVersion,
    },
  };
}

export function makeSnapshot({
  activity,
  light,
  dark,
  styleVersion = LAST_RUN_CONFIG.styleVersion,
  generatedAt = new Date().toISOString(),
}) {
  const snapshot = {
    schemaVersion: LAST_RUN_CONFIG.schemaVersion,
    generatedAt,
    activity: normalizeActivity(activity),
    map: {
      light,
      dark,
      width: MAP_CONFIG.dimensions.width,
      height: MAP_CONFIG.dimensions.height,
      styleVersion,
    },
  };

  return validateSnapshot(snapshot);
}
