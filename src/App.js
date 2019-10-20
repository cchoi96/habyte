import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./containers/Login";
import DummyProjects from "./containers/DummyProjects";
import Home from "./containers/Home";
import useApplicationData from "./hooks/useApplicationData";

function App() {
  const [status, setStatus] = useState("initial");
  const [repos, setRepos] = useState([]);
  // const { state, updateRepos } = useApplicationData();

  console.log("This is repo", repos);

  const setReposFunc = repos => {
    setRepos(repos);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={"/project-selection"}
          render={props => (
            <DummyProjects {...props} repos={repos} setRepos={setReposFunc} />
          )}
        />
        <Route
          path={"/verify"}
          render={props => (
            <Login
              {...props}
              setRepos={setReposFunc}
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
