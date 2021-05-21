import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import ProjectCard from '@components/CardVariants/ProjectCard/ProjectCard';
import SortCards from '@lib/CardSorter';

export default function Projects({ projects }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold leading-loose text-5xl">Personal Projects</h1>
      <div className="w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8 justify-items-stretch">
        {projects.map((project) => (
          <ProjectCard key={project.details.title} info={project} />
        ))}
      </div>
    </div>
  );
}

// Fetches all project markdown files during build time
export async function getStaticProps() {
  const filesDirectory = path.join(process.cwd(), 'src/content/projects');
  const filenames = await fs.readdir(filesDirectory);

  const projects = filenames.map(async (filename) => {
    const filePath = path.join(filesDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const projectDetails = matter(fileContents);

    return {
      details: projectDetails.data,
      description: projectDetails.content,
    };
  });

  const unsortedProjects = await Promise.all(projects);
  const sortedProjects = SortCards(unsortedProjects);

  return {
    props: {
      projects: sortedProjects,
    },
  };
}
