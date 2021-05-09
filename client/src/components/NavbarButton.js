import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarButton = ({ title, route }) => {
  const router = useRouter();

  return (
    <Link href={route}>
      <div className="flex items-center justify-items-center cursor-pointer hover:underline">
        <span className={router.pathname === route ? 'underline' : ''}>
          {title}
        </span>
      </div>
      {/* <Box
        bg={router.pathname === route ? "theme.600" : "theme.800"}
        _hover={{ background: "theme.600" }}
        display="flex"
        width="auto"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        px="5"
        py="3"
        flexGrow={1}
      >
        <Text>{title}</Text>
      </Box> */}
    </Link>
  );
};

export default NavbarButton;
