import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarButton = ({ title, route, mobile, close }) => {
  const router = useRouter();

  if (mobile) {
    return (
      <div
        className="flex px-4 py-2 text-md leading-10 font-medium"
        onClick={close}
      >
        <Link href={route}>
          <a>
            <span className={router.pathname === route ? 'underline' : ''}>
              {title}
            </span>
          </a>
        </Link>
      </div>
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
