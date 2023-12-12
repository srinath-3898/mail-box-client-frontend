import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

const Loader = ({ size = 20 }) => {
  return <LoadingOutlined style={{ fontSize: size }} />;
};

export default Loader;
