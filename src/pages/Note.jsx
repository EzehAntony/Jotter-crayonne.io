import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import "./note.css";
import Error from "../components/Error";
import Loading from "../components/Loading";
import ErrorPage from "../pages/ErrorPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Note() {
  document.title = "Note";

  const { id } = useParams();
  const noteId = id.split(":")[1];
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  /* *************** d = delete *********** */
  const [dError, setDerror] = useState(null);
  const [uLoading, setUloading] = useState(null);
  const [uError, setUerror] = useState(null);
  const [title, setTitle] = useState(" ");
  const [content, setContent] = useState(" ");
  const navigate = useNavigate();
  /* ************************************** */
  const [data, setData] = useState("null");
  const [loading, setLoading] = useState("null");
  const [error, setError] = useState("null");
  const url = `https://crayonnejotter.herokuapp.com/api/note/delete/${userId}/find?note=${noteId}`;

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      setLoading(true);
      setError(false);
      await axios({
        url: `https://crayonnejotter.herokuapp.com/api/note/get/${userId}/find?note=${noteId}`,
        method: "get",
        withCredentials: true,
      }).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
        setError(false);
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
        autoClose: 500,
        hideProgressBar: true,
        closeButton: false,
        onClose: () => {
          navigate("/");
        },
      });
      setLoading(false);
    }
  };

  const deleteNote = async (e) => {
    e.preventDefault();
    setDerror(false);

    try {
      await axios({
        url: url,
        method: "delete",
        withCredentials: true,
      }).then((res) => {
        setDerror(false);
        toast.success("Deleted", {
          theme: "colored",
          autoClose: 500,
          onClose: () => {
            navigate("/");
          },
        });
      });
    } catch (error) {
      setDerror(error);
    }
  };
  const update = async (e) => {
    try {
      e.preventDefault();
      setUloading(true);
      setUerror(false);
      await axios({
        url: `https://crayonnejotter.herokuapp.com/api/note/update/${userId}/find?note=${noteId}`,
        method: "PUT",
        withCredentials: true,
        data: {
          title: title,
          content: content,
        },
      }).then((res) => {
        setUloading(false);
        setUerror(false);
        toast.success("Updated", {
          theme: "colored",
          autoClose: 500,
          onClose: () => {
            navigate("/");
          },
        });
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
        autoClose: 500,
      });
      setUloading(false);
    }
  };

  return (
    <div className="notePage">
      <div className="noteContent">
        <textarea
          className="noteContentTitle"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        >
          {data?.title}
        </textarea>

        {loading && <Loading />}
        {uLoading && <Loading />}

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

        <div className="footer">
          <button type="button" onClick={update} className="notePageSave">
            Save
          </button>
          <button
            type="button"
            onClick={deleteNote}
            style={{ background: "white", color: "deeppink" }}
            className="notePageSave"
          >
            Delete
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Note;
