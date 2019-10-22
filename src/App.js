import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Logout from "./containers/Logout";
import Farm from "./containers/Farm";
import ProjectSelections from "./containers/ProjectSelections";
import { useCookies } from "react-cookie";
export const history = createBrowserHistory();

function App() {
  const [status, setStatus] = useState("initial");
  const [repos, setRepos] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["github_id"]);

  const setGithubId = github_id => {
    setCookie("github_id", github_id, { path: "/ " });
  };

  return (
    <Router history={history}>
      <Switch>
        <Route
          path={"/verify"}
          render={() => (
            <Login
              setRepos={setRepos}
              repos={repos}
              setStatus={setStatus}
              status={status}
              setGithubId={setGithubId}
            />
          )}
        />

        <Route
          path={"/logout"}
          render={() => <Logout removeCookie={removeCookie} />}
        />
        <Route path={"/home"} render={() => <Home cookies={cookies} />} />
        <Route path={"/farm"} render={() => <Farm cookies={cookies} />} />
        <Route
          path={"/project-selection"}
          render={() => <ProjectSelections cookies={cookies} />}
        />
        <Route path={"/:username"} component={Home} />
        <Route path={"/"} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
