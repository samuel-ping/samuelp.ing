import { Popover, Transition } from '@headlessui/react';

import Logo from '@components/Logo';
import HamburgerIcon from '@components/HamburgerButton';
import NavbarButton from '@components/NavbarButton';

export default function Navbar({ navbarButtons }) {
  return (
    <div className="min-w-full sticky top-0 z-10 flex items-center justify-center">
      <nav className="min-w-full bg-green-10 shadow-sm md:shadow-md">
        <Popover>
          {({ open, close }) => (
            <>
              <div className="my-2 mx-6 ">
                <div className="flex items-center justify-between h-16">
                  <div className="flex-shrink-0">
                    <Logo isAnimated size="40" visible />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navbarButtons.map((buttonInfo) => (
                        <NavbarButton
                          key={buttonInfo.title}
                          title={buttonInfo.title}
                          route={buttonInfo.route}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="md:hidden">
                    <Popover.Button>
                      {/* I literally have no idea why I have to cast it to a boolean when its already a boolean. */}
                      <HamburgerIcon isOpen={Boolean(open)} />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <Transition
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Hide Popover Panel when user expand browser window */}
              <div className="md:hidden">
                <Popover.Panel className="absolute min-w-full">
                  <div className="px-4 py-3 shadow-lg bg-green-10 flex flex-col divide-y divide-gray-300">
                    {navbarButtons.map((buttonInfo) => (
                      <NavbarButton
                        key={buttonInfo.title}
                        title={buttonInfo.title}
                        route={buttonInfo.route}
                        mobile
                        close={close}
                      />
                    ))}
                  </div>
                </Popover.Panel>
              </div>
              </Transition>
            </>
          )}
        </Popover>
      </nav>
    </div>
  );
}
