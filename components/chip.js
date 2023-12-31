'use client';

const Chip = ({ text }) => {
  return (
    <div className="flex justify-center items-center py-1 px-2 rounded-full text-primaryBg bg-primarySmallTextBg">
      <div className="text-sm font-normal leading-none max-w-full flex-initial">
        {text}
      </div>
    </div>
  );
};

export default Chip;
