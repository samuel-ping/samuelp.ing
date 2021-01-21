import Head from "next/head";
import Link from "next/link";

import matter from "gray-matter";

import ProjectsList from "../components/ProjectsList";

// layout,
// title,
// thumbnail,
// timeframe,
// "repo-url": repoURL,
// "website-url": websiteURL,
// technologies,
export default function Projects({ projects }) {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <h1>Projects</h1>
      <ProjectsList projects={projects} />
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}

export async function getStaticProps() {
  const projects = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      const value = values[index];
      const document = matter(value.default);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      };
    });
    return data;
  })(require.context("../content/projects", true, /\.md$/));

  return {
    props: {
      projects,
    },
  };
}
