// import Logo from "./Logo";
import NavbarButton from './NavbarButton';

export default function Navbar(props) {
  return (
    <>
      <nav className="flex flex-row ">
        <NavbarButton title="about" route="/about" />
        <NavbarButton title="experience" route="/work" />
        <NavbarButton title="projects" route="/projects" />
        <NavbarButton title="involvement" route="/involvement" />
      </nav>
    </>
  );
}
