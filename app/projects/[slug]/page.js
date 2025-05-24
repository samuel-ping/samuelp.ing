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

export async function generateMetadata(props) {
  const params = await props.params;
  const { details } = await GetProject(`projects/${params.slug}`);

  return {
    title: details.title,
    description: details.gist,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const { code, details } = await GetProject(`projects/${params.slug}`);
  const Component = getMDXComponent(code);

  const tags = details.tags;

  return (
    <div className="xl:max-w-screen-lg 2xl:max-w-screen-xl mx-6 md:mx-12 flex flex-col gap-y-10 items-center">
      <span className="w-full flex justify-center md:justify-start">
        <BackButton text="all projects" url="/projects" />
      </span>
      <div className="flex flex-col gap-y-2 items-center">
        <span className="text-4xl font-bold">{details.title}</span>
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

      <div>
        <Component components={MDXComponents} />
      </div>

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
