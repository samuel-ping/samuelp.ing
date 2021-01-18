import NavbarButton from "./NavbarButton";

const navbarStyle = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#387759",
  width: "100%",
  height: "80px",
};

export default function Navbar(props) {
  return (
    <div style={navbarStyle}>
      {props.navbarButtons.map((button, index) => {
        return (
          <NavbarButton key={index} title={button.title} route={button.route} />
        );
      })}
    </div>
  );
}
