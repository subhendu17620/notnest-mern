import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import "./Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };
  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);
  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div>
      <div className="note-wrapper">
        {notes.length === 0 ? (
          <>
            <h2>You dont have any notes. Go and create one.</h2>
          </>
        ) : (
          notes.map((note, idx) => (
            <div key={idx} className="card">
              <div className="btns">
                <button className="edit">
                  <Link to={`edit/${note._id}`}>
                    <AiOutlineEdit size={30} />
                  </Link>
                </button>
                <button
                  className="close"
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                >
                  <AiOutlineClose size={30} />
                </button>
              </div>
              <h3 className="note-title" title={note.title}>
                {note.title}
              </h3>

              <p className="note-content">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
