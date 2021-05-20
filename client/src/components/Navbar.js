import { useRouter, userRouter } from 'next/router';

import Logo from '@components/Logo';
import NavbarButton from '@components/NavbarButton';

export default function Navbar({ navbarButtons }) {
  const router = useRouter();

  return (
    <>
      {/* <nav className="bg-transparent w-4/12">
        <div className="min-w-full flex flex-row items-center justify-between">
          <div className="justify-self-start">
            <Logo isAnimated size="50" />
          </div>
          <div className="justify-self-end flex flex-row space-x-4">
            {navbarButtons.map((buttonInfo) => (
              <NavbarButton
                key={buttonInfo.title}
                title={buttonInfo.title}
                route={buttonInfo.route}
              />
            ))}
          </div>
        </div>
      </nav> */}

      <nav className="grid grid-flow-row grid-cols-7 grid-rows-1 justify-items-center my-5">
        {/* Map the first half of the navbar buttons */}
        {navbarButtons.slice(0, navbarButtons.length / 2).map((buttonInfo) => (
          <NavbarButton
            key={buttonInfo.title}
            title={buttonInfo.title}
            route={buttonInfo.route}
          />
        ))}

        <Logo
          isAnimated
          size="40"
          visible
          // visible={router.asPath === '/' ? false : true}
        />
        {/* Map the second half of the navbar buttons */}
        {navbarButtons
          .slice(navbarButtons.length / 2, navbarButtons.length)
          .map((buttonInfo) => (
            <NavbarButton
              key={buttonInfo.title}
              title={buttonInfo.title}
              route={buttonInfo.route}
            />
          ))}
      </nav>
    </>
  );
}
