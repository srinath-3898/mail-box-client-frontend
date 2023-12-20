import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import {
  InboxOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const Navbar = ({ setComposeMailModalOpen }) => {
  const pathnames = usePathname()
    .split("/")
    .filter((x) => x);

  const { token } = useSelector((state) => state.auth);

  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (pathnames.length > 0) {
      setPathname(pathnames[0]);
    } else {
      setPathname("inbox");
    }
  }, [pathnames]);

  return (
    <div className={styles.container}>
      {token ? (
        <>
          <button
            className={styles.compose_btn}
            onClick={() => setComposeMailModalOpen(true)}
          >
            Compose
          </button>
          <Link
            href={"/"}
            className={`${styles.nav_link} ${
              pathname === "inbox" ? styles.active_nav_link : ""
            }`}
          >
            <InboxOutlined
              style={{
                fontSize: "24px",
              }}
            />
            Inbox
          </Link>
        </>
      ) : (
        <>
          <Tooltip title="Login">
            <Link href={"/login"}>
              <LoginOutlined
                style={{
                  color: pathname === "login" ? "#1677ff" : "initial",
                  fontSize: 20,
                }}
              />
            </Link>
          </Tooltip>
          <Link
            href={"/signup"}
            className={`${styles.nav_link} ${
              pathname === "signup" ? styles.active_nav_link : ""
            }`}
          >
            <Tooltip title="Signup" placement="right">
              <UserAddOutlined
                style={{
                  color: pathname === "signup" ? "#1677ff" : "initial",
                  fontSize: 20,
                }}
              />
            </Tooltip>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
