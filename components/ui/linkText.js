import Link from 'next/link';

const LinkText = ({ href, className, ...props }) => {
  const classes = className ? `link-marker ${className}` : 'link-marker';
  const kind = href.startsWith('https') ? 'external' : 'internal';

  if (href.startsWith('https')) {
    return (
      <Link
        {...props}
        href={href}
        className={classes}
        target="_blank"
        rel="noopener"
        data-umami-event="Link Click"
        data-umami-event-url={href}
        data-umami-event-kind={kind}
      />
    );
  }

  return (
    <Link
      {...props}
      href={href}
      className={classes}
      data-umami-event="Link Click"
      data-umami-event-url={href}
      data-umami-event-kind={kind}
    />
  );
};

export default LinkText;
