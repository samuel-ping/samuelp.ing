import Link from 'next/link';

/**
 * Inline link inside prose. Rests as a dotted rule and, on hover, sweeps a
 * chisel-tip marker band in behind the text. All of that lives in the
 * `.link-marker` utility in globals.css — the class name has to stay a literal
 * here so Tailwind's scanner picks the utility up.
 */
const LinkText = ({ href, className, ...props }) => {
  const classes = className ? `link-marker ${className}` : 'link-marker';

  if (href.startsWith('https')) {
    return (
      <Link
        {...props}
        href={href}
        className={classes}
        target="_blank"
        rel="noopener"
        data-umami-event={`Link clicked`}
        data-umami-event-link={href.substring(0, 50)}
      />
    );
  }

  return (
    <Link
      {...props}
      href={href}
      className={classes}
      data-umami-event={`Link clicked`}
      data-umami-event-link={href.substring(0, 50)}
    />
  );
};

export default LinkText;
