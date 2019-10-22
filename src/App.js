import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Login from "./containers/Login";
import Home from "./containers/Home";
import TrelloBoard from "./containers/TrelloBoard";
import ProjectSelections from "./containers/ProjectSelections";
import { useCookies } from "react-cookie";
import ParseTaskQuery from "./helpers/parseTaskQuery";
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
        <Route path={"/:username"} component={Home} />
        <Route
          path={"/"}
          render={props => (
            <ParseTaskQuery
              taskslist={[
                {
                  id: 1,
                  name: "Task1",
                  task_categories_id: 1,
                  status: false,
                  category_name: "Complete"
                },
                {
                  id: 2,
                  name: "Task2",
                  task_categories_id: 1,
                  status: true,
                  category_name: "Incomplete"
                }
              ]}
            />
          )}
        />
        <Route path={"/home"} render={() => <Home cookies={cookies} />} />
        <Route
          path={"/project-selection"}
          render={() => <ProjectSelections cookies={cookies} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
