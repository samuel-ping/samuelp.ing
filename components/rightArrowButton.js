'use client';

import Link from 'next/link';

import { RightArrowIcon as Arrow } from '@/components/icons';

const RightArrowButton = ({ text, url, className, color }) => {
  return (
    <Link href={url} className="w-fit flex items-center">
      <button
        className={`${className} group flex flex-row items-center space-x-2 rounded text-2xl font-medium transition-colors text-${
          color ? color : 'primaryLargeText'
        } hover:underline`}
      >
        <span>{text}</span>
        <Arrow className="w-6 text-primaryLargeText transition ease-in-out duration-300 group-hover:translate-x-2" />
      </button>
    </Link>
  );
};

export default RightArrowButton;
