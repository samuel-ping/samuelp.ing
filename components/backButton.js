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
          className="group flex flex-row items-center gap-x-2 rounded text-lg font-medium transition-colors bg-transparent text-green-300 dark:text-green-50 hover:underline"
        >
          <Arrow className="w-4 ml-3 text-green-300 dark:text-green-50 transition ease-in-out duration-300 group-hover:-translate-x-2" />
          <span>{text}</span>
        </button>
      </div>
    </>
  );
};

export default BackButton;
