'use client';

// import { Popover, Transition } from '@headlessui/react';

import Logo from '@components/logo';
// import HamburgerIcon from 'components/HamburgerButton';
import NavbarButton from '@components/navbarButton';

export default function Navbar({ navbarButtons }) {
  return (
    <nav className="flex items-center justify-between">
      <Logo size={48} visible={true} />
      <div className="flex flex-row space-x-4">
        {navbarButtons.map((button) => (
          <NavbarButton
            title={button.title}
            route={button.route}
            key={button.route}
          />
        ))}
      </div>
    </nav>
  );
}
