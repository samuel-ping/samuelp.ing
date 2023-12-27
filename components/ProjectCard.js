'use client';

import Link from 'next/link';

import Chip from '@components/Chip';
import Arrow from '@components/icons/RightArrowIcon';

const ProjectCard = ({ url, title, dates, blurb, tags }) => {
  return (
    <Link href={url}>
      <button
        type="button"
        className="group w-64 h-96 flex flex-col justify-between p-7 rounded-xl border-2 border-green-500 transition-colors hover:bg-green-500"
      >
        <div className=" space-y-2">
          <div className="flex flex-col text-left group-hover:text-green-100">
            <span className="text-2xl ">{title}</span>
            <span className="text-lg font-light italic">{dates}</span>
            <span className="text-lg">{blurb}</span>
          </div>

          {/* tags */}
          <div className="w-full flex flex-row space-x-1">
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
