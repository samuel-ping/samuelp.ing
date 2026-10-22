'use client';

import Link from 'next/link';

import { RightArrowIcon as Arrow } from '@/components/icons';

const RightArrowButton = ({ text, url, className, style }) => {
  return (
    <Link
      href={url}
      style={style}
      className={`${className ?? ''} group flex w-fit items-center gap-x-2 rounded-sm text-2xl font-medium text-green-600 dark:text-green-100`}
      data-umami-event="CTA Click"
      data-umami-event-label={text}
    >
      <span className="wavy-underline wavy-draw-hover group-hover:wavy-drawn">
        {text}
      </span>
      <Arrow className="w-6 transition duration-300 ease-in-out group-hover:translate-x-2" />
    </Link>
  );
};

export default RightArrowButton;
