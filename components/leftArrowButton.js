'use client';

import Link from 'next/link';

import { LeftArrowIcon as Arrow } from '@/components/icons';

const RightArrowButton = ({ text, url, className }) => {
  return (
    <>
      <Link href={url} className="w-fit">
        <button
          className={`${className} group flex flex-row items-center gap-x-2 rounded text-lg font-medium transition-colors bg-transparent text-green-300 dark:text-green-50 hover:underline`}
        >
          <Arrow className="w-4 ml-3 text-green-300 dark:text-green-50 transition ease-in-out duration-300 group-hover:-translate-x-2" />
          <span>{text}</span>
        </button>
      </Link>
    </>
  );
};

export default RightArrowButton;
