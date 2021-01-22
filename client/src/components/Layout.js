import Navbar from "./Navbar";
import NavbarButtons from "../config/NavbarButtons";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
};

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <div className="layout" style={layoutStyle}>
        <Navbar navbarButtons={NavbarButtons} />
        <div className="content">{children}</div>
      </div>
    </>
  );
}
