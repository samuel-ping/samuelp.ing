import { Box } from "@chakra-ui/react";

import CardLayout from "./CardLayout";

const AboutCard = ({ description }) => {
  return (
    <>
      <CardLayout>
        <Box>{description}</Box>
      </CardLayout>
    </>
  );
};

export default AboutCard;
