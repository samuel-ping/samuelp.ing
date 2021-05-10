import Image from 'next/image';

export default function Avatar({ imgSrc, alt, size }) {
  return (
    <Image
      src={'/' + imgSrc}
      alt={alt}
      width={size}
      height={size}
      priority
      className="rounded-full object-cover"
    />
  );
}
