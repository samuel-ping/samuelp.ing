import { getMDXComponent } from 'mdx-bundler/client';

import { Components as MDXComponents } from '@/components/mdx/components';

import { GetAboutMDX } from '@/utils/mdxUtils';

export const metadata = {
  title: 'About',
};

export default async function Page() {
  const { code } = await GetAboutMDX('about');
  const Component = getMDXComponent(code);

  return (
    <div className="flex flex-col gap-y-2">
      <span className="text-4xl font-medium">About me</span>
      <Component components={MDXComponents} />
    </div>
  );
}
