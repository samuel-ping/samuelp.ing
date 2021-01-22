import { useState } from "react";

import ReactMarkdown from "react-markdown";
import { Modal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";

export default function ProjectCard({ project }) {
  const [modalState, setModalState] = useState(false);

  if (!project.frontmatter) return <></>;

  return (
    <>
      <button onClick={() => setModalState(true)}>
        {project.frontmatter.title}
      </button>

      <Modal open={modalState} onClose={() => setModalState(false)}>
        <div>
          <h1>{project.frontmatter.title}</h1>
          <div>
            <ReactMarkdown source={project.markdownBody} />
          </div>
        </div>
      </Modal>
    </>
  );
}
