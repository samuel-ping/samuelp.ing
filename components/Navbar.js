'use client';

// import { Popover, Transition } from '@headlessui/react';
import { usePathname } from 'next/navigation';

import Logo from '@components/logo';
// import HamburgerIcon from 'components/HamburgerButton';
import NavbarButton from '@components/navbarButton';

export default function Navbar({ navbarButtons }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between">
      <Logo size={48} visible={true} />
      <div className="flex flex-row space-x-4">
        {navbarButtons.map((button) => (
          <NavbarButton
            // active even when multiple levels deep
            active={`/${pathname.split('/')[1]}` === button.route}
            title={button.title}
            route={button.route}
            key={button.route}
          />
        ))}
      </div>
    </nav>
  );
}
