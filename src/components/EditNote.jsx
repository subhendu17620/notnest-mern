import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./createNote.css";
import axios from "axios";

export default function EditNote({ match }) {
  const history = useHistory();
  const [note, setNote] = useState({ title: "", content: "", id: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  }

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");

      if (match.params.id) {
        const res = await axios.get(
          `https://notnest.herokuapp.com/api/notes/${match.params.id}`,
          {
            headers: { Authorization: token },
          }
        );

        setNote({
          title: res.data.title,
          content: res.data.content,
          id: res.data._id,
        });
        // console.log(res);
      }
    };
    getNote();
  }, [match.params.id]);

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, id } = note;
        const newNote = {
          title,
          content,
        };
        await axios.put(
          `https://notnest.herokuapp.com/api/notes/${id}`,
          newNote,
          {
            headers: { Authorization: token },
          }
        );
        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };
  return (
    <div className="wrap-create">
      <form className="create-form" onSubmit={editNote} autoComplete="off">
        <span className="create-form-title">Edit note</span>
        <div className="wrap-create-input">
          <input
            className="create-input"
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Eat healthy"
            value={note.title}
            required
          />
        </div>

        <div className="wrap-create-input">
          <textarea
            className="create-input create-textarea"
            type="text"
            onChange={handleChange}
            rows="3"
            value={note.content}
            name="content"
            placeholder="Try organic foods"
            required
          />
        </div>

        <div className="container-create-form-btn">
          <button type="submit" value="Submit" className="create-form-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
