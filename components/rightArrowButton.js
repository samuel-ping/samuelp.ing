'use client';

import Link from 'next/link';

import { RightArrowIcon as Arrow } from '@components/icons';

const RightArrowButton = ({ text, url, className }) => {
  return (
    <>
      <Link href={url} className="w-fit">
        <button
          className={`${className} group flex flex-row items-center space-x-2 rounded text-xl font-medium transition-colors bg-transparent text-green-500 hover:underline`}
        >
          <span>{text}</span>
          <Arrow className="w-6 text-green-500 transition ease-in-out duration-300 group-hover:translate-x-2" />
        </button>
      </Link>
    </>
  );
};

export default RightArrowButton;
