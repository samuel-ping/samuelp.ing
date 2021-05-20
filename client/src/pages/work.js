import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import WorkCard from '@components/CardVariants/WorkCard/WorkCard';

export default function Work({ workExperiences }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold leading-loose text-5xl">Work Experience</h1>
      <div className="w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-stretch">
        {workExperiences.map((workExperience) => (
          <WorkCard key={workExperience.details.title} info={workExperience} />
        ))}
      </div>
    </div>
  );
}

// Fetches all project markdown files during build time
export async function getStaticProps() {
  const filesDirectory = path.join(process.cwd(), 'src/content/work');
  const filenames = await fs.readdir(filesDirectory);

  const workExperiences = filenames.map(async (filename) => {
    const filePath = path.join(filesDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const workDetails = matter(fileContents);

    return {
      details: workDetails.data,
      description: workDetails.content,
    };
  });

  return {
    props: {
      workExperiences: await Promise.all(workExperiences),
    },
  };
}
