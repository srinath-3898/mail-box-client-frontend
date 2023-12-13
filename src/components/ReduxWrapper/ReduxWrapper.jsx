"use client";
import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./ReduxWrapper.module.css";
import Footer from "../Footer/Footer";
import { Inter } from "next/font/google";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/auth/authSlice";

const inter = Inter({ subsets: ["latin"] });

const ReduxWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      document.cookie = `token=${token}; path=/`;
    }
  }, []);

  return (
    <body className={`${inter.className} ${styles.container}`}>
      <Navbar />
      <div className={styles.main}>{children}</div>
      <Footer />
    </body>
  );
};

export default ReduxWrapper;
