import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from 'history'
import "./App.css";
import Login from "./containers/Login";
import Home from "./containers/Home";
import ProjectSelections from "./containers/ProjectSelections";
// export const history = createHistory();
export const history = createBrowserHistory();

function App() {
  const [status, setStatus] = useState("initial");
  const [repos, setRepos] = useState([]);

  return (
    <Router history={history}>
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
        <Route path={"/home"} component={Home} />
        <Route path={"/project-selection"} component={ProjectSelections} />
        <Route path={"/"} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
