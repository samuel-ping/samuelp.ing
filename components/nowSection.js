import { Fragment } from 'react';

import LinkText from '@/components/linkText';

/**
 * The /now convention: a short, hand-updated snapshot of what's currently
 * occupying my time. Update the copy below whenever it drifts — it's meant to
 * go stale, unlike the rest of the site.
 */
const nowItems = [
  {
    label: '3D printing',
    text: 'Onboarding my new 3D printer with lots and lots of spaghetti.',
  },
  {
    label: 'Recovery',
    text: 'Rehabbing my wrist after ulnar impaction from tennis.',
  },
  {
    label: 'Running',
    text: 'Looking for destination races as an excuse to travel with my friends!',
  },
  {
    label: 'Plants',
    text: 'Watering my likely-parched thai constellation...',
  },
  {
    label: 'Home server',
    text: 'Updating self-hosted services.',
    link: { href: '/projects/home-server', text: 'the setup' },
  },
];

export default function NowSection() {
  return (
    <section className="flex w-full flex-col gap-y-4">
      <h2
        className="settle font-display text-2xl font-medium"
        style={{ animationDelay: '200ms' }}
      >
        Now
      </h2>
      {/* A definition list, laid out as label/value rows on wider screens and
          stacked on mobile. */}
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-[8rem_1fr]">
        {nowItems.map((item, i) => (
          <Fragment key={item.label}>
            <dt
              className="settle text-sm text-muted"
              style={{ animationDelay: `${260 + i * 60}ms` }}
            >
              {item.label}
            </dt>
            <dd
              className="max-w-prose settle"
              style={{ animationDelay: `${260 + i * 60}ms` }}
            >
              {item.text}
              {item.link ? (
                <>
                  {' '}
                  <LinkText href={item.link.href}>{item.link.text}</LinkText>
                </>
              ) : null}
            </dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
