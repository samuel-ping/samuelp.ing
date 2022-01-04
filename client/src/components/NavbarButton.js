import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarButton = ({ title, route, mobile, close }) => {
  const router = useRouter();

  if (mobile) {
    return (
      <Link href={route}>
        <div
          className="px-4 py-2 text-md leading-10 font-medium"
          onClick={close}
        >
          <span className={router.pathname === route ? 'underline' : ''}>
            {title}
          </span>
        </div>
      </Link>
    );
  } else {
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
  }
};

export default NavbarButton;
