import ProjectCard from "./ProjectCard";

export default function PostList({ projects }) {
  if (projects === "undefined") return null;

  return (
    <div>
      {projects &&
        projects.map((project, index) => {
          return (
            <div key={index}>
              <ProjectCard project={project} />
            </div>
          );
        })}
    </div>
  );
}
