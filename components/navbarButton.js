'use client';

import Link from 'next/link';

const NavbarButton = ({ active, title, route, mobile, close }) => {
  if (mobile) {
    return (
      <Link
        href={route}
        className={`${
          active ? 'text-green-300 dark:text-green-50' : ''
        } p-12 text-center text-xl transition-colors hover:text-green-300 dark:hover:text-green-50`}
        onClick={close}
        aria-hidden="true"
        data-umami-event={`${title} nav button`}
      >
        {title}
      </Link>
    );
  }

  return (
    <div
      className={`${
        active ? 'text-green-300 dark:text-green-50' : ''
      } flex items-center justify-center cursor-pointer text-xl transition-colors hover:text-green-300 dark:hover:text-green-50`}
    >
      <Link href={route} data-umami-event={`${title} nav button`}>
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default NavbarButton;
