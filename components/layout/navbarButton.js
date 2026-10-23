'use client';

import Link from 'next/link';

const NavbarButton = ({ active, title, route, placement = 'desktop' }) => (
  <Link
    href={route}
    className={`group -my-2.5 flex items-center justify-center py-2.5 text-base transition-colors ${
      active ? 'text-green-400 dark:text-green-100' : 'hover-tint'
    }`}
    data-umami-event="Nav Click"
    data-umami-event-destination={title}
    data-umami-event-placement={placement}
  >
    <span
      className={`wavy-underline ${
        active ? '' : 'wavy-draw-hover group-hover:wavy-drawn'
      }`}
    >
      {title}
    </span>
  </Link>
);

export default NavbarButton;
