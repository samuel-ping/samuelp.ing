'use client';

import Link from 'next/link';

const NavbarButton = ({ active, title, route, mobile, close }) => {
  if (mobile) {
    return (
      <Link
        href={route}
        className={`${
          active ? 'text-green-500' : ''
        } p-12 text-center text-xl transition-colors hover:text-green-500`}
        onClick={close}
        aria-hidden="true"
      >
        {title}
      </Link>
    );
  }

  return (
    <div
      className={`${
        active ? 'text-green-500' : ''
      } flex items-center justify-center cursor-pointer text-xl transition-colors hover:text-green-500`}
    >
      <Link href={route}>
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default NavbarButton;
