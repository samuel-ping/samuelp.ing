import Navbar from "./Navbar";
import NavbarButtons from "../config/NavbarButtons";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
};

export default function Layout({ children }) {
  return (
    <div className="Layout" style={layoutStyle}>
      <Navbar navbarButtons={NavbarButtons} />
      <div className="Content">{children}</div>
    </div>
  );
}
