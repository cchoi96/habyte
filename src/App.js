import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./containers/Login";
import Home from "./containers/Home";

function App() {
  const [status, setStatus] = useState("initial");
  const [repos, setRepos] = useState([]);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={"/verify"}
          render={props => (
            <Login
              {...props}
              setRepos={setRepos}
              repos={repos}
              setStatus={setStatus}
              status={status}
            />
          )}
        />
        <Route path={"/:username"} component={Home} />
        <Route path={"/"} component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
