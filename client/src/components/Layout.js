import { Box, Flex } from "@chakra-ui/react";

import Navbar from "./Navbar";
import NavbarButtons from "../config/NavbarButtons";

export default function Layout({ children }) {
  return (
    <Flex flexDirection="column" height="100vh" width="100vw">
      <Navbar navbarButtons={NavbarButtons} />
      <Box>{children}</Box>
    </Flex>
  );
}
