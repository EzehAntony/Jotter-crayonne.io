import { React, useContext, useState } from "react";
import "./main.css";
import Cards from "../components/Cards";
import { UserContext } from "../UserContext";
import useFetch from "../useFetch";
import RoundedBtn from "./Footer";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import Footer from "./Footer";
function Main() {
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
      {error && <ErrorPage />}

      {data && (
        <div className="hello">
          <h1>
            Hey {localUser}, <br /> Good day!{" "}
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
      {data && <Footer />}
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
    </div>
  );
}

export default Main;
