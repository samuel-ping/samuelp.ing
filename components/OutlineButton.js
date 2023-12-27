'use client';

import Link from 'next/link';

import Arrow from 'components/icons/RightArrowIcon';

const ContactBarButton = ({ text, url }) => {
  return (
    <>
      <Link href={url} className="w-fit">
        <button className="group py-2 px-4 flex flex-row items-center space-x-2 border-2 rounded text-xl font-medium transition-colors bg-transparent hover:bg-green-500 text-green-500 hover:text-white border-green-500 hover:border-transparent">
          <span>{text}</span>
          <Arrow
            className={
              'w-6 text-green-500 group-hover:text-green-100 transition ease-in-out duration-300 group-hover:translate-x-2'
            }
          />
        </button>
      </Link>
    </>
  );
};

export default ContactBarButton;
