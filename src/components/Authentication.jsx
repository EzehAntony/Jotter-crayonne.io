import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./authentication.css";
import { UserContext } from "../UserContext";
import Loading from "./Loading";

import Error from "./Error";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastPopup = (data, type) => {
  toast(`${data}`, {
    type: type,
    hideProgressBar: true,
    theme: "colored",
    autoClose: 2000,
  });
};

const Authentication = ({ text, action, path, to }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await axios({
        url: path,
        method: "POST",
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      }).then((res) => {
        if (action == "register") {
          toastPopup("Success", "Success")
          const value = JSON.stringify(res.data);
          localStorage.setItem("user", value);
          setUser(localStorage.getItem("user"));

        } else {
          (async () => {
            try {
              await axios({
                url: "https://crayonnejotter.herokuapp.com/api/auth/login",
                method: "POST",
                data: {
                  username: username,
                  password: password,
                },
                withCredentials: true,
              }).then((res) => {
                toastPopup("Login Successfull", "success");
                console.log("Yeah");
                const value = JSON.stringify(res.data);
                localStorage.setItem("user", value);
                setUser(localStorage.getItem("user"));
                navigate("/");
              });
            } catch (error) {
              toastPopup("unable to login, Try again", "error");
            }
          })();
        }
      });
    } catch (err) {
      setLoading(false);
      switch (err.response.status) {
        case 500:
          return toastPopup("Network Error");

        case 403:
          return toastPopup("Incorrect Username", "error");

        case 401:
          return toastPopup("Incorrect Password", "error");

        case 404:
          return toast.error("404 Not Found", {
            hideProgressBar: true,
            theme: "colored",
            autoClose: 2000,
          });
      }
    }
  };

  return (
    <div className="login">
      <div className="left">
        <form className="form" onSubmit={submit}>
          <h1>
            Welcome to <span>Jotter</span>
          </h1>
          <h2>A simple notepad app for making notes.</h2>

          <div className="input">
            <div className="userLabel">
              <h3 className="username">username</h3>
              <input
                className="authInput"
                type="text"
                value={username}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="userLabel">
              <h3 className="username">password</h3>
              <input
                className="authInput"
                type="text"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button onSubmit={submit} type="submit">
              submit
            </button>
          </div>
          {loading && <Loading />}

          {error && <Error data={error} />}
        </form>
        <p>
          {text} have an account? <Link to={to}> {action} </Link>
        </p>
      </div>
      <div className="right">
        <img className="noteImg" src="/note2.svg" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Authentication;
