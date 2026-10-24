import MDXContent from '@/components/mdx/mdxContent';
import PageTitle from '@/components/ui/pageTitle';
import LastRunSection from '@/components/sections/lastRunSection';
import NowSection from '@/components/sections/nowSection';

import { GetAboutMDX } from '@/utils/mdxUtils';

export const metadata = {
  title: 'About',
};

export default async function Page() {
  const { code } = await GetAboutMDX('about');

  return (
    <div className="mx-auto flex w-full max-w-2xl page-fade flex-col gap-y-8">
      <PageTitle text="About me" />
      {/* Prose lives in a block container so its element margins collapse
          consistently, matching the project detail page. */}
      <div>
        <MDXContent code={code} />
      </div>
      <NowSection />
      <LastRunSection />
    </div>
  );
}
