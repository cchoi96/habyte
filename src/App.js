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
import styled from "styled-components";
export const history = createBrowserHistory();

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["github_id"]);

  const setGithubId = github_id => {
    setCookie("github_id", github_id, { path: "/" });
  };

  return (
    <Router history={history}>
      <Switch>
        <Route
          path={"/verify"}
          render={() => <Login setGithubId={setGithubId} />}
        />

        <Route
          path={"/logout"}
          render={() => <Logout removeCookie={removeCookie} />}
        />
        <Route
          path={"/home"}
          render={() => <StyledHome cookies={cookies} setLoading={setLoading} />}
        />
        <Route path={"/farm"} render={() => <Farm cookies={cookies} />} />
        <Route
          path={"/project-selection"}
          render={() => <ProjectSelections cookies={cookies} />}
        />
        <Route path={"/:username"} component={Home} />
        <Route path={"/"} render={() => <Login />} />
      </Switch>
    </Router>
  );
}

const StyledHome = styled(Home)`
  * {
    border: 1px solid black;
  }
  border: 5px solid black;
  .main-content {
    display: flex;
    width: 100%
  }

`;

export default App;
