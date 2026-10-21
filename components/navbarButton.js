'use client';

import Link from 'next/link';

const NavbarButton = ({ active, title, route, mobile, close }) => {
  if (mobile) {
    return (
      <Link
        href={route}
        className={`${
          active ? 'text-green-400 dark:text-green-100' : ''
        } py-6 text-center text-xl hover-tint transition-colors`}
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
        active ? 'wavy-underline text-green-400 dark:text-green-100' : ''
      } flex items-center justify-center text-base hover-tint transition-colors`}
      data-umami-event={`${title} nav button`}
    >
      {title}
    </Link>
  );
};

export default NavbarButton;
