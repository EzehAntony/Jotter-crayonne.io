import React from "react";
import "./loading.css";
import { ClapSpinner } from "react-spinners-kit";

function Loading() {
  return <div className="loginLoading">
    <ClapSpinner frontColor={"#00bcf5"} />
  </div>;
}

export default Loading;
