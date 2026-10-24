import fs from 'node:fs';
import path from 'node:path';

import MapAttribution from '@/components/map/mapAttribution';
import { LAST_RUN_CONFIG } from '@/config/mapConfig.mjs';
import {
  formatLocation,
  formatMiles,
  formatPace,
  formatRunDate,
  validateSnapshot,
} from '@/utils/lastRun.mjs';

function imageExists(imagePath) {
  const pathname = imagePath.split('?')[0].replace(/^\//, '');
  return fs.existsSync(path.join(process.cwd(), 'public', pathname));
}

function readSnapshot() {
  try {
    const snapshotPath = path.join(process.cwd(), LAST_RUN_CONFIG.snapshotPath);
    const snapshot = validateSnapshot(
      JSON.parse(fs.readFileSync(snapshotPath, 'utf8')),
    );

    if (!imageExists(snapshot.map.light) || !imageExists(snapshot.map.dark)) {
      console.warn('Latest run snapshot is missing one or both map images.');
      return null;
    }

    return snapshot;
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      console.warn(`Latest run section omitted: ${error.message}`);
    }
    return null;
  }
}

export default function LastRunSection() {
  const snapshot = readSnapshot();
  if (!snapshot) {
    return null;
  }

  const { activity } = snapshot;
  const miles = formatMiles(activity.distanceInMeter);
  const distance = miles === '—' ? miles : `${miles} mi`;
  const pace = formatPace(
    activity.movingTimeInSeconds,
    activity.distanceInMeter,
  );
  const date = formatRunDate(activity.startDateLocal);
  const location = formatLocation(activity.location);
  const meta = [date, location].filter(Boolean).join(' · ');
  const routeDescription = `Approximate route of ${activity.name} on ${date}${
    distance === '—' ? '' : `, ${distance}`
  }.`;

  return (
    <section className="flex w-full flex-col gap-y-4">
      <h2 className="font-display text-2xl font-medium">Latest run</h2>
      <figure className="overflow-hidden rounded-lg bg-beige-100 shadow-card dark:bg-green-700 dark:shadow-none">
        <div
          className="aspect-2/1 w-full bg-beige-200 last-run-map dark:bg-green-800"
          role="img"
          aria-label={routeDescription}
          style={{
            '--last-run-map-light': `url(${snapshot.map.light})`,
            '--last-run-map-dark': `url(${snapshot.map.dark})`,
          }}
        />
        <figcaption className="flex flex-col gap-y-4 p-6">
          <div className="flex flex-col gap-y-1">
            <span className="text-2xl wrap-break-word">{activity.name}</span>
            <span className="font-light text-muted italic">{meta}</span>
          </div>

          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            <div className="flex flex-col gap-y-1">
              <dt className="text-xs tracking-wide text-muted uppercase">
                Distance
              </dt>
              <dd className="text-lg">{distance}</dd>
            </div>
            <div className="flex flex-col gap-y-1">
              <dt className="text-xs tracking-wide text-muted uppercase">
                Pace
              </dt>
              <dd className="text-lg">{pace}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-y-2 border-t border-beige-200 pt-4 dark:border-green-650">
            <p className="text-xs text-muted">Approximate route.</p>
            <MapAttribution />
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
