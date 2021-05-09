import Link from 'next/link';

const ContactBarButton = ({ website, url, icon }) => {
  return (
    <Link href={url}>
      <span className="flex rounded-full border-2 border-green-600 p-5 justify-center content-center cursor-pointer">
        {icon}
      </span>
    </Link>
  );
};

export default ContactBarButton;
