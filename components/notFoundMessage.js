import Image from 'next/image';

import Shrimp from '@/public/assets/shrimp.webp';

export default function NotFoundMessage() {
  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="flex flex-row items-center">
        <span className="text-8xl font-extrabold">4</span>
        <Image
          src={Shrimp}
          alt="photo of Shrimp, my favorite succulent"
          placeholder="blur"
          priority
          className="w-44 h-44 md:w-64 md:h-64 animate-[spin_6s_linear_infinite]"
        />
        <span className="text-8xl font-extrabold">4</span>
      </div>
      <span className="text-xl mx-6">
        The page you&apos;re looking for does not exist. Instead, here&apos;s
        Shrimp, my <span className="italic">echeveria fleur blanc</span> :&#41;
      </span>
    </div>
  );
}
