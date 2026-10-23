import { Fragment } from 'react';

import InlineLinks from '@/components/ui/inlineLinks';
import NowItems from '@/config/nowItems.config';

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
        {NowItems.map((item, i) => (
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
              <InlineLinks text={item.text} />
            </dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
