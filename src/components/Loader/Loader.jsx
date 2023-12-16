import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

const Loader = ({ size = 20 }) => {
  return <LoadingOutlined style={{ fontSize: size, color: "#1677ff" }} />;
};

export default Loader;
