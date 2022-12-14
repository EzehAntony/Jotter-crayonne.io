import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Newnote() {
  document.title = "New Note";

  const [content, setContent] = useState("");
  const [head, setHead] = useState("");
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
        toast.success("Saved", {
          theme: "colored",
          autoClose: 500,
          hideProgressBar: true,
          closeButton: false,
          onClose: () => {
            navigate("/");
          },
        });
      });
    } catch (err) {
      setLoading(false);
      toast.error(`${err.message}`, {
        theme: "colored",
        autoClose: 1000,
        closeButton: false,
        hideProgressBar: true
      });
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
            name="newNote"
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
            name="newNote"
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        }
        {loading && <Loading />}

        <div className="notePageButtons">
          <button
            type="submit"
            name="newNote"
            onClick={submit}
            className="notePageSave"
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Newnote;
