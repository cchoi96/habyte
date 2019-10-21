import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import "./App.css";
import Login from "./containers/Login";
import Home from "./containers/Home";
import TrelloBoard from "./containers/TrelloBoard";
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
        <Route path={"/:username"} component={Home} />
        <Route
          path={"/"}
          render={props => (
            <TrelloBoard
              columns={[
                { title: "Column Title", list: ["task1", "task2", "task3"] },
                { title: "Column Title2", list: ["task1", "task2", "task3"] }
              ]}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
