import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./authentication.css";
import { UserContext } from "../UserContext";
import Loading from "./Loading";

import Error from "./Error";

const Authentication = ({ text, action, path, to }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
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
        setSuccess(true);
        if (action == "register") {
          const value = JSON.stringify(res.data);
          localStorage.setItem("user", value);
          setUser(localStorage.getItem("user"));
          navigate("/");
        } else {
          navigate("/login");
        }
      });
    } catch (err) {
      setSuccess(false);
      setLoading(false);
      console.log(err);
      switch (err.response.status) {
        case 500:
          return setError("Netowk error");
        case 403:
          return setError("Invalid username or password");
        case 404:
          return setError("Not found");
      }
    }
  };

  return (
    <div className="login">
      <div className="left">
        <p>
          {text} have an account? <Link to={to}> {action} </Link>
        </p>

        <form className="form" onSubmit={submit}>
          <h1>
            Welcome to <span>Jotter</span>
          </h1>
          <h2>
            A simple notepad app  for making notes. 
          </h2>

          <div className="input">
            <div className="userLabel">
              <h3 className="username">username</h3>
              <input
                className="authInput"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="userLabel">
              <h3 className="username">password</h3>
              <input
                className="authInput"
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button onSubmit={submit} type="submit">
              submit
            </button>
          </div>
          {loading && <Loading />}
          {success && <h3 className="error">Login successful</h3>}
          {error && <Error data={error} />}
        </form>
      </div>
      <div className="right">
        <img className="noteImg" src="/note2.svg" alt="" />
      </div>
    </div>
  );
};

export default Authentication;
