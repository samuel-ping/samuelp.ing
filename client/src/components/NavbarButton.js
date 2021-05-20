import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarButton = ({ title, route }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center cursor-pointer hover:underline text-md font-medium">
      <Link href={route}>
        <a>
          <span className={router.pathname === route ? 'underline' : ''}>
            {title}
          </span>
        </a>
      </Link>
    </div>
  );
};

export default NavbarButton;
