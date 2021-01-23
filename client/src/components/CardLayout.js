import { Box } from "@chakra-ui/react";

const CardLayout = ({ children }) => {
  return (
    <>
      <Box border="5px">{children}</Box>
    </>
  );
};

export default Card;
