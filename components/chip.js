'use client';

const Chip = ({ text }) => {
  return (
    <div className="flex items-center justify-center rounded-full border border-green-300 px-2 py-1 text-green-600 dark:border-green-500 dark:text-green-200">
      <div className="max-w-full flex-initial text-sm leading-none font-normal">
        {text}
      </div>
    </div>
  );
};

export default Chip;
