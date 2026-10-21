import MDXContent from '@/components/mdx/mdxContent';
import PageTitle from '@/components/pageTitle';

import { GetAboutMDX } from '@/utils/mdxUtils';

export const metadata = {
  title: 'About',
};

export default async function Page() {
  const { code } = await GetAboutMDX('about');

  // The measure sits on the page root and is centred with `mx-auto`, so the
  // title and the prose are one column sitting in the middle of the 5xl page
  // column rather than pinned to its left edge.
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-y-8">
      <PageTitle text="About me" />
      {/* Prose lives in a block container so its element margins collapse
          consistently, matching the project detail page. */}
      <div className="settle" style={{ animationDelay: '90ms' }}>
        <MDXContent code={code} />
      </div>
    </div>
  );
}
