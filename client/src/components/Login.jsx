import React, { useState } from "react";
import axios from "axios";
import login_img from "../assets/img-01.png";
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import "./Login.css";

export default function Login({ setisLogin }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [islogin, setIslogin] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  }

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });

      setUser({ name: "", email: "", password: "" });
      setErr(res.data.message);
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });

      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setisLogin(true);
      // setErr(res.data.message);
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };
  if (islogin)
    return (
      <>
        <div className="wrap-login">
          <div className="login-pic">
            <img src={login_img} alt="IMG" />
          </div>
          <form onSubmit={loginSubmit}>
            <span className="login-form-title">Member Login</span>
            <div className="wrap-input">
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                required
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaEnvelope />
              </span>
            </div>

            <div className="wrap-input">
              <input
                className="input"
                type="password"
                name="password"
                autoComplete="on"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaLock />
              </span>
            </div>

            <div className="container-login-form-btn">
              <button type="submit" value="Submit" className="login-form-btn">
                Login
              </button>
            </div>
            <div className="create_container">{err}</div>

            <div className="create_container">
              <p
                className="create-txt"
                onClick={() => {
                  setIslogin(!islogin);
                }}
              >
                Don't have an account? Register here
              </p>
            </div>
          </form>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="wrap-login">
          <div className="login-pic">
            <img src={login_img} alt="IMG" />
          </div>
          <form onSubmit={registerSubmit}>
            <span className="login-form-title">New User Register</span>
            <div className="wrap-input">
              <input
                className="input"
                type="text"
                value={user.name}
                name="name"
                placeholder="Username"
                onChange={handleChange}
                required
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaUserAlt />
              </span>
            </div>
            <div className="wrap-input">
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                required
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaEnvelope />
              </span>
            </div>
            <div className="wrap-input">
              <input
                className="input"
                type="password"
                name="password"
                autoComplete="on"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaLock />
              </span>
            </div>
            <div className="container-login-form-btn">
              <button type="submit" value="Submit" className="login-form-btn">
                Register
              </button>
            </div>
            <div className="create_container">{err}</div>
            <div className="create_container">
              <p
                className="create-txt"
                onClick={() => {
                  setIslogin(!islogin);
                }}
              >
                Have an account? Login here
              </p>
            </div>
          </form>
        </div>
      </>
    );
}
