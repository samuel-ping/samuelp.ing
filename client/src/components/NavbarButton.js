import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarButton = ({ title, route }) => {
  const router = useRouter();

  return (
    <Link href={route}>
      <div className="flex items-center justify-center cursor-pointer hover:underline text-xl w-40">
        <span className={router.pathname === route ? 'underline' : ''}>
          {title}
        </span>
      </div>
    </Link>
  );
};

export default NavbarButton;
