import { getMDXComponent } from 'mdx-bundler/client';

import Chip from '@components/chip';
import BackButton from '@components/leftArrowButton';
import { Components as MDXComponents } from '@components/mdx/components';

import { GetProject, GetProjectDetails } from '@lib/mdxUtils';

export async function generateStaticParams() {
  const projects = await GetProjectDetails();

  return projects.props.projects.map((project) => ({
    slug: project.title,
  }));
}

export default async function Page({ params }) {
  const { code, details } = await GetProject(params.slug);
  const Component = getMDXComponent(code);

  const tags = details.tags;

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex flex-col gap-y-2">
        <BackButton text="all projects" url="/projects" />
        <span className="text-4xl font-medium">{details.title}</span>
        <span className="text-xl font-light italic">{details.dates}</span>
        {/* tags */}
        <div className="w-full flex flex-row flex-wrap gap-1">
          {tags === undefined || tags.length == 0 ? (
            <></>
          ) : (
            tags.map((tag) => <Chip text={tag} key={tag} />)
          )}
        </div>
      </div>
      <Component components={MDXComponents} />
    </div>
  );
}
