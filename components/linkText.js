import Link from 'next/link';

const LinkText = ({ href, ...props }) => {
  if (href.startsWith('https')) {
    return (
      <Link
        {...props}
        href={href}
        className="underline transition-colors hover:text-green-400 dark:hover:text-green-50"
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
      className="underline transition-colors hover:text-green-400 dark:hover:text-green-50"
      data-umami-event={`Link clicked`}
      data-umami-event-link={href.substring(0, 50)}
    />
  );
};

export default LinkText;
