import Link from 'next/link';

import Chip from '@components/chip';
import { RightArrowIcon as Arrow } from '@components/icons';

const ProjectCard = ({ url, title, dates, blurb, tags }) => {
  return (
    <Link href={url}>
      <button
        type="button"
        className="snap-center md:snap-none group w-64 h-80 flex flex-col justify-between p-7 rounded-xl shadow-lg transition-colors bg-green-50 hover:bg-green-500"
      >
        <div className=" space-y-2">
          <div className="flex flex-col text-left group-hover:text-green-100">
            <span className="text-2xl ">{title}</span>
            <span className="text-lg font-light italic">{dates}</span>
            <span className="text-lg">{blurb}</span>
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
        <div className="flex flex-row items-center space-x-2 group-hover:text-green-100">
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
