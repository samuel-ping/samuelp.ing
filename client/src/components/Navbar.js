import NavbarButtons from '@config/NavbarButtons.config';
import Logo from '@components/Logo';
import NavbarButton from '@components/NavbarButton';

export default function Navbar({ navbarButtons }) {
  return (
    <>
      <nav className="grid grid-flow-row grid-cols-7 grid-rows-1 justify-items-center my-5">
        {/* Map the first half of the navbar buttons */}
        {navbarButtons
          .slice(0, navbarButtons.length / 2)
          .map((buttonInfo, index) => {
            return (
              <NavbarButton
                key={index}
                title={buttonInfo.title}
                route={buttonInfo.route}
              />
            );
          })}

        <Logo isAnimated={true} size="75" />

        {/* Map the second half of the navbar buttons */}
        {navbarButtons
          .slice(navbarButtons.length / 2, navbarButtons.length)
          .map((buttonInfo, index) => {
            return (
              <NavbarButton
                key={index}
                title={buttonInfo.title}
                route={buttonInfo.route}
              />
            );
          })}
      </nav>
    </>
  );
}
