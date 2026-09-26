import Link from 'next/link';

import Chip from '@/components/chip';
import { RightArrowIcon as Arrow } from '@/components/icons';

/**
 * @param eventSource suffix to be used as a part of the umami event name. I added this to differentiate between clicking on project cards from the home page carousel versus from the projects page.
 */
const ProjectCard = ({ slug, title, dates, gist, tags, eventSource = '' }) => {
  return (
    <Link href={`projects/${slug}`}>
      <button
        type="button"
        className="group flex h-80 w-64 snap-center flex-col justify-between rounded-xl border border-beige-200 bg-beige-100 p-7 shadow-lg transition-colors hover:bg-beige-200 md:snap-none dark:border-green-600 dark:bg-green-700 dark:shadow-green-800 dark:hover:bg-green-800"
        data-umami-event={`${title} project card`}
        data-umami-event-source={eventSource}
      >
        <div className=" space-y-2">
          <div className="flex flex-col text-left ">
            <span className="text-2xl ">{title}</span>
            <span className="font-light italic">{dates}</span>
            <span className="">{gist}</span>
          </div>

          {/* tags */}
          <div className="flex w-full flex-row flex-wrap gap-1">
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
              'w-6 transition duration-300 ease-in-out group-hover:translate-x-4'
            }
          />
        </div>
      </button>
    </Link>
  );
};

export default ProjectCard;
