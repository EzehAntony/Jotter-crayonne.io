import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./dashboard.css";

function Dashboard() {
  document.title = "Dashboard";
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logOut = (e) => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboardMainContainer">
        <div className="dashboardMain">
          <p className="dashboardLogo">Jotter</p>
          <h5>
            Username: <span>{user.username}</span>
          </h5>
          <h5>
            Admin: <span>{String(user.isAdmin)}</span>
          </h5>

          <img className="exit" src="/exit.svg" onClick={logOut} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
