import Link from "next/link";

export default function PostList({ projects }) {
  if (projects === "undefined") return null;

  return (
    <div>
      {!projects && <div>No projects? Something fishy must be going on...</div>}
      <ul>
        {projects &&
          projects.map((project) => {
            return (
              <li key={project.slug}>
                <Link href={{ pathname: `/projects/${project.slug}` }}>
                  <a>{project.frontmatter.title}</a>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
