import NextLink from "next/link";
import { useRouter } from "next/router";

import { Box, Link, Text } from "@chakra-ui/react";

const NavbarButton = ({ title, route }) => {
  const router = useRouter();

  return (
    <Link as={NextLink} href={route}>
      <Box
        bg={router.pathname === route ? "theme.600" : "theme.800"}
        _hover={{ background: "theme.600" }}
        display="flex"
        width="auto"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        px="5"
        py="3"
        flexGrow={1}
      >
        <Text>{title}</Text>
      </Box>
    </Link>
  );
};

export default NavbarButton;
