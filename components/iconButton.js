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
      <div className="w-fit flex justify-center items-center gap-x-2 font-medium p-2 rounded text-beige-100 dark:text-green-50 bg-green-400 dark:bg-green-500 transition-opacity hover:opacity-85">
        {icon}
        <div className="text-sm font-normal leading-none max-w-full flex-initial">
          {text}
        </div>
      </div>
    </Link>
  );
};

export default iconButton;
