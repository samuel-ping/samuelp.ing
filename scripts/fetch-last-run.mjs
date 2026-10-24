import fs from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

import { LAST_RUN_CONFIG, MAP_CONFIG } from '../config/mapConfig.mjs';
import {
  makeImageFileName,
  makeImagePath,
  makeSnapshot,
  normalizeActivity,
  validateSnapshot,
} from '../utils/lastRun.mjs';
import { prepareRoute } from '../utils/mapRoute.mjs';
import { renderMapPair } from './render-map.mjs';

const ROOT = process.cwd();

function warn(message) {
  const text = String(message);
  console.warn(text);
  if (process.env.GITHUB_ACTIONS === 'true') {
    console.log(`::warning::${text.replaceAll('\n', '%0A')}`);
  }
}

function fetchTimeoutMs(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : MAP_CONFIG.renderTimeoutMs;
}

async function fetchWithTimeout(
  url,
  options = {},
  timeoutMs = LAST_RUN_CONFIG.fallbackTimeoutMs,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function snapshotFilePath() {
  return path.join(ROOT, LAST_RUN_CONFIG.snapshotPath);
}

function imageFilePath(imagePath) {
  const pathname = imagePath.split('?')[0].replace(/^\//, '');
  return path.join(ROOT, 'public', pathname);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function snapshotImagesExist(snapshot) {
  return (
    (await fileExists(imageFilePath(snapshot.map.light))) &&
    (await fileExists(imageFilePath(snapshot.map.dark)))
  );
}

async function readLocalSnapshot() {
  try {
    const raw = await fs.readFile(snapshotFilePath(), 'utf8');
    return validateSnapshot(JSON.parse(raw));
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      warn(`Could not read the existing latest-run snapshot: ${error.message}`);
    }
    return null;
  }
}

async function writeAtomic(filePath, contents) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(temporaryPath, contents);
  await fs.rename(temporaryPath, filePath);
}

async function removeStaleVersionedImages(keepNames) {
  try {
    const entries = await fs.readdir(path.join(ROOT, LAST_RUN_CONFIG.imageDir));

    await Promise.all(
      entries
        .filter((entry) => /^(light|dark)-.+\.webp$/.test(entry))
        .filter((entry) => !keepNames.has(entry))
        .map((entry) =>
          fs.rm(path.join(ROOT, LAST_RUN_CONFIG.imageDir, entry), {
            force: true,
          }),
        ),
    );
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      warn(`Could not remove stale map images: ${error.message}`);
    }
  }
}

async function writeSnapshotFiles(snapshot, images) {
  const lightName = path.basename(snapshot.map.light.split('?')[0]);
  const darkName = path.basename(snapshot.map.dark.split('?')[0]);

  await writeAtomic(imageFilePath(snapshot.map.light), images.light);
  await writeAtomic(imageFilePath(snapshot.map.dark), images.dark);
  await writeAtomic(
    snapshotFilePath(),
    `${JSON.stringify(snapshot, null, 2)}\n`,
  );

  await removeStaleVersionedImages(new Set([lightName, darkName]));
}

function dreeveUrl() {
  const apiUrl = process.env.DREEVE_API_URL?.trim().replace(/\/+$/, '');
  const apiKey = process.env.DREEVE_API_KEY?.trim();

  if (!apiUrl || !apiKey) {
    return null;
  }

  const params = new URLSearchParams({
    'filters[sportType]': 'Run,TrailRun',
    'filters[hasGpx]': 'true',
    'pagination[size]': '1',
  });

  return {
    url: `${apiUrl}/api/v1/activities?${params.toString()}`,
    apiKey,
  };
}

function validateDreeveActivity(activity) {
  if (!activity || typeof activity !== 'object') {
    throw new Error('Dreeve returned no activity.');
  }
  if (activity.hasGpx !== true) {
    throw new Error('The latest activity does not have GPS data.');
  }
  if (!['Run', 'TrailRun'].includes(activity.sportType)) {
    throw new Error(`Unexpected sport type: ${activity.sportType}`);
  }
  if (
    typeof activity.encodedPolyline !== 'string' ||
    activity.encodedPolyline.length === 0
  ) {
    throw new Error('The latest activity has no encoded polyline.');
  }

  return activity;
}

async function fetchLatestActivity({
  url,
  apiKey,
  timeoutMs = LAST_RUN_CONFIG.fallbackTimeoutMs,
}) {
  const response = await fetchWithTimeout(
    url,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    },
    timeoutMs,
  );

  if (!response.ok) {
    throw new Error(`Dreeve returned HTTP ${response.status}.`);
  }

  const payload = await response.json();
  const rawActivity = payload?.activities?.[0];
  validateDreeveActivity(rawActivity);

  const activity = normalizeActivity(rawActivity);
  const route = prepareRoute(rawActivity.encodedPolyline, {
    toleranceMeters: MAP_CONFIG.simplifyToleranceMeters,
  });

  return { activity, route };
}

async function saveRenderedSnapshot(activity, route, timeoutMs) {
  const images = await renderMapPair({
    route: route.feature,
    bounds: route.bounds,
    timeoutMs,
  });

  const lightName = makeImageFileName(
    'light',
    activity.id,
    LAST_RUN_CONFIG.styleVersion,
  );
  const darkName = makeImageFileName(
    'dark',
    activity.id,
    LAST_RUN_CONFIG.styleVersion,
  );
  const snapshot = makeSnapshot({
    activity,
    light: makeImagePath(lightName),
    dark: makeImagePath(darkName),
  });

  await writeSnapshotFiles(snapshot, images);

  return snapshot;
}

async function downloadImage(url, expectedActivityId, theme, styleVersion) {
  const response = await fetchWithTimeout(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`${theme} map image returned HTTP ${response.status}.`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length === 0) {
    throw new Error(`${theme} map image is empty.`);
  }

  const metadata = await sharp(buffer).metadata();
  if (
    metadata.format !== 'webp' ||
    metadata.width !== MAP_CONFIG.dimensions.width ||
    metadata.height !== MAP_CONFIG.dimensions.height
  ) {
    throw new Error(`${theme} map image has unexpected metadata.`);
  }

  const fileName = makeImageFileName(theme, expectedActivityId, styleVersion);
  return { buffer, fileName };
}

async function tryDeploymentFallback() {
  const siteUrl = (process.env.SITE_URL || LAST_RUN_CONFIG.siteUrl).trim();
  const snapshotUrl = new URL('/last-run.json', siteUrl);
  snapshotUrl.searchParams.set('t', Date.now().toString());

  const response = await fetchWithTimeout(snapshotUrl, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(
      `Previous deployment snapshot returned HTTP ${response.status}.`,
    );
  }

  const liveSnapshot = validateSnapshot(await response.json());
  const lightUrl = new URL(liveSnapshot.map.light, siteUrl);
  const darkUrl = new URL(liveSnapshot.map.dark, siteUrl);

  const [light, dark] = await Promise.all([
    downloadImage(
      lightUrl,
      liveSnapshot.activity.id,
      'light',
      liveSnapshot.map.styleVersion,
    ),
    downloadImage(
      darkUrl,
      liveSnapshot.activity.id,
      'dark',
      liveSnapshot.map.styleVersion,
    ),
  ]);

  const snapshot = makeSnapshot({
    activity: liveSnapshot.activity,
    light: makeImagePath(light.fileName),
    dark: makeImagePath(dark.fileName),
    styleVersion: liveSnapshot.map.styleVersion,
    generatedAt: liveSnapshot.generatedAt,
  });

  await writeSnapshotFiles(snapshot, {
    light: light.buffer,
    dark: dark.buffer,
  });

  return snapshot;
}

async function readBootstrapSnapshot() {
  const snapshot = await readLocalSnapshot();
  if (!snapshot) {
    return null;
  }
  if (!(await snapshotImagesExist(snapshot))) {
    warn('The local latest-run snapshot is missing one or both map images.');
    return null;
  }
  return snapshot;
}

async function main() {
  const renderTimeoutMs = fetchTimeoutMs(process.env.MAP_RENDER_TIMEOUT_MS);
  const dreeve = dreeveUrl();
  let snapshot = null;

  if (!dreeve) {
    warn(
      'Dreeve credentials are not set; using the previous deployment snapshot.',
    );
  } else {
    try {
      const { activity, route } = await fetchLatestActivity({
        ...dreeve,
        timeoutMs: LAST_RUN_CONFIG.fallbackTimeoutMs,
      });

      console.log(
        `Fetched latest run ${activity.id} (${route.simplifiedPointCount} route points).`,
      );
      snapshot = await saveRenderedSnapshot(activity, route, renderTimeoutMs);
      console.log(`Wrote latest-run snapshot for ${activity.id}.`);
    } catch (error) {
      warn(`Latest run refresh failed: ${error.message}`);
    }
  }

  if (!snapshot) {
    try {
      snapshot = await tryDeploymentFallback();
      if (snapshot) {
        console.log(
          `Using previous deployment snapshot for ${snapshot.activity.id}.`,
        );
      }
    } catch (error) {
      warn(`Previous deployment fallback failed: ${error.message}`);
    }
  }

  if (!snapshot) {
    snapshot = await readBootstrapSnapshot();
    if (snapshot) {
      console.log(
        `Using committed bootstrap snapshot for ${snapshot.activity.id}.`,
      );
    }
  }

  if (!snapshot) {
    warn(
      'No latest-run snapshot is available; the About section will be omitted.',
    );
  }
}

main().catch((error) => {
  warn(`Latest run fetch stopped unexpectedly: ${error?.stack ?? error}`);
});
