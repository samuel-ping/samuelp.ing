import MDXContent from '@/components/mdx/mdxContent';
import PageTitle from '@/components/pageTitle';

import { GetAboutMDX } from '@/utils/mdxUtils';

export const metadata = {
  title: 'About',
};

export default async function Page() {
  const { code } = await GetAboutMDX('about');

  return (
    <div className="flex w-full flex-col gap-y-8">
      <PageTitle text="About me" />
      {/* Prose lives in a block container so its element margins collapse
          consistently, matching the project detail page. It also carries the
          measure: the page column is 5xl, but prose stays readable at 2xl. */}
      <div className="max-w-2xl ink" style={{ animationDelay: '90ms' }}>
        <MDXContent code={code} />
      </div>
    </div>
  );
}
