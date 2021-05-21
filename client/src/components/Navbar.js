import Logo from '@components/Logo';
import NavbarButton from '@components/NavbarButton';

export default function Navbar({ navbarButtons }) {
  return (
    <>
      <nav className="grid grid-flow-row grid-cols-7 grid-rows-1 justify-items-center my-5">
        {/* Map the first half of the navbar buttons */}
        {navbarButtons.slice(0, navbarButtons.length / 2).map((buttonInfo) => (
          <NavbarButton
            key={buttonInfo.title}
            title={buttonInfo.title}
            route={buttonInfo.route}
          />
        ))}

        <Logo isAnimated size="40" visible />
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
