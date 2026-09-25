import { getMDXComponent } from 'mdx-bundler/client';

import { Components as MDXComponents } from '@/components/mdx/components';
import PageTitle from '@/components/pageTitle';

import { GetAboutMDX } from '@/utils/mdxUtils';

export const metadata = {
  title: 'About',
};

export default async function Page() {
  const { code } = await GetAboutMDX('about');
  const Component = getMDXComponent(code);

  return (
    <div className="w-full max-w-2xl flex flex-col mx-8 md:mx-16">
      <PageTitle text="About me" />
      <Component components={MDXComponents} />
    </div>
  );
}
