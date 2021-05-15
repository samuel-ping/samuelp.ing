import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarButton = ({ title, route }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center cursor-pointer hover:underline text-xl"
      // FIX: pressing enter key doesn't activate link
      // tabIndex="0"
    >
      <Link href={route}>
        <span className={router.pathname === route ? 'underline' : ''}>
          {title}
        </span>
      </Link>
    </div>
  );
};

export default NavbarButton;
