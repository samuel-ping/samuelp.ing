import Link from 'next/link';

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
