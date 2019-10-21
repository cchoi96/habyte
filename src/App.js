import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import "./App.css";
import Login from "./containers/Login";
import ProjectList from "./containers/ProjectList";
import Home from "./containers/Home";
import DummyProjects from "./containers/DummyProjects";
export const history = createHistory();

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
        <Route path={"/project-selection"} component={DummyProjects} />
        <Route path={"/"} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
