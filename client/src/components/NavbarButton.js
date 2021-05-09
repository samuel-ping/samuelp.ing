import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarButton = ({ title, route }) => {
  const router = useRouter();

  return (
    <Link href={route}>
      <div className="flex items-center justify-items-center cursor-pointer hover:underline mx-2 text-xl">
        <span className={router.pathname === route ? 'underline' : ''}>
          {title}
        </span>
      </div>
    </Link>
  );
};

export default NavbarButton;
