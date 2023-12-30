'use client';

import Link from 'next/link';

const iconButton = ({ text, icon, url }) => {
  return (
    <Link href={url} target="_blank" rel="noopener">
      <div className="w-fit flex justify-center items-center gap-x-2 font-medium p-2 transition-opacity text-green-100 bg-green-500 hover:opacity-85 rounded ">
        {icon}
        <div className="text-sm font-normal leading-none max-w-full flex-initial">
          {text}
        </div>
      </div>
    </Link>
  );
};

export default iconButton;
