import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import axios from "axios";
import { history } from "../App";

const CLIENT_ID = "9eef6e17d66411722d42";
const REDIRECT_URI = "http://localhost:3000/verify";

const Login = ({ setRepos, repos, setGithubId, cookies }) => {
  const verify_user = code => {
    axios
      .post(`http://0.0.0.0:8080/verify`, {
        code
      })
      .then(res => {
        let github_id = res.data;
        setGithubId(github_id);
        history.push("/home");
      });
  };

  useEffect(() => {
    const code =
      window.location.href.match(/\\?code=(.*)/) &&
      window.location.href.match(/\\?code=(.*)/)[1];
    if (code) {
      verify_user(code);
    }
  }, [repos]);

  return (
    <StyledLogin>
      <h1>Codeville</h1>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      >
        Login
      </a>
      <Footer />
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  height: 100vh;
`;

export default Login;
