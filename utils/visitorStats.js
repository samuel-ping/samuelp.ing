import goatcounter from '@/data/goatcounter-country-stats.json';
import umami from '@/data/umami-country-stats.json';

import { GetCountryName } from '@/utils/countryNames';

const isValidCode = (code) => /^[A-Z]{2}$/.test(code) && code !== 'ZZ';

const collectCountries = (merged, rows) => {
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
};

/**
 * Merges the committed Umami and GoatCounter snapshots for the stats
 * components. This is intentionally synchronous and network-free: both
 * snapshots are baked into the static build.
 *
 * GoatCounter covers everything before 2025-05-25 and Umami covers everything
 * from then on, so the two totals are summed without overlap. An empty
 * GoatCounter seed degrades to Umami-only.
 *
 * Country names are resolved here, on the server, and passed to the client as
 * props. `Intl.DisplayNames` is not stable across ICU versions (Node renders
 * "Hong Kong SAR China" where Chrome renders "Hong Kong"), so resolving names
 * during render on both sides would cause hydration mismatches.
 *
 * @returns {{ totalVisitors: number, countries: Array<{ code: string, name: string, visitors: number }>, sources: { goatcounter: { periodStart: string | null, periodEnd: string | null }, umami: { generatedAt: string | null } } }}
 */
export function GetVisitorStats() {
  const merged = new Map();

  collectCountries(
    merged,
    Array.isArray(umami.countries) ? umami.countries : [],
  );
  collectCountries(
    merged,
    Array.isArray(goatcounter.countries) ? goatcounter.countries : [],
  );

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
  const reportedVisitors =
    (Number(umami.totalVisitors) || 0) +
    (Number(goatcounter.totalVisitors) || 0);
  const totalVisitors = Math.max(reportedVisitors, attributedVisitors);

  return {
    totalVisitors,
    countries,
    sources: {
      goatcounter: {
        periodStart: goatcounter.periodStart ?? null,
        periodEnd: goatcounter.periodEnd ?? null,
      },
      umami: {
        generatedAt: umami.generatedAt ?? null,
      },
    },
  };
}
