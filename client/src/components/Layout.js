import { Box } from "@chakra-ui/react";

import Navbar from "./Navbar";
import NavbarButtons from "../config/NavbarButtons";

export default function Layout({ children }) {
  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%">
      <Navbar navbarButtons={NavbarButtons} />
      <div className="content">{children}</div>
    </Box>
  );
}
