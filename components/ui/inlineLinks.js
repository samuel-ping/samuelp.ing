import LinkText from '@/components/ui/linkText';

/*
  `[label](href)` — the same inline link syntax the MDX content uses, so there is
  one way to write a link on this site. The label runs to the first `]` and the
  href to the first `)`, which is all the site's links ever need; a href
  containing a literal `)` would end early.
*/
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders a plain string with inline `[label](href)` links as React nodes.
 *
 * This exists so content held in a config file can still place a link anywhere
 * in its sentence, rather than only on the end. The alternative — a
 * `link: { href, text }` field next to the copy — allowed exactly one link per
 * item and always rendered it after the text, which read as a dangling
 * fragment.
 *
 * Deliberately not a markdown parser: it handles links and nothing else,
 * because nothing else in these strings needs it.
 */
const InlineLinks = ({ text }) => {
  const nodes = [];
  let cursor = 0;

  for (const match of text.matchAll(LINK)) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    nodes.push(
      <LinkText key={match.index} href={match[2]}>
        {match[1]}
      </LinkText>
    );
    cursor = match.index + match[0].length;
  }

  // No links: hand back the original string so plain copy stays plain, with no
  // array wrapper to reason about.
  if (cursor === 0) return text;

  if (cursor < text.length) nodes.push(text.slice(cursor));

  return nodes;
};

export default InlineLinks;
