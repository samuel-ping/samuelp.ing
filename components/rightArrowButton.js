'use client';

import Link from 'next/link';

import { RightArrowIcon as Arrow } from '@/components/icons';

const RightArrowButton = ({ text, url, eventName, className }) => {
  return (
    <Link href={url} className="flex w-fit items-center">
      <button
        className={`${className} group flex flex-row items-center space-x-2 rounded-sm text-2xl font-medium text-green-600 transition-colors hover:underline dark:text-green-100`}
        data-umami-event={eventName}
      >
        <span>{text}</span>
        <Arrow className="w-6 text-green-600 transition duration-300 ease-in-out group-hover:translate-x-2 dark:text-green-100" />
      </button>
    </Link>
  );
};

export default RightArrowButton;
