'use client';

import { usePathname } from 'next/navigation';

import { Popover, Transition } from '@headlessui/react';

import HamburgerButton from '@components/hamburgerButton';
import Logo from '@components/logo';
import NavbarButton from '@components/navbarButton';

export default function Navbar({ navbarButtons }) {
  const pathname = usePathname();

  return (
    <Popover>
      {({ open, close }) => (
        <>
          <nav className="flex items-center justify-between">
            <Logo size={48} visible={true} />

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
            </div>

            <div className="md:hidden">
              <Popover.Button>
                <HamburgerButton isOpen={open} />
              </Popover.Button>
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
              <Popover.Panel className="absolute w-screen flex flex-col bg-green-100 shadow-lg divide-y divide-green-200">
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
              </Popover.Panel>
            </div>
          </Transition>
        </>
      )}
    </Popover>
  );
}
