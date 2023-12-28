'use client';

import Button from '@components/outlineButton';
import ProjectCard from '@components/projectCard';

export const ProjectCardCarousel = ({ projects }) => {
  return (
    <div className="flex snap-x md:snap-none overflow-x-auto space-x-7 pb-5">
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
      <Button
        text={'see all'}
        url={'projects'}
        className={'h-80 space-x-1 rounded-xl'}
      />
    </div>
  );
};
