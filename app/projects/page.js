import ProjectCard from '@components/projectCard';

import { getProjectDetails } from '@lib/mdxUtils';

export default async function Page() {
  const projects = await getProjectDetails();

  return (
    <div className="flex flex-col space-y-4">
      <span className="text-4xl font-medium">Projects</span>
      <div className="grid grid-cols-1 gap-3 justify-items-start sm:grid-cols-2 md:-mx-6 md:grid-cols-3 lg:grid-cols-4">
        {projects.props.projects.map((project) => {
          return (
            <ProjectCard
              key={project.details.title}
              url={project.details.repo}
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
