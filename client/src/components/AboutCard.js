import { Box, forwardRef, Text } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const MotionBox = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
);

const AboutCard = ({ description }) => {
  return (
    <>
      <MotionBox
        bg="#cfe3d7"
        borderRadius="12px"
        cursor="default"
        whileHover={{ scale: 1.02 }}
        width="50%"
      >
        <Text mx="10" my="3" fontSize="md">
          {description}
        </Text>
      </MotionBox>
    </>
  );
};

export default AboutCard;
