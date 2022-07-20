import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link to="/">
        <img src="/home.svg" alt="" />
      </Link>

      <Link to="/note">
        <img src="/add.svg" className="imgAdd" alt="" />
      </Link>

      <Link to="/dashboard">
        <img src="/profile.svg" alt="" />
      </Link>
    </div>
  );
}

export default Footer;
