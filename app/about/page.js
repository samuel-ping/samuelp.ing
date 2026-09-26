import MDXContent from '@/components/mdx/mdxContent';
import PageTitle from '@/components/pageTitle';

import { GetAboutMDX } from '@/utils/mdxUtils';

export const metadata = {
  title: 'About',
};

export default async function Page() {
  const { code } = await GetAboutMDX('about');

  return (
    <div className="mx-8 flex w-full max-w-2xl flex-col md:mx-16">
      <PageTitle text="About me" />
      <MDXContent code={code} />
    </div>
  );
}
