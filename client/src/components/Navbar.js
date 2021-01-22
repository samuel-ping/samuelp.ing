import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";

import NavbarButton from "./NavbarButton";

const navbarStyle = {
  display: "flex",
  // flexDirection: "row",
  justifyContent: "center",
  // backgroundColor: "#347050",
  width: "100%",
  height: "80px",
};

export default function Navbar(props) {
  return (
    <Flex
      bg="theme.800"
      flexDirection="row"
      align="center"
      justifyContent="space-around"
      color="#ffffff"
    >
      {props.navbarButtons.map((button, index) => {
        return (
          <NavbarButton key={index} title={button.title} route={button.route} />
        );
      })}
    </Flex>
  );
}
