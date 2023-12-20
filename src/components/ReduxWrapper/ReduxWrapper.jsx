"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./ReduxWrapper.module.css";
import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/store/auth/authSlice";
import ComposeMailModal from "../ComposeMailModal/ComposeMailModal";
import Header from "../Header/Header";

const inter = Inter({ subsets: ["latin"] });

const ReduxWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [composeMailModalOpen, setComposeMailModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      document.cookie = `token=${token}; path=/`;
    }
  }, []);

  return (
    <body className={`${inter.className} ${token ? styles.container : ""} `}>
      {token ? (
        <Navbar setComposeMailModalOpen={setComposeMailModalOpen} />
      ) : (
        <></>
      )}
      {token ? <Header /> : <></>}
      <div className={`${token ? styles.main : styles.main_res}`}>
        {children}
      </div>
      <ComposeMailModal
        open={composeMailModalOpen}
        setOpen={setComposeMailModalOpen}
      />
    </body>
  );
};

export default ReduxWrapper;
