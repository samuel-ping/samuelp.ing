'use client';

import Link from 'next/link';

const NavbarButton = ({ active, title, route, mobile, close }) => {
  if (mobile) {
    return (
      <Link
        href={route}
        className={`${
          active ? 'text-green-400 dark:text-green-100' : ''
        } py-6 text-center text-xl transition-colors hover:text-green-400 dark:hover:text-green-50`}
        onClick={close}
        data-umami-event={`${title} nav button`}
      >
        {title}
      </Link>
    );
  }

  return (
    <Link
      href={route}
      className={`${
        active ? 'text-green-400 dark:text-green-100' : ''
      } flex items-center justify-center text-base transition-colors hover:text-green-400 dark:hover:text-green-50`}
      data-umami-event={`${title} nav button`}
    >
      {title}
    </Link>
  );
};

export default NavbarButton;
