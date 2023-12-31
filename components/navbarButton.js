'use client';

import Link from 'next/link';

const NavbarButton = ({ active, title, route, mobile, close }) => {
  if (mobile) {
    return (
      <Link
        href={route}
        className={`${
          active ? 'text-primaryLargeText' : ''
        } p-12 text-center text-xl transition-colors hover:text-primaryLargeText`}
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
        active ? 'text-primaryLargeText' : ''
      } flex items-center justify-center cursor-pointer text-xl transition-colors hover:text-primaryLargeText`}
    >
      <Link href={route}>
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default NavbarButton;
