// import { Popover, Transition } from '@headlessui/react';

import NavbarButton from './NavbarButton';

// import Logo from 'components/Logo';
// import HamburgerIcon from 'components/HamburgerButton';
// import NavbarButton from 'components/NavbarButton';

export default function Navbar({ navbarButtons }) {
  return (
    <nav className="min-w-full sticky top-0 z-10 flex items-center justify-center">
      <nav className="min-w-full bg-green-10 shadow-sm md:shadow-md">
        <NavbarButton title={'work'} route={'/work'} />
      </nav>
    </nav>
  );
}
