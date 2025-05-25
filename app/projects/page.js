import PageTitle from '@/components/pageTitle';
import ProjectCard from '@/components/projectCard';

import { GetProjectDetails } from '@/utils/mdxUtils';

export const metadata = {
  title: 'Projects',
};

export default async function Page() {
  const projects = await GetProjectDetails();

  return (
    <div className="flex flex-col items-center gap-y-7">
      <PageTitle text="Projects" />
      <div className="w-fit grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {projects.props.projects.map((project) => {
          return (
            <ProjectCard
              key={project.details.title}
              title={project.details.title}
              dates={project.details.dates}
              gist={project.details.gist}
              tags={project.details.tags}
              slug={project.details.slug}
              eventSource="/projects"
            />
          );
        })}
      </div>
    </div>
  );
}
