import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./dashboard.css";
import { ToastContainer, toast, collapseToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  document.title = "Dashboard";
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logOut = (e) => {
    localStorage.removeItem("user");
    toast.success("Logged out", {
      closeButton: false,
      hideProgressBar: true,
      autoClose: 500,
      theme: "colored",
      onClose: () => {
        navigate("/");
        window.location.reload();
      },
    });
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
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
