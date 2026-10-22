'use client';

import { useRouter } from 'next/navigation';

import { LeftArrowIcon as Arrow } from '@/components/icons';

const BackButton = ({ text, project }) => {
  const router = useRouter();

  return (
    <div className="w-fit">
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-x-2 rounded-sm text-lg font-medium text-green-400 dark:text-green-100"
        data-umami-event="Back Click"
        data-umami-event-project={project}
      >
        <Arrow className="w-4 transition duration-300 ease-in-out group-hover:-translate-x-1" />
        <span className="wavy-underline wavy-draw-hover group-hover:wavy-drawn">
          {text}
        </span>
      </button>
    </div>
  );
};

export default BackButton;
