import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

function Newnote() {
  document.title = "New Note";

  const [content, setContent] = useState(" ");
  const [head, setHead] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const url = `https://crayonnejotter.herokuapp.com/api/note/create/${userId}`;

  const submit = async (e) => {
    try {
      setLoading(true);
      setError(false);
      e.preventDefault();
      await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: {
          title: head,
          content: content,
        },
      }).then((res) => {
        setError(false);
        setLoading(false);
        navigate("/");
      });
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className="notePage">
      {error && <ErrorPage />}
      <div className="noteContent">
        {
          <textarea
            placeholder="Note Title"
            className="noteContentTitle"
            type="text"
            value={head}
            onChange={(e) => {
              setHead(e.target.value);
            }}
          />
        }
        {
          <textarea
            placeholder="Note Content"
            className="noteText"
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        }
        {loading && <Loading />}

        <div className="notePageButtons">
          <button type="submit" onClick={submit} className="notePageSave">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newnote;
