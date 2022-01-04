import { Popover, Transition } from '@headlessui/react';
import { GrClose, GrMenu } from 'react-icons/gr';

import Logo from '@components/Logo';
import NavbarButton from '@components/NavbarButton';

export default function Navbar({ navbarButtons }) {
  return (
    <div className="min-w-full sticky top-0 z-10 flex items-center justify-center">
      <nav className="min-w-full backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-sm md:shadow-md">
        <Popover>
          {({ open, close }) => (
            <>
              <div className="my-4 px-4 sm:mx-6 lg:mx-12 xl:mx-56 2xl:mx-96">
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
                      {open ? <GrClose size={35} /> : <GrMenu size={35} />}
                      {/* TODO: Animate the hamburger menu :) */}
                      {/* <Hamburger
                        toggled={open}
                      /> */}
                    </Popover.Button>
                  </div>
                </div>
              </div>

              <Transition
                show={open}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel className="absolute min-w-full">
                  <div className="px-4 py-3 shadow-lg bg-green-50 flex-col divide-y divide-gray-200">
                    {navbarButtons.map((buttonInfo) => (
                      <NavbarButton
                        key={buttonInfo.title}
                        title={buttonInfo.title}
                        route={buttonInfo.route}
                        mobile={true}
                        close={close}
                      />
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </nav>
    </div>
  );
}
