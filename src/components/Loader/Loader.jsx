import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ size = 20 }) => {
  return (
    <div className={styles.loder}>
      <LoadingOutlined style={{ fontSize: size, color: "#1677ff" }} />
    </div>
  );
};

export default Loader;
