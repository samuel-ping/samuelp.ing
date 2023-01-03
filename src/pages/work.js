import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import PageHeader from '@components/PageHeader';
import WorkCard from '@components/CardVariants/WorkCard/WorkCard';
import SortCards from 'src/utils/CardSorter';

export default function Work({ workExperiences }) {
  return (
    <div className="flex flex-col items-center">
      <PageHeader text="Work Experience" />
      <h4 className="text-center mb-5 mx-3 lg:hidden">
        Tap on the cards to see more information about my work experience!
      </h4>
      <div className="mx-6 mb-3 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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

  const unsortedWorkExperiences = await Promise.all(workExperiences);
  const sortedWorkExperiences = SortCards(unsortedWorkExperiences);

  return {
    props: {
      workExperiences: sortedWorkExperiences,
    },
  };
}
