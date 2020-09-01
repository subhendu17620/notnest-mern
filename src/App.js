import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Notes from "./components/Notes";

import axios from "axios";

function App() {
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get(
          "https://notnest.herokuapp.com/users/verify",
          {
            headers: { Authorization: token },
          }
        );
        console.log(verified);
        setisLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setisLogin(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="App">
      <div>
        {isLogin ? (
          <Notes setIsLogin={setisLogin} />
        ) : (
          <Login setisLogin={setisLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
