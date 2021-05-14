// import matter from 'gray-matter';

export default function Projects() {
  // {
  // projects
  // },
  return (
    <>
      <h1 className="leading-normal">Hello World!</h1>
      {/* {projects.map((project, index) => {
        return <h1 key={index}>{project.title}</h1>;
      })} */}
    </>
  );
}

// export async function getStaticProps() {
//   const projects = ((context) => {
//     const keys = context.keys();
//     const values = keys.map(context);
//     const data = keys.map((key, index) => {
//       let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
//       const value = values[index];
//       const document = matter(value.default);
//       return {
//         frontmatter: document.data,
//         markdownBody: document.content,
//         slug,
//       };
//     });
//     return data;
//   })(require.context('../content/projects', true, /\.md$/));

//   return {
//     props: {
//       projects,
//     },
//   };
// }
