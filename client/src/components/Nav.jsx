import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <div>
      <header>
        <div className="logo">
          <h1>
            <Link to="/">Notnest</Link>
          </h1>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/create">Create</Link>
          </li>

          <li onClick={logoutSubmit}>
            <Link to="/">logout</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
