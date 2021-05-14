import { useState } from 'react';
// import matter from 'gray-matter';
import Modal from '@components/Modal';

export default function Projects() {
  const [modalVisible, toggleModalVisible] = useState(false);

  // {
  // projects
  // },
  return (
    <>
      <h1 className="prose prose-lg">Hello World!</h1>
      <button onClick={() => toggleModalVisible(!modalVisible)}>
        Toggle Modal
      </button>

      <Modal
        visible={modalVisible}
        onClose={() => toggleModalVisible(!modalVisible)}
      />
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
