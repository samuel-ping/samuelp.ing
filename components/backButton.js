'use client';

import { useRouter } from 'next/navigation';

import { LeftArrowIcon as Arrow } from '@/components/icons';

const BackButton = ({ text }) => {
  const router = useRouter();

  return (
    <>
      <div className="w-fit">
        <button
          onClick={() => router.back()}
          className="group flex flex-row items-center gap-x-2 rounded-sm bg-transparent text-lg font-medium text-green-400 transition-colors hover:underline dark:text-green-100"
        >
          <Arrow className="ml-3 w-4 text-green-400 transition duration-300 ease-in-out group-hover:-translate-x-2 dark:text-green-100" />
          <span>{text}</span>
        </button>
      </div>
    </>
  );
};

export default BackButton;
