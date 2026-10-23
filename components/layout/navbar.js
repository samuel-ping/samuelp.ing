'use client';

import { usePathname } from 'next/navigation';

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';

import HamburgerMenuIcon from '@/components/ui/hamburgerMenuIcon';
import Logo from '@/components/layout/logo';
import NavbarButton from '@/components/layout/navbarButton';
import { ThemeToggle } from '@/components/layout/themeToggle';

export default function Navbar({ navbarButtons }) {
  const pathname = usePathname();

  return (
    <Popover className="z-50">
      {({ open, close }) => (
        <>
          <nav className="mt-8 gutter-x">
            <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between">
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
                <PopoverButton data-umami-event="Mobile Nav Open">
                  <HamburgerMenuIcon isOpen={open} />
                </PopoverButton>
              </div>
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
                <div className="flex justify-center py-6">
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
