'use client';

import Link from 'next/link';

import { RightArrowIcon as Arrow } from '@/components/icons';

const RightArrowButton = ({ text, url, eventName, className }) => {
  return (
    <Link href={url} className="w-fit flex items-center">
      <button
        className={`${className} group flex flex-row items-center space-x-2 rounded text-2xl font-medium transition-colors text-green-300 dark:text-green-50 hover:underline`}
        data-umami-event={eventName}
      >
        <span>{text}</span>
        <Arrow className="w-6 text-green-300 dark:text-green-50 transition ease-in-out duration-300 group-hover:translate-x-2" />
      </button>
    </Link>
  );
};

export default RightArrowButton;
