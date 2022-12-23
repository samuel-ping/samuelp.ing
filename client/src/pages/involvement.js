import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import InvolvementCard from '@components/CardVariants/InvolvementCard/InvolvementCard';
import SortCards from '@lib/CardSorter';

export default function Involvement({ involvement }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl leading-normal md:text-5xl md:my-3 lg:my-7">
        Involvement
      </h1>
      <h4 className="text-center mb-5 mx-3 lg:hidden">
        Tap on the cards to see more information about the organizations
        I&apos;ve been a part of!
      </h4>
      <div className="w-10/12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:w-2/4 lg:grid-cols-3 justify-items-stretch">
        {involvement.map((anInvolvement) => (
          <InvolvementCard
            key={anInvolvement.details.activity}
            info={anInvolvement}
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
