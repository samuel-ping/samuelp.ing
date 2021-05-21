import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import InvolvementCard from '@components/CardVariants/InvolvementCard/InvolvementCard';
import SortCards from '@lib/CardSorter';

export default function Involvement({ involvement }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold leading-loose text-5xl">Involvement</h1>
      <div className="w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
        {involvement.map((involvement) => (
          <InvolvementCard
            key={involvement.details.activity}
            info={involvement}
          />
        ))}
      </div>
    </div>
  );
}

// Fetches all project markdown files during build time
export async function getStaticProps() {
  const filesDirectory = path.join(process.cwd(), 'src/content/involvement');
  const filenames = await fs.readdir(filesDirectory);

  const involvement = filenames.map(async (filename) => {
    const filePath = path.join(filesDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const involvementDetails = matter(fileContents);

    return {
      details: involvementDetails.data,
      description: involvementDetails.content,
    };
  });

  const unsortedInvolvement = await Promise.all(involvement);
  const sortedInvolvement = SortCards(unsortedInvolvement);

  return {
    props: {
      involvement: sortedInvolvement,
    },
  };
}
