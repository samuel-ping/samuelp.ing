import ProjectCard from '@/components/projectCard';

import { GetProjectDetails } from '@/utils/mdxUtils';

export default async function Page() {
  const projects = await GetProjectDetails();

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-4xl font-medium">Projects</span>
      <div className="grid grid-cols-1 gap-3 justify-items-center md:justify-items-start sm:grid-cols-2 md:-mx-6 md:grid-cols-3 lg:grid-cols-4">
        {projects.props.projects.map((project) => {
          return (
            <ProjectCard
              key={project.details.title}
              title={project.details.title}
              dates={project.details.dates}
              gist={project.details.gist}
              tags={project.details.tags}
            />
          );
        })}
      </div>
    </div>
  );
}
