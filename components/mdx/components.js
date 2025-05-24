import Link from 'next/link';

export const NavLink = ({ href, ...props }) => {
  if (href.startsWith('https')) {
    return (
      <Link
        {...props}
        href={href}
        className="underline transition-colors hover:text-green-400 dark:hover:text-green-50"
        target="_blank"
        rel="noopener"
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
};

const heading2 = (props) => {
  return (
    <h2 {...props} className="text-2xl/loose md:text-3xl/loose font-semibold" />
  );
};

const heading3 = (props) => {
  return (
    <h3 {...props} className="text-xl/loose md:text-2xl/loose font-medium" />
  );
};

const paragraph = (props) => {
  return <p {...props} className="text-base/7 md:text-lg/relaxed mb-5" />;
};

const unorderedList = (props) => {
  return <ul className="list-disc list-inside" {...props} />;
};

export const Components = {
  a: NavLink,
  h2: heading2,
  h3: heading3,
  p: paragraph,
  ul: unorderedList,
};
