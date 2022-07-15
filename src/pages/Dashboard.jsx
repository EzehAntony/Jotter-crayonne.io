import React from "react";
import { useNavigate } from "react-router-dom";
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
      <Header />

      <div className="dashboardMainContainer">
        <div className="dashboardMain">
          <p className="dashboardLogo">Jotter</p>
          <h5>
            Username: <span>{user.username}</span>
          </h5>
          <h5>
            Admin: <span>{String(user.isAdmin)}</span>
          </h5>

          <div onClick={logOut} className="logout">
            <p>logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
