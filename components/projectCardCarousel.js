'use client';

import Button from '@/components/rightArrowButton';
import ProjectCard from '@/components/projectCard';

export const ProjectCardCarousel = ({ projects }) => {
  return (
    <div className="flex snap-x md:snap-none overflow-x-auto space-x-7 pb-5">
      {projects.props.projects.map((project) => {
        return (
          <ProjectCard
            key={project.details.title}
            title={project.details.title}
            dates={project.details.dates}
            gist={project.details.gist}
            tags={project.details.tags}
            repo={project.details.repo}
          />
        );
      })}
      <Button text={'see all'} url={'projects'} className={'h-80 pr-4'} />
    </div>
  );
};
