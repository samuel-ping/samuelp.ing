import Link from 'next/link';

const link = ({ href, ...props }) => {
  if (href.startsWith('http')) {
    return (
      <Link
        {...props}
        href={href}
        className="underline transition-colors hover:text-green-500"
        target="_blank"
        rel="noopener"
      />
    );
  }

  return (
    <Link
      {...props}
      href={href}
      className="underline transition-colors hover:text-green-500"
    />
  );
};

const heading3 = (props) => {
  return <span {...props} className="text-2xl font-bold" />;
};

const heading4 = (props) => {
  return <span {...props} className="text-xl font-medium" />;
};

const unorderedList = (props) => {
  return (
    <ul className="mb-4 list-disc list-inside leading-relaxed" {...props} />
  );
};

export const Components = {
  a: link,
  h3: heading3,
  h4: heading4,
  ul: unorderedList,
};
