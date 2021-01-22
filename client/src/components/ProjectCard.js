import ReactMarkdown from "react-markdown";
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function ProjectCard({ project }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollBehavior = "inside";

  if (!project.frontmatter) return <></>;

  return (
    <>
      <Button colorScheme="theme" onClick={onOpen}>
        {project.frontmatter.title}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={scrollBehavior}
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{project.frontmatter.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <ReactMarkdown source={project.markdownBody} />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="theme" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
