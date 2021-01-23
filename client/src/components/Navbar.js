import { Flex, Spacer } from "@chakra-ui/react";

import Logo from "./Logo";
import NavbarButton from "./NavbarButton";

export default function Navbar(props) {
  return (
    <Flex
      bg="theme.800"
      flexDirection="row"
      align="center"
      justifyContent="space-around"
      fontSize="l"
      color="#ffffff"
    >
      <Flex
        flexDirection="row"
        align="center"
        justifyContent="space-around"
        color="#ffffff"
      >
        <Logo isAnimated="true" />
      </Flex>

      <Spacer />

      <Flex flexDirection="row" align="center" mr="5">
        {props.navbarButtons.map((button, index) => {
          return (
            <NavbarButton
              key={index}
              title={button.title}
              route={button.route}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
