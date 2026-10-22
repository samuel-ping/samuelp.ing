import Link from 'next/link';

import Chip from '@/components/chip';
import { RightArrowIcon as Arrow } from '@/components/icons';

/**
 * @param list which project list the row belongs to ("featured" or "past"); sent as an umami property.
 * @param position the row's index within its list; sent as an umami property.
 */
const ProjectRow = ({ slug, title, dates, gist, tags, list, position }) => {
  return (
    <Link
      href={`projects/${slug}`}
      className="group flex flex-col gap-y-1 px-4 py-3 transition-[background-color,border-color,border-radius] hover:rounded-lg hover:bg-beige-200 sm:flex-row sm:items-center sm:gap-x-4 dark:hover:bg-green-700 [&:has(+a:hover)]:border-b-transparent"
      data-umami-event="Project Open"
      data-umami-event-project={slug}
      data-umami-event-list={list}
      data-umami-event-position={position}
    >
      <div className="flex shrink-0 flex-col sm:w-52">
        <span className="text-lg">{title}</span>
        <span className="text-sm font-light text-muted italic">{dates}</span>
      </div>

      <span className="flex-1">{gist}</span>

      <div className="flex flex-row items-center gap-x-2">
        {tags === undefined || tags.length == 0 ? (
          <></>
        ) : (
          tags.slice(0, 2).map((tag) => <Chip text={tag} key={tag} />)
        )}
        <Arrow className="w-5 transition duration-300 ease-in-out group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ProjectRow;
