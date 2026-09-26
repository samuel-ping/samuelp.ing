import Link from 'next/link';

import Chip from '@/components/chip';
import { RightArrowIcon as Arrow } from '@/components/icons';

/**
 * Compact single-row alternative to ProjectCard, used for past projects on the projects page.
 * @param eventSource suffix to be used as a part of the umami event name. I added this to differentiate between clicking on project rows from the projects page versus other pages.
 */
const ProjectRow = ({ slug, title, dates, gist, tags, eventSource = '' }) => {
  return (
    <Link
      href={`projects/${slug}`}
      className="group flex flex-col gap-y-1 rounded-lg px-4 py-3 transition-colors hover:bg-beige-200 sm:flex-row sm:items-center sm:gap-x-4 dark:hover:bg-green-800"
      data-umami-event={`${title} project row`}
      data-umami-event-source={eventSource}
    >
      <div className="flex shrink-0 flex-col sm:w-52">
        <span className="text-lg">{title}</span>
        <span className="text-sm font-light italic">{dates}</span>
      </div>

      <span className="flex-1">{gist}</span>

      <div className="flex flex-row items-center gap-x-2">
        {tags === undefined || tags.length == 0 ? (
          <></>
        ) : (
          tags.slice(0, 2).map((tag) => <Chip text={tag} key={tag} />)
        )}
        <Arrow
          className={
            'w-5 transition duration-300 ease-in-out group-hover:translate-x-2'
          }
        />
      </div>
    </Link>
  );
};

export default ProjectRow;
