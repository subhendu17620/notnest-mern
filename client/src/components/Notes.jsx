import React from "react";

import Nav from "./Nav";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import Home from "./Home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function Notes({ setIsLogin }) {
  return (
    <div>
      <Router>
        <div className="notes-page">
          <Nav setIsLogin={setIsLogin} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/create" component={CreateNote} exact />
            <Route path="/edit/:id" component={EditNote} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
