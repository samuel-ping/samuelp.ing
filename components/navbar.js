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
    <Popover className="z-50">
      {({ open, close }) => (
        <>
          <nav className="my-8 flex h-14 items-center justify-between px-6">
            <Logo isAnimated size={48} visible={true} />

            {/* Desktop nav */}
            <div className="hidden flex-row gap-x-4 md:flex">
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
            <div className="flex justify-center md:hidden">
              <PopoverPanel className="absolute flex w-screen flex-col divide-y divide-beige-200 bg-beige-100 shadow-lg dark:divide-green-600 dark:bg-green-700 dark:shadow-green-800">
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
                <div className="flex justify-center p-12">
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
