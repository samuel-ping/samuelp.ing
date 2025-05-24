'use client';

import { usePathname } from 'next/navigation';

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';

import HamburgerMenuIcon from '@/components/hamburgerMenuIcon';
import Logo from '@/components/logo';
import NavbarButton from '@/components/navbarButton';
import { ThemeToggle } from '@/components/themeToggle';

export default function Navbar({ navbarButtons }) {
  const pathname = usePathname();

  return (
    <Popover>
      {({ open, close }) => (
        <>
          <nav className="flex items-center justify-between">
            <Logo isAnimated size={48} visible={true} />

            {/* Desktop nav */}
            <div className="hidden md:flex flex-row gap-x-4">
              {navbarButtons.map((button) => (
                <NavbarButton
                  key={button.route}
                  // active even when multiple levels deep
                  active={`/${pathname.split('/')[1]}` === button.route}
                  title={button.title}
                  route={button.route}
                />
              ))}
              <ThemeToggle />
            </div>

            <div className="md:hidden">
              <PopoverButton>
                <HamburgerMenuIcon isOpen={open} />
              </PopoverButton>
            </div>
          </nav>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <div className="md:hidden flex justify-center">
              <PopoverPanel className="absolute w-screen flex flex-col bg-beige-100 dark:bg-green-600 shadow-lg dark:shadow-green-700 divide-y divide-beige-200 dark:divide-green-500">
                {navbarButtons.map((button) => (
                  <NavbarButton
                    key={button.title}
                    active={`/${pathname.split('/')[1]}` === button.route}
                    title={button.title}
                    route={button.route}
                    mobile
                    close={close}
                  />
                ))}
                <div className="p-12 flex justify-center">
                  <ThemeToggle />
                </div>
              </PopoverPanel>
            </div>
          </Transition>
        </>
      )}
    </Popover>
  );
}
