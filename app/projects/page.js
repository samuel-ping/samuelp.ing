import PageTitle from '@/components/pageTitle';
import ProjectCard from '@/components/projectCard';
import ProjectRow from '@/components/projectRow';

import { GetProjectDetails } from '@/utils/mdxUtils';

export const metadata = {
  title: 'Projects',
};

export default async function Page() {
  const projects = await GetProjectDetails();
  const allProjects = projects.props.projects;
  const featured = allProjects.filter((project) => project.details.featured);
  const past = allProjects.filter((project) => !project.details.featured);

  return (
    <div className="flex flex-col items-center gap-y-7">
      <PageTitle text="Projects" />

      {/* featured projects */}
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-2xl font-medium">Featured</h2>
        <div className="w-fit grid gap-4 sm:grid-cols-2">
          {featured.map((project) => {
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

      {/* past projects */}
      <div className="flex flex-col items-center gap-y-4 w-full max-w-3xl">
        <h2 className="text-2xl font-medium">Past projects</h2>
        <div className="w-full flex flex-col divide-y divide-beige-200 dark:divide-green-600">
          {past.map((project) => {
            return (
              <ProjectRow
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
    </div>
  );
}
