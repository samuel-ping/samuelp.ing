'use client';

import Button from '@components/outlineButton';
import ProjectCard from '@components/projectCard';

export const ProjectCardCarousel = ({ n, projects }) => {
  return (
    <div className="flex snap-x md:snap-none overflow-x-auto space-x-7">
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
        text={'view all'}
        url={'projects'}
        className={'h-80 space-x-1 rounded-xl'}
      />
    </div>
  );
};

export async function getStaticProps() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const filenames = await fs.readdir(projectsDirectory);

  const projects = filenames.map(async (filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return {
      filename,
      content: fileContents,
    };
  });

  return {
    props: {
      projects: await Promise.all(projects),
    },
  };
}
