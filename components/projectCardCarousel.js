'use client';

import Button from '@/components/rightArrowButton';
import ProjectCard from '@/components/projectCard';

export const ProjectCardCarousel = ({ projects }) => {
  return (
    <div className="flex snap-x md:snap-none overflow-x-auto space-x-7 px-5 md:px-10 pb-5">
      {projects.props.projects.map((project) => {
        return (
          <ProjectCard
            key={project.details.title}
            title={project.details.title}
            dates={project.details.dates}
            gist={project.details.gist}
            tags={project.details.tags}
            slug={project.details.slug}
          />
        );
      })}
      <Button
        text={'see all'}
        url={'projects'}
        className={
          'snap-center p-4 rounded-xl bg-beige-100 hover:bg-beige-200 border border-beige-200 dark:bg-green-600 dark:hover:bg-green-700 dark:border-green-500'
        }
      />
    </div>
  );
};
