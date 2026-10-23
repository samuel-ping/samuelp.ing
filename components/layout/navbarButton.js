'use client';

import Link from 'next/link';

const NavbarButton = ({ active, title, route, mobile, close }) => {
  if (mobile) {
    return (
      <Link
        href={route}
        className={`${
          active ? 'text-green-400 dark:text-green-100' : 'hover-tint'
        } py-6 text-center text-xl transition-colors`}
        onClick={close}
        data-umami-event="Nav Click"
        data-umami-event-destination={title}
        data-umami-event-placement="mobile"
      >
        {title}
      </Link>
    );
  }

  return (
    <Link
      href={route}
      className={`wavy-underline ${
        active
          ? 'text-green-400 dark:text-green-100'
          : 'wavy-draw-hover hover:wavy-drawn hover-tint'
      } flex items-center justify-center text-base transition-colors`}
      data-umami-event="Nav Click"
      data-umami-event-destination={title}
      data-umami-event-placement="desktop"
    >
      {title}
    </Link>
  );
};

export default NavbarButton;
