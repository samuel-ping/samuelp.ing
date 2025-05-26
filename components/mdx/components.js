import Image from 'next/image';
import Link from '@/components/linkText';

const components = {
  a: Link,

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
    return <ul className="list-disc list-inside mb-5" {...props} />;
  },

  ol: (props) => {
    return <ol className="list-decimal list-inside mb-5" {...props} />;
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
