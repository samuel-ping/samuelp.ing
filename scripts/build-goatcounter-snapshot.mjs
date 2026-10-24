import {
  mkdir,
  readFile,
  readdir,
  rename,
  stat,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = 'data';
const SNAPSHOT_PATH = path.join(DATA_DIR, 'goatcounter-country-stats.json');

// GoatCounter owns everything before this date; Umami owns it and everything
// after. The export only takes a start date and always runs to the present, so
// this cutoff is what keeps the snapshot frozen when the export is refreshed.
const CUTOFF = '2025-05-25';
const PERIOD_START = '2024-01-01T00:00:00Z';
const PERIOD_END = '2025-05-25T00:00:00Z';

const exportDir = process.argv[2] ?? 'temp/goatcounter-export';

const fileExists = async (file) => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

// Accepts either the export files directly or the single top-level folder the
// GoatCounter ZIP extracts into.
const resolveExportDir = async (dir) => {
  if (await fileExists(path.join(dir, 'info.json'))) return dir;

  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const candidates = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(dir, entry.name);
    if (await fileExists(path.join(candidate, 'info.json'))) {
      candidates.push(candidate);
    }
  }

  if (candidates.length > 1) {
    throw new Error(
      `Multiple GoatCounter exports found under ${dir}; pass one explicitly.`,
    );
  }

  return candidates[0] ?? dir;
};

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

const readJsonl = async (file) => {
  const text = await readFile(file, 'utf8');
  const rows = [];

  text.split('\n').forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    try {
      rows.push(JSON.parse(trimmed));
    } catch {
      throw new Error(
        `Invalid JSON in ${path.basename(file)} at line ${index + 1}.`,
      );
    }
  });

  return rows;
};

const normalizeLocation = (location) =>
  String(location ?? '')
    .split('-')[0]
    .trim()
    .toUpperCase();

const main = async () => {
  const dir = await resolveExportDir(exportDir);

  if (!(await fileExists(path.join(dir, 'info.json')))) {
    throw new Error(
      `No GoatCounter export found at ${dir}. Expected info.json from Settings → Export → JSON.`,
    );
  }

  const info = await readJson(path.join(dir, 'info.json'));
  const version = String(info?.export_version ?? '');

  if (!version.startsWith('1.')) {
    throw new Error(
      `Unsupported GoatCounter export_version "${version}"; expected 1.x.`,
    );
  }

  const paths = await readJsonl(path.join(dir, 'paths.jsonl'));
  const eventPaths = new Set(
    paths.filter((row) => row?.event === true).map((row) => row.id),
  );

  const rows = await readJsonl(path.join(dir, 'location_stats.jsonl'));
  const countries = new Map();
  let totalVisitors = 0;
  let countedRows = 0;

  for (const row of rows) {
    // The single most important rule: the export runs to the present, so
    // anything on/after the cutoff already belongs to Umami.
    if (String(row?.day ?? '') >= CUTOFF) continue;
    if (eventPaths.has(row?.path_id)) continue;

    const count = Number(row?.count);
    if (!Number.isFinite(count) || count <= 0) continue;

    countedRows += 1;
    totalVisitors += count;

    const code = normalizeLocation(row?.location);
    if (/^[A-Z]{2}$/.test(code) && code !== 'ZZ') {
      countries.set(code, (countries.get(code) ?? 0) + count);
    }
  }

  const sorted = [...countries]
    .map(([code, visitors]) => ({ code, visitors }))
    .sort((a, b) => b.visitors - a.visitors || a.code.localeCompare(b.code));

  const attributedVisitors = sorted.reduce(
    (total, country) => total + country.visitors,
    0,
  );
  totalVisitors = Math.max(totalVisitors, attributedVisitors);

  const hits = await readJsonl(path.join(dir, 'hit_stats.jsonl')).catch(
    () => [],
  );
  let hitVisitors = 0;

  for (const row of hits) {
    if (String(row?.hour ?? '') >= PERIOD_END) continue;
    if (eventPaths.has(row?.path_id)) continue;

    const count = Number(row?.count);
    if (Number.isFinite(count) && count > 0) hitVisitors += count;
  }

  if (hits.length > 0 && hitVisitors !== totalVisitors) {
    console.warn(
      `Cross-check mismatch: hit_stats sums to ${hitVisitors}, location_stats sums to ${totalVisitors}.`,
    );
  }

  const snapshot = {
    source: 'goatcounter',
    generatedAt: new Date().toISOString(),
    periodStart: PERIOD_START,
    periodEnd: PERIOD_END,
    totalVisitors,
    countries: sorted,
  };

  await mkdir(DATA_DIR, { recursive: true });
  const temporaryPath = `${SNAPSHOT_PATH}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  await rename(temporaryPath, SNAPSHOT_PATH);

  console.log(
    `Wrote ${countedRows} rows across ${sorted.length} countries and ${totalVisitors} visitors to ${SNAPSHOT_PATH}.`,
  );
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
