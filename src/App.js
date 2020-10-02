import React, { useState, useEffect } from "react";
import OneSignal from "react-onesignal";
import "./App.css";
import Login from "./components/Login";
import Notes from "./components/Notes";

import axios from "axios";

function App() {
  const options = {
    allowLocalhostAsSecureOrigin: true,
    requiresUserPrivacyConsent: true,
    persistNotification: true,
    autoResubscribe: true,
    autoRegister: true,
    notifyButton: {
      enable: true,
      size: "medium",
      position: "bottom-left",
      showCredit: true,
    },
  };

  const [isLogin, setisLogin] = useState(false);
  OneSignal.initialize("112e99db-807d-4104-af7c-43e8975fc337");
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
