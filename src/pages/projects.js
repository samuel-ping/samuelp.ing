import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import PageHeader from '@components/PageHeader';
import ProjectCard from '@components/CardVariants/ProjectCard/ProjectCard';
import SortCards from 'src/utils/CardSorter';

export default function Projects({ projects }) {
  return (
    <div className="flex flex-col items-center">
      <PageHeader text="My Projects" />
      <h4 className="text-center mb-5 mx-3 lg:hidden">
        Tap on the cards to see more information about my projects!
      </h4>
      <div className="mx-6 mb-3 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
