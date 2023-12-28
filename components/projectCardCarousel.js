'use client';

import Button from '@components/outlineButton';
import ProjectCard from '@components/projectCard';

export const ProjectCardCarousel = ({ n, projects }) => {
  return (
    <div className="flex snap-x md:snap-none overflow-x-auto space-x-7 pb-5">
      <ProjectCard
        url={''}
        title={'Personal Website'}
        dates={'May 2020 - Present'}
        blurb={"The website you're looking at right now!"}
        tags={['react.js', 'figma']}
      />
      <ProjectCard
        url={''}
        title={'Personal Website'}
        dates={'May 2020 - Present'}
        blurb={"The website you're looking at right now!"}
        tags={['react.js', 'figma']}
      />
      <ProjectCard
        url={''}
        title={'Personal Website'}
        dates={'May 2020 - Present'}
        blurb={"The website you're looking at right now!"}
        tags={['react.js', 'figma']}
      />
      <ProjectCard
        url={''}
        title={'Personal Website'}
        dates={'May 2020 - Present'}
        blurb={"The website you're looking at right now!"}
        tags={['react.js', 'figma']}
      />
      <Button
        text={'see all'}
        url={'projects'}
        className={'h-80 space-x-1 rounded-xl'}
      />
    </div>
  );
};
