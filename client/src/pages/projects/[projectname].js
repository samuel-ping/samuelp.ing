import { useRouter } from "next/router";

import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Modal from "react-modal";

export default function Project({ frontmatter, markdownBody }) {
  const router = useRouter();
  if (!frontmatter) return <></>;

  return (
    <>
      <Modal
        isOpen={true}
        contentLabel={frontmatter.title}
        onRequestClose={() => router.push("/projects")}
        closeTimeoutMS={0}
      >
        <div>
          <h1>{frontmatter.title}</h1>
          <div>
            <ReactMarkdown source={markdownBody} />
          </div>
        </div>
      </Modal>
    </>
  );
}

export async function getStaticProps({ ...ctx }) {
  const postname = ctx.params.projectname;

  const content = await import(`../../content/projects/${postname}.md`);
  const data = matter(content.default);

  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  // gets all markdown file names, formats them and stores them in array
  const blogSlugs = ((context) => {
    const keys = context.keys();

    // removes slashes and ".md" from file names for each slug and stores it in array
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);

      return slug;
    });
    return data;
  })(require.context("../../content/projects", true, /\.md$/)); // retrieves all markdown files

  const paths = blogSlugs.map((slug) => `/projects/${slug}`); // creates all project routes and stores them in array

  return {
    paths,
    fallback: false, // if path not found, redirect to 404 page
  };
}

// Adapted from https://www.netlify.com/blog/2020/05/04/building-a-markdown-blog-with-next-9.4-and-netlify/
