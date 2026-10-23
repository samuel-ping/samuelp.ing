import { mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = 'data';
const SNAPSHOT_PATH = path.join(DATA_DIR, 'umami-country-stats.json');
const DEFAULT_URL = 'https://stats.samuelp.ing';
const DEFAULT_WEBSITE_ID = '8f79f6fd-fcd8-4130-9467-e9eaf1d1f76e';

const getApiKey = () => process.env.UMAMI_API_KEY?.trim();

const fetchJson = async (url, apiKey) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(
      `Umami request failed (${response.status}): ${url.pathname}`,
    );
  }

  return response.json();
};

const normalizeCountries = (payload) => {
  const rows = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];
  const countries = new Map();

  for (const row of rows) {
    const code = String(row?.x ?? '')
      .trim()
      .toUpperCase();
    const visitors = Number(row?.y);

    if (!/^[A-Z]{2}$/.test(code) || code === 'ZZ') continue;
    if (!Number.isFinite(visitors) || visitors <= 0) continue;

    countries.set(code, (countries.get(code) ?? 0) + visitors);
  }

  return [...countries]
    .map(([code, visitors]) => ({ code, visitors }))
    .sort((a, b) => b.visitors - a.visitors || a.code.localeCompare(b.code));
};

const main = async () => {
  const apiKey = getApiKey();

  if (!apiKey) {
    console.warn('UMAMI_API_KEY not set; keeping existing snapshot.');
    return;
  }

  const baseUrl = (process.env.UMAMI_URL ?? DEFAULT_URL).replace(/\/+$/, '');
  const websiteId = process.env.UMAMI_WEBSITE_ID ?? DEFAULT_WEBSITE_ID;
  const now = Date.now();
  const metricsUrl = new URL(`${baseUrl}/api/websites/${websiteId}/metrics`);
  metricsUrl.search = new URLSearchParams({
    type: 'country',
    startAt: '0',
    endAt: String(now),
    limit: '300',
  }).toString();

  const statsUrl = new URL(`${baseUrl}/api/websites/${websiteId}/stats`);
  statsUrl.search = new URLSearchParams({
    startAt: '0',
    endAt: String(now),
  }).toString();

  const [metricsPayload, statsPayload] = await Promise.all([
    fetchJson(metricsUrl, apiKey),
    fetchJson(statsUrl, apiKey).catch(() => null),
  ]);

  const countries = normalizeCountries(metricsPayload);

  if (countries.length === 0) {
    throw new Error(
      'Umami returned no country rows; keeping existing snapshot.',
    );
  }

  const attributedVisitors = countries.reduce(
    (total, country) => total + country.visitors,
    0,
  );
  const reportedVisitors = Number(statsPayload?.visitors);
  const totalVisitors = Number.isFinite(reportedVisitors)
    ? Math.max(reportedVisitors, attributedVisitors)
    : attributedVisitors;

  const snapshot = {
    generatedAt: new Date(now).toISOString(),
    totalVisitors,
    countries,
  };

  await mkdir(DATA_DIR, { recursive: true });
  const temporaryPath = `${SNAPSHOT_PATH}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  await rename(temporaryPath, SNAPSHOT_PATH);

  console.log(
    `Wrote ${countries.length} countries and ${totalVisitors} visitors to ${SNAPSHOT_PATH}.`,
  );
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
