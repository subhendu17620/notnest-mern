import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./createNote.css";
import axios from "axios";

export default function CreateNote() {
  const history = useHistory();
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  }

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content } = note;
        const newNote = {
          title,
          content,
        };
        await axios.post("https://notnest.herokuapp.com/api/notes", newNote, {
          headers: { Authorization: token },
        });
        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };
  return (
    <div className="wrap-create">
      <form className="create-form" onSubmit={createNote} autoComplete="off">
        <span className="create-form-title">Create a new note</span>
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
