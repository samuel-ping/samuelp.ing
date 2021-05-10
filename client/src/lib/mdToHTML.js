// import unified from 'unified';
// import markdown from 'remark-parse';
// import html from 'remark-html';
import github from 'hast-util-sanitize/lib/github.json';
import merge from 'deepmerge';

const schema = merge(github, { attributes: { '*': ['className'] } });

// export async function mdToHTML(md) {
//   console.log(md);
//   await unified()
//     .use(markdown)
//     .use(html, { sanitize: schema })
//     .process(md, (err, file) => {
//       if (err) throw err;
//       return String(file);
//     });
// }

import remark from 'remark';
import html from 'remark-html';

export async function mdToHTML(markdown) {
  const result = await remark()
    .use(html, { sanitize: schema })
    .process(markdown);
  return result.toString();
}

// import unified from 'unified';
// import parse from 'remark-parse';
// import remark2react from 'remark-react';

// export async function mdToHTML(markdown) {
//   const result = await unified().use(parse).use(remark2react).process(markdown);
//   //   console.log(result);
//   return result;
// }
