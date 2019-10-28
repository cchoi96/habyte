import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import axios from "axios";
import { history } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
      <h2>
        Motivate yourself to become a better developer, in all aspects of life.
      </h2>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      >
        <FontAwesomeIcon icon={faGithub} /> Login With Github
      </a>
      <Footer />
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Varela+Round&display=swap");
  font-family: "Varela Round", sans-serif;
  height: 100vh;
  text-align: center;

  h1 {
    margin-bottom: 15vh;
    padding-top: 15vh;
    font-size: 3.5em;
  }

  h2 {
    width: 50%;
    font-size: 2.5em;
    margin: 0 auto 5vh auto;
  }

  a {
    display: block;
    font-size: 1.5em;
    width: 270px;
    margin: 0 auto;
    color: black;
    border: 1px solid black;
    padding: 5px 10px;
    transition: 0.1s ease-out;
    &:hover {
      background-color: black;
      color: white;
      text-decoration: none;
    }
  }
`;

export default Login;
