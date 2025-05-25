import Link from 'next/link';

const components = {
  a: ({ href, ...props }) => {
    if (href.startsWith('https')) {
      return (
        <Link
          {...props}
          href={href}
          className="underline transition-colors hover:text-green-400 dark:hover:text-green-50"
          target="_blank"
          rel="noopener"
          data-umami-event={`Link clicked: ${href}`}
        />
      );
    }

    return (
      <Link
        {...props}
        href={href}
        className="underline transition-colors hover:text-green-400 dark:hover:text-green-50"
      />
    );
  },

  h2: (props) => {
    return (
      <h2
        {...props}
        className="text-2xl/loose md:text-3xl/loose font-semibold"
      />
    );
  },

  h3: (props) => {
    return (
      <h3 {...props} className="text-xl/loose md:text-2xl/loose font-medium" />
    );
  },

  p: (props) => {
    return <p {...props} className="text-base/7 md:text-lg/relaxed mb-5" />;
  },

  ul: (props) => {
    return <ul className="list-disc list-inside" {...props} />;
  },

  li: (props) => {
    return <li {...props} className="text-base/7 md:text-lg/relaxed" />;
  },
};

export const Components = components;
