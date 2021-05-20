import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import Card from '@components/Card/Card';

export default function Projects({ projects }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold leading-loose text-5xl">Personal Projects</h1>
      <div className="w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-stretch">
        {projects.map((project) => (
          <Card key={project.details.title} info={project} />
        ))}
      </div>
    </div>
  );
}

// Fetches all project markdown files during build time
export async function getStaticProps() {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  const filenames = await fs.readdir(projectsDirectory);

  const projects = filenames.map(async (filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const projectDetails = matter(fileContents);

    return {
      details: projectDetails.data,
      description: projectDetails.content,
    };
  });

  return {
    props: {
      projects: await Promise.all(projects),
    },
  };
}
