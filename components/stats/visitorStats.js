'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import GlobeErrorBoundary from '@/components/stats/globeErrorBoundary';
import GlobeSkeleton from '@/components/stats/globeSkeleton';

const VisitorGlobe = dynamic(() => import('./visitorGlobe'), {
  ssr: false,
  loading: () => <GlobeSkeleton />,
});

const numberFormat = new Intl.NumberFormat('en-US');

const monthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const UPDATED_LABEL = 'Updated daily · Since January 2024';

const formatMonth = (value) => {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : monthFormat.format(date);
};

const formatPercent = (value) => {
  if (value > 0 && value < 1) return '<1%';
  return `${Math.round(value)}%`;
};

const pluralize = (count, singular, plural) =>
  count === 1 ? singular : plural;

function TopCountriesList({
  countries,
  attributedVisitors,
  highlightedCode,
  onHighlight,
}) {
  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="font-display text-xl font-medium">Top countries</h3>

      {countries.length === 0 ? (
        <p className="text-sm text-muted">No visitor data yet.</p>
      ) : (
        <ol
          aria-label="Top countries by visitors"
          className="flex flex-col gap-y-1"
        >
          {countries.map((country, index) => {
            const name = country.name ?? country.code;
            const percentage =
              attributedVisitors > 0
                ? (country.visitors / attributedVisitors) * 100
                : 0;
            const isHighlighted = highlightedCode === country.code;

            return (
              <li
                key={country.code}
                onMouseEnter={() => onHighlight(country.code)}
                onMouseLeave={() => onHighlight(null)}
                className={`rounded-md px-2 py-0.5 transition-colors ${
                  isHighlighted
                    ? 'bg-green-100/60 dark:bg-green-700/40'
                    : 'bg-transparent'
                }`}
              >
                <div className="flex items-baseline justify-between gap-x-3 text-sm">
                  <span className="flex min-w-0 items-baseline gap-x-2">
                    <span className="w-5 shrink-0 text-right text-xs text-muted tabular-nums">
                      {index + 1}
                    </span>
                    <span className="truncate" title={name}>
                      {name}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {numberFormat.format(country.visitors)}
                  </span>
                </div>

                <div className="mt-0.5 ml-7 flex items-center gap-x-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-green-100 dark:bg-green-700">
                    <div
                      className="h-full rounded-full bg-green-500 dark:bg-green-300"
                      style={{
                        width: `${Math.max(percentage, country.visitors > 0 ? 2 : 0)}%`,
                      }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-xs text-muted tabular-nums">
                    {formatPercent(percentage)}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export default function VisitorStats({ data }) {
  const [highlightedCode, setHighlightedCode] = useState(null);

  const { totalVisitors, countries } = data;

  const { attributedVisitors, topCountries } = useMemo(() => {
    const totals = countries.reduce(
      (total, country) => total + country.visitors,
      0,
    );

    return {
      attributedVisitors: totals,
      topCountries: countries.slice(0, 10),
    };
  }, [countries]);

  const hasData = attributedVisitors > 0;

  return (
    <section
      aria-labelledby="visitor-map-heading"
      className="flex flex-col gap-y-6"
    >
      <h2 id="visitor-map-heading" className="sr-only">
        Visitors by country
      </h2>

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        {hasData ? (
          <p className="text-lg">
            <span className="font-display text-2xl font-medium">
              {numberFormat.format(totalVisitors)}
            </span>{' '}
            {pluralize(totalVisitors, 'visitor', 'visitors')} from{' '}
            {numberFormat.format(countries.length)}{' '}
            {pluralize(countries.length, 'country', 'countries')}
          </p>
        ) : (
          <p className="text-muted">No visitor data yet.</p>
        )}

        <p className="text-sm text-muted">{UPDATED_LABEL}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <GlobeErrorBoundary>
          <VisitorGlobe
            countries={countries}
            highlightedCode={highlightedCode}
            onHoverCountry={setHighlightedCode}
          />
        </GlobeErrorBoundary>

        <TopCountriesList
          countries={topCountries}
          attributedVisitors={attributedVisitors}
          highlightedCode={highlightedCode}
          onHighlight={setHighlightedCode}
        />
      </div>
    </section>
  );
}
