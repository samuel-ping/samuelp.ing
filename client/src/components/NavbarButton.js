import Link from "next/link";
import { useRouter } from "next/router";

import classNames from "classnames";

import styles from "../styles/Button.module.css";

const NavbarButton = ({ title, route }) => {
  const router = useRouter();
  return (
    <Link href={route}>
      <div
        className={classNames(
          styles["navbarbutton"],
          router.pathname === route ? styles.active : ""
        )}
      >
        <span className="title">{title}</span>
      </div>
    </Link>
  );
};

export default NavbarButton;
