'use client';

import Link from 'next/link';

const iconButton = ({ text, icon, url }) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener"
      data-umami-event={`${text} button clicked`}
      data-umami-event-url={url}
    >
      <div className="flex w-fit items-center justify-center gap-x-2 rounded-sm bg-green-400 p-2 font-medium text-beige-100 transition-colors hover:bg-green-500 dark:bg-green-600 dark:text-green-50 dark:hover:bg-green-700">
        {icon}
        <div className="max-w-full flex-initial text-sm leading-none font-normal">
          {text}
        </div>
      </div>
    </Link>
  );
};

export default iconButton;
