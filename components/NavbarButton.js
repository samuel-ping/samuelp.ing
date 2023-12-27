'use client';

import Link from 'next/link';

const NavbarButton = ({ title, route, mobile }) => {
  if (mobile) {
    return (
      <Link href={route}>
        <div
          className="flex px-4 py-2 text-md leading-10 font-medium"
          // onClick={close}
          aria-hidden="true"
        >
          <span>{title}</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-center cursor-pointer hover:underline text-md font-medium">
      <Link href={route}>
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default NavbarButton;
