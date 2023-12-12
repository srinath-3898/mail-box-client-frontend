import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { MailOutlined } from "@ant-design/icons";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  let pathname = usePathname()
    .split("/")
    .filter((x) => x);
  pathname = pathname[0] ? pathname[0] : "home";

  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Link href={"/"}>
          <MailOutlined
            style={{
              fontSize: 24,
              color: "#1677ff",
            }}
          />
        </Link>
        <div className={styles.nav_links}>
          <Link
            href={"/"}
            className={`${styles.nav_link} ${
              pathname === "home" ? styles.active_nav_link : ""
            }`}
          >
            Home
          </Link>
          <Link
            href={"/login"}
            className={`${styles.nav_link} ${
              pathname === "login" ? styles.active_nav_link : ""
            }`}
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className={`${styles.nav_link} ${
              pathname === "signup" ? styles.active_nav_link : ""
            }`}
          >
            Singup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
