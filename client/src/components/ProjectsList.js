import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";

export default function PostList({ projects }) {
  if (projects === "undefined") return null;

  return (
    <Wrap>
      {projects &&
        projects.map((project, index) => {
          return (
            <WrapItem key={index}>
              <ProjectCard project={project} />
            </WrapItem>
          );
        })}
    </Wrap>
  );
}
