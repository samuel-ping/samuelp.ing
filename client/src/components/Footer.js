import Link from 'next/link';

const Footer = () => {
  return (
    <div className="font-light text-sm">
      Made by Samuel Ping |{' '}
      <Link href="mailto:samuel.y.ping@gmail.com">samuel.y.ping@gmail.com</Link>
    </div>
  );
};

export default Footer;
