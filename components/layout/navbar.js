'use client';

import { usePathname } from 'next/navigation';

import Logo from '@/components/layout/logo';
import NavbarButton from '@/components/layout/navbarButton';
import { ThemeToggle } from '@/components/layout/themeToggle';

export default function Navbar({ navbarButtons }) {
  const pathname = usePathname();

  return (
    <nav className="mt-6 gutter-x xs:mt-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center justify-between xs:h-14">
          <Logo isAnimated size={48} visible={true} />

          {/* Single row */}
          <div className="hidden flex-row gap-x-4 xs:flex">
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

          <div className="xs:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-x-6 pt-3 xs:hidden">
          {navbarButtons.map((button) => (
            <NavbarButton
              key={button.route}
              active={`/${pathname.split('/')[1]}` === button.route}
              title={button.title}
              route={button.route}
              placement="mobile"
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
