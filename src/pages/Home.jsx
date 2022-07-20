/** @format */

import React from "react";
import "./home.css";
import Header from "../components/Header";
import Main from "../components/Main";

function Home() {
  document.title = "Home";

  return (
    <div className="home">
      <Main />
    </div>
  );
}

export default Home;
