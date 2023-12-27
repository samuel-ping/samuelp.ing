'use client';

import Link from 'next/link';

import Chip from '@components/chip';
import { RightArrowIcon as Arrow } from '@components/icons';

const WorkCard = ({ url, title, company, dates, location, tags }) => {
  return (
    <Link href={url}>
      <button
        type="button"
        className="group w-full flex flex-row items-center space-x-7 space-y-2 px-10 py-6 rounded-3xl border-2 border-green-500 transition-colors hover:bg-green-500"
      >
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col text-left group-hover:text-green-100">
              <span className="text-2xl font-light ">{title}</span>
              <span className="text-2xl font-medium ">{company}</span>
            </div>

            <div className="flex flex-row items-center space-x-9">
              <div className="flex flex-col text-right group-hover:text-green-100">
                <span className="text-2xl font-light ">{dates}</span>
                <span className="text-2xl font-light ">{location}</span>
              </div>
            </div>
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

        <Arrow
          className={
            'w-8 group-hover:text-green-100 transition ease-in-out duration-300 group-hover:translate-x-4'
          }
        />
      </button>
    </Link>
  );
};

export default WorkCard;
