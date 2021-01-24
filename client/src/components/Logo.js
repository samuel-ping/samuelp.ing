import NextLink from "next/link";

import { Box, Link } from "@chakra-ui/react";

import SPLogo from "./SPLogo";

const Logo = ({ isAnimated }) => {
  return (
    <>
      <Link as={NextLink} href="/">
        <Box cursor="pointer" ml="5" my="5">
          <SPLogo isAnimated={true} color="#ffffff" size="100" />
        </Box>
      </Link>
    </>
  );
};

export default Logo;
