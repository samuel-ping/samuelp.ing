import Link from 'next/link';

const Footer = () => (
  <div className="leading-loose font-light text-sm mt-5">
    Made by Samuel Ping |{' '}
    <Link href="mailto:samuel.y.ping@gmail.com">
      <a>samuel.y.ping@gmail.com</a>
    </Link>
  </div>
);

export default Footer;
