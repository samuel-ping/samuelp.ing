import { Fragment } from 'react';

import InlineLinks from '@/components/ui/inlineLinks';
import NowItems from '@/config/nowItems.config';

export default function NowSection() {
  return (
    <section className="flex w-full flex-col gap-y-4">
      <h2 className="font-display text-2xl font-medium">Currently</h2>
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-[1.25rem_1fr]">
        {NowItems.map((item) => (
          <Fragment key={item.label}>
            <dt className="flex h-6 items-center text-muted">
              <item.icon className="size-5" />
              <span className="sr-only">{item.label}</span>
            </dt>
            <dd className="max-w-prose">
              <InlineLinks text={item.text} />
            </dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
