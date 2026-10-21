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
        {/* `w-fit` keeps the grid as narrow as the cards, so dropping to two or
            one column groups them tightly in the middle of the page instead of
            stranding them at the edges of a full-width grid. */}
        <div className="mx-auto grid w-fit gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((project, i) => {
            // The cards keep the portrait shape and the width they have on a
            // large screen, and only the grid reflows. Without the cap a card
            // stretches with its column and the copy — which is short — leaves
            // a growing void above the arrow.
            //
            // The shape lives on the grid item rather than on the card: the card
            // is `size-full`, so it inherits whatever height the item ends up
            // with, and a grid item's automatic minimum height means a card with
            // unusually long copy grows instead of being clipped by the ratio.
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
                  eventSource="/projects"
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
