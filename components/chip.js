'use client';

const Chip = ({ text }) => {
  return (
    <div className="flex items-center justify-center rounded-full bg-green-400 px-2 py-1 text-beige-100 dark:bg-green-600">
      <div className="max-w-full flex-initial text-sm leading-none font-normal">
        {text}
      </div>
    </div>
  );
};

export default Chip;
