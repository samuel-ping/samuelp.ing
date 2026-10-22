import { CodeBracketsIcon, ExternalLinkIcon } from '@/components/icons';
import Chip from '@/components/chip';
import BackButton from '@/components/backButton';
import MDXContent from '@/components/mdx/mdxContent';
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

  const tags = details.tags;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-y-8">
      <BackButton text="back" project={params.slug} />
      <div
        className="flex settle flex-col gap-y-2"
        style={{ animationDelay: '60ms' }}
      >
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          {details.title}
        </h1>
        <span className="text-xl font-light text-muted italic">
          {details.dates}
        </span>
        <div className="flex gap-1">
          {details.repo ? (
            <IconButton
              text="view code"
              icon={<CodeBracketsIcon />}
              url={details.repo}
              project={params.slug}
            />
          ) : (
            <></>
          )}

          {details.website ? (
            <IconButton
              text="view site"
              icon={<ExternalLinkIcon />}
              url={details.website}
              project={params.slug}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="w-full settle" style={{ animationDelay: '140ms' }}>
        <MDXContent code={code} />
      </div>

      {/* tags */}
      <div
        className="flex w-full settle flex-wrap gap-2"
        style={{ animationDelay: '210ms' }}
      >
        <span className="text-muted">tags:</span>
        {tags === undefined || tags.length == 0 ? (
          <></>
        ) : (
          tags.map((tag) => <Chip text={tag} key={tag} />)
        )}
      </div>
    </div>
  );
}
