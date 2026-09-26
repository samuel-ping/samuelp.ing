'use client';

import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

import { Components as MDXComponents } from '@/components/mdx/components';

export default function MDXContent({ code }) {
  // MDX runtime compilation inherently creates a component from a string.
  // Memoizing on `code` keeps its identity stable, so state is not reset
  // across renders.
  const Component = useMemo(() => getMDXComponent(code), [code]);

  // eslint-disable-next-line react-hooks/static-components
  return <Component components={MDXComponents} />;
}
