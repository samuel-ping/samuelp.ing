'use client';

const Chip = ({ text }) => {
  return (
    <div class="flex justify-center items-center py-1 px-2 rounded-full text-green-100 group-hover:text-green-500 bg-green-500 group-hover:bg-green-100">
      <div class="text-sm font-normal leading-none max-w-full flex-initial">
        {text}
      </div>
    </div>
  );
};

export default Chip;
