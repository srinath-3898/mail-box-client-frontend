import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { LogoutOutlined, MailOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const Navbar = () => {
  const pathnames = usePathname()
    .split("/")
    .filter((x) => x);

  const { token } = useSelector((state) => state.auth);

  const [pathname, setPathname] = useState("");

  const handleLogout = () => {};

  useEffect(() => {
    if (pathnames.length > 0) {
      setPathname(pathnames[0]);
    } else {
      setPathname("home");
    }
  }, [pathnames]);

  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        {token ? (
          <Link href={"/"}>
            <MailOutlined
              style={{
                fontSize: 24,
                color: "#1677ff",
              }}
            />
          </Link>
        ) : (
          <MailOutlined
            style={{
              fontSize: 24,
              color: "#1677ff",
            }}
          />
        )}
        <div className={styles.nav_links}>
          {token ? (
            <>
              <Link
                href={"/"}
                className={`${styles.nav_link} ${
                  pathname === "home" ? styles.active_nav_link : ""
                }`}
              >
                Home
              </Link>
              <Tooltip title="Logout">
                <LogoutOutlined
                  style={{ fontSize: 20 }}
                  onClick={handleLogout}
                />
              </Tooltip>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
