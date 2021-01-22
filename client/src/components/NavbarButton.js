import NextLink from "next/link";
import { useRouter } from "next/router";

import { Box, Link, Text } from "@chakra-ui/react";

const NavbarButton = ({ title, route }) => {
  const router = useRouter();
  // console.log(route, router.pathname === route);
  return (
    <Link as={NextLink} href={route}>
      <Box
        bg={router.pathname === route ? "theme.600" : "theme.500"}
        display="flex"
        width="auto"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        // flexGrow={1}
      >
        <Text>{title}</Text>
      </Box>
    </Link>
  );
};

export default NavbarButton;
