import { React, useContext, useState } from "react";
import "./main.css";
import Cards from "../components/Cards";
import { UserContext } from "../UserContext";
import useFetch from "../useFetch";
import RoundedBtn from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Main() {
  var counter = 0;
  const navigate = useNavigate();
  const toastPop = () => {
    toast.error("Network Error", {
      autoClose: 2000,
      hideProgressBar: true,
      theme: "colored",
      closeButton: false,
      onClose: () => {
        localStorage.clear();
        window.location.reload();
      },
    });
  };

  const { user, setUser } = useContext(UserContext);
  const url = `https://crayonnejotter.herokuapp.com/api/note/get/all/${
    JSON.parse(user)._id
  }`;
  const method = "GET";
  const { data, loading, error } = useFetch(url, method);
  const [input, setInput] = useState("");
  const localUser = JSON.parse(localStorage.getItem("user")).username;

  return (
    <div className="main">
      {loading && <Loading />}
      {error && toastPop()}

      {data && (
        <div className="hello">
          <h1>
            Hey {localUser}, <br /> Good day!
          </h1>
        </div>
      )}

      {data && (
        <input
          className="searchBar"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Search"}
        />
      )}
      <div className="cardContainer">
        {data &&
          data
            .filter((note) => {
              if (input === "") {
                return note;
              } else if (
                note.title.toLowerCase().includes(input.toLowerCase())
              ) {
                return note;
              }
            })
            .map((data) => (
              <Link
                to={`/note:${data._id}`}
                className="cards-div"
                key={data._id}
              >
                <Cards data={data} />
              </Link>
            ))}
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Main;
