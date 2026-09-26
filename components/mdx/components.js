import Image from 'next/image';
import Link from '@/components/linkText';

const components = {
  a: Link,

  h2: (props) => {
    return (
      <h2
        {...props}
        className="mt-10 mb-3 text-2xl leading-snug font-semibold md:text-3xl"
      />
    );
  },

  h3: (props) => {
    return (
      <h3
        {...props}
        className="mt-8 mb-2 text-xl leading-snug font-medium md:text-2xl"
      />
    );
  },

  p: (props) => {
    return <p {...props} className="mb-5 text-base/7 md:text-lg/relaxed" />;
  },

  ul: (props) => {
    return <ul className="mb-5 list-outside list-disc pl-6" {...props} />;
  },

  ol: (props) => {
    return <ol className="mb-5 list-outside list-decimal pl-6" {...props} />;
  },

  li: (props) => {
    return <li {...props} className="text-base/7 md:text-lg/relaxed" />;
  },

  img: ({ src, className, height, width, alt }) => (
    <Image
      className={className}
      src={src}
      height={height}
      width={width}
      alt={alt}
    />
  ),

  Image: Image,
};

export const Components = components;
