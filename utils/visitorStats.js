import snapshot from '@/data/umami-country-stats.json';

import { GetCountryName } from '@/utils/countryNames';

const isValidCode = (code) => /^[A-Z]{2}$/.test(code) && code !== 'ZZ';

/**
 * Normalizes the committed Umami snapshot for the stats components.
 * This is intentionally synchronous: the snapshot is baked into the static build.
 *
 * Country names are resolved here, on the server, and passed to the client as
 * props. `Intl.DisplayNames` is not stable across ICU versions (Node renders
 * "Hong Kong SAR China" where Chrome renders "Hong Kong"), so resolving names
 * during render on both sides would cause hydration mismatches.
 *
 * @returns {{ totalVisitors: number, countries: Array<{ code: string, name: string, visitors: number }> }}
 */
export function GetVisitorStats() {
  const merged = new Map();
  const rows = Array.isArray(snapshot.countries) ? snapshot.countries : [];

  for (const row of rows) {
    const code = String(row?.code ?? '')
      .trim()
      .toUpperCase();
    const visitors = Number(row?.visitors);

    if (!isValidCode(code) || !Number.isFinite(visitors) || visitors <= 0) {
      continue;
    }

    merged.set(code, (merged.get(code) ?? 0) + visitors);
  }

  const countries = [...merged]
    .map(([code, visitors]) => ({
      code,
      name: GetCountryName(code),
      visitors,
    }))
    .sort((a, b) => b.visitors - a.visitors || a.code.localeCompare(b.code));

  const attributedVisitors = countries.reduce(
    (total, country) => total + country.visitors,
    0,
  );
  const reportedVisitors = Number(snapshot.totalVisitors);
  const totalVisitors = Number.isFinite(reportedVisitors)
    ? Math.max(reportedVisitors, attributedVisitors)
    : attributedVisitors;

  return {
    totalVisitors,
    countries,
  };
}
