'use client';

const Chip = ({ text }) => {
  return (
    <div className="flex justify-center items-center py-1 px-2 rounded-full text-beige-100 bg-green-400 dark:bg-green-500">
      <div className="text-sm font-normal leading-none max-w-full flex-initial">
        {text}
      </div>
    </div>
  );
};

export default Chip;
