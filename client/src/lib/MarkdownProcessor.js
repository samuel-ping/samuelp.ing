import React from 'react';
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';
// TODO: support underlining

export default function mdToReact(rawMd) {
  const content = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(rehype2react, { createElement: React.createElement })
    .processSync(rawMd).result;

  return content;
}
