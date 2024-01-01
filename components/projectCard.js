import Link from 'next/link';

import Chip from '@/components/chip';
import { RightArrowIcon as Arrow } from '@/components/icons';

const ProjectCard = ({ slug, title, dates, gist, tags }) => {
  return (
    <Link href={`projects/${slug}`}>
      <button
        type="button"
        className="snap-center md:snap-none group w-64 h-80 flex flex-col justify-between p-7 rounded-xl shadow-lg dark:shadow-green-700 transition-colors bg-beige-100 hover:bg-beige-200 border border-beige-200 dark:bg-green-600 dark:hover:bg-green-700 dark:border-green-500"
      >
        <div className=" space-y-2">
          <div className="flex flex-col text-left ">
            <span className="text-2xl ">{title}</span>
            <span className="font-light italic">{dates}</span>
            <span className="">{gist}</span>
          </div>

          {/* tags */}
          <div className="w-full flex flex-row flex-wrap gap-1">
            {tags === undefined || tags.length == 0 ? (
              <></>
            ) : (
              tags.map((tag) => <Chip text={tag} key={tag} />)
            )}
          </div>
        </div>

        {/* learn more button */}
        <div className="flex flex-row items-center gap-x-2 ">
          <span className="text-xl">learn more</span>
          <Arrow
            className={
              'w-6 transition ease-in-out duration-300 group-hover:translate-x-4'
            }
          />
        </div>
      </button>
    </Link>
  );
};

export default ProjectCard;
