'use client';

const Chip = ({ text }) => {
  return (
    <div className="flex items-center justify-center rounded-full bg-green-400 px-2 py-1 text-beige-100">
      <div className="max-w-full text-sm leading-none font-normal">{text}</div>
    </div>
  );
};

export default Chip;
