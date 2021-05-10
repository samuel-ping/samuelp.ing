export default function PostBody({ content }) {
  return (
    <article
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
