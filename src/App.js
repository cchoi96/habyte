import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Logout from "./containers/Logout";
import Farm from "./containers/Farm";
import ProjectSelections from "./containers/ProjectSelections";
import Introduction from "./containers/Introduction";
import { useCookies } from "react-cookie";
import styled, { createGlobalStyle } from "styled-components";
export const history = createBrowserHistory();

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["github_id"]);

  const setGithubId = github_id => {
    setCookie("github_id", github_id, { path: "/" });
  };

  const GlobalStyles = createGlobalStyle`
    @font-face {
      font-family: 'Roboto';
      src: url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
    }
    @font-face {
      font-family: 'Roboto Condensed';
      src: url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');
    }
  `;

  return (
    <Router history={history}>
      <GlobalStyles />
      <Switch>
        <Route
          path={"/verify"}
          render={() => <Login setGithubId={setGithubId} />}
        />
        <Route
          path={"/intro"}
          render={() => <Introduction cookies={cookies} />}
        />
        <Route
          path={"/logout"}
          render={() => <Logout removeCookie={removeCookie} />}
        />
        <Route path={"/home"} render={() => <StyledHome cookies={cookies} />} />
        <Route path={"/farm"} render={() => <Farm cookies={cookies} />} />
        <Route
          path={"/project-selection"}
          render={() => <ProjectSelections cookies={cookies} />}
        />
        <Route path={"/"} render={() => <Login />} />
      </Switch>
    </Router>
  );
}

const StyledHome = styled(Home)`
  html {
    overflow-y: scroll;
    background-color: #f8f9fa;
    min-height: 100vh;
  }
  .main-content {
    margin-top: 5vh;
    display: flex;
    width: 95%;
    margin: 5vh auto 0 auto;
  }
`;

export default App;
