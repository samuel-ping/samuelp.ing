import mdToReact from '@lib/MarkdownProcessor';

export default function PostBody({ content }) {
  return <p>{mdToReact(content)}</p>;
}
