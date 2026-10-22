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
    <div className="flex w-full flex-col gap-y-8">
      <PageTitle text="Projects" />

      {/* featured projects */}
      <div className="flex flex-col gap-y-4">
        <h2
          className="settle font-display text-2xl font-medium"
          style={{ animationDelay: '80ms' }}
        >
          Featured
        </h2>

        <div className="mx-auto grid w-fit gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((project, i) => {
            return (
              <div
                key={project.details.title}
                className="aspect-4/5 w-full max-w-60 settle"
                style={{ animationDelay: `${140 + i * 70}ms` }}
              >
                <ProjectCard
                  title={project.details.title}
                  dates={project.details.dates}
                  gist={project.details.gist}
                  tags={project.details.tags}
                  slug={project.details.slug}
                  list="featured"
                  position={i}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* past projects */}
      <div className="flex w-full flex-col gap-y-4">
        <h2 className="font-display text-2xl font-medium">Past projects</h2>
        <div className="flex w-full flex-col divide-y divide-beige-200 dark:divide-green-700">
          {past.map((project, i) => {
            return (
              <ProjectRow
                key={project.details.title}
                title={project.details.title}
                dates={project.details.dates}
                gist={project.details.gist}
                tags={project.details.tags}
                slug={project.details.slug}
                list="past"
                position={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
