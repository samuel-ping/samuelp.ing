import { getMDXComponent } from 'mdx-bundler/client';

import { CodeBracketsIcon, ExternalLinkIcon } from '@/components/icons';
import Chip from '@/components/chip';
import BackButton from '@/components/leftArrowButton';
import { Components as MDXComponents } from '@/components/mdx/components';
import IconButton from '@/components/iconButton';

import { GetProject, GetProjectDetails } from '@/utils/mdxUtils';

export async function generateStaticParams() {
  const projects = await GetProjectDetails();

  const pages = projects.props.projects.map((project) => ({
    slug: project.details.slug,
  }));

  return pages;
}

export async function generateMetadata({ params }) {
  const { details } = await GetProject(`projects/${params.slug}`);

  return {
    title: details.title,
    description: details.gist,
  };
}

export default async function Page({ params }) {
  const { code, details } = await GetProject(`projects/${params.slug}`);
  const Component = getMDXComponent(code);

  const tags = details.tags;

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2">
        <BackButton text="all projects" url="/projects" />
        <span className="text-4xl font-medium">{details.title}</span>
        <span className="text-xl font-light italic">{details.dates}</span>
        <div className="flex flex-row gap-1">
          {details.repo ? (
            <IconButton
              text="view code"
              icon={<CodeBracketsIcon className={''} />}
              url={details.repo}
            />
          ) : (
            <></>
          )}

          {details.website ? (
            <IconButton
              text="view site"
              icon={<ExternalLinkIcon className={''} />}
              url={details.website}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <Component components={MDXComponents} />
      {/* tags */}
      <div className="w-full flex flex-row flex-wrap gap-1">
        <span>tags:</span>
        {tags === undefined || tags.length == 0 ? (
          <></>
        ) : (
          tags.map((tag) => <Chip text={tag} key={tag} />)
        )}
      </div>
    </div>
  );
}
