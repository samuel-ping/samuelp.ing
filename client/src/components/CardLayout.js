import { Box } from "@chakra-ui/react";

const CardLayout = ({ children }) => {
  // give onhover scale 1.3? framer motion
  return (
    <>
      <Box bg="#ffffff" borderRadius="7px" boxSize="lg">
        {children}
      </Box>
    </>
  );
};

export default CardLayout;
