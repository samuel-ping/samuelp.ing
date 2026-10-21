import Link from 'next/link';

import Chip from '@/components/chip';
import { RightArrowIcon as Arrow } from '@/components/icons';

/**
 * @param eventSource suffix to be used as a part of the umami event name. I added this to differentiate between clicking on project cards from the home page carousel versus from the projects page.
 */
const ProjectCard = ({ slug, title, dates, gist, tags, eventSource = '' }) => {
  return (
    <Link
      href={`projects/${slug}`}
      className="group flex size-full flex-col justify-between gap-y-6 rounded-lg bg-beige-100 p-6 shadow-card transition-[box-shadow,translate,background-color] duration-200 hover:-translate-y-0.5 hover:bg-beige-200 hover:shadow-card-hover dark:bg-green-700 dark:shadow-none dark:hover:bg-green-650 dark:hover:shadow-card-hover-dark"
      data-umami-event={`${title} project card`}
      data-umami-event-source={eventSource}
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col">
          <span className="text-2xl">{title}</span>
          <span className="font-light text-muted italic">{dates}</span>
          <span>{gist}</span>
        </div>

        {/* tags */}
        <div className="flex w-full flex-wrap gap-2">
          {tags === undefined || tags.length == 0 ? (
            <></>
          ) : (
            tags.map((tag) => <Chip text={tag} key={tag} />)
          )}
        </div>
      </div>

      {/* The whole card is the link, so an arrow alone carries the affordance —
          repeating "learn more" on every card was just noise. */}
      <Arrow className="w-6 transition duration-300 ease-in-out group-hover:translate-x-4" />
    </Link>
  );
};

export default ProjectCard;
