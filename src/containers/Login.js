import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import axios from "axios";
import { history } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const CLIENT_ID = "9eef6e17d66411722d42";
const REDIRECT_URI = "http://localhost:3000/verify";

const Login = ({ setRepos, repos, setUserInfo, cookies }) => {
  const verify_user = code => {
    axios
      .post(`http://0.0.0.0:8080/verify`, {
        code
      })
      .then(res => {
        let github_id = res.data[0];
        let first_login = res.data[1];
        let name = res.data[2];
        let animal = res.data[3];
        let github_name = res.data[4];
        setUserInfo(github_id, name, animal, github_name);
        if (first_login) {
          history.push("/home");
        } else {
          history.push("/intro");
        }
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
      <h1>habyte</h1>
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
  background-image: url("/assets/other/background.jpg");
  h1 {
    margin-bottom: 15vh;
    padding-top: 15vh;
    font-size: 3.5em;
    color: white;
  }

  h2 {
    width: 50%;
    font-size: 2.5em;
    margin: 0 auto 5vh auto;
    color: white;
  }

  a {
    display: block;
    font-size: 1.5em;
    width: 270px;
    margin: 0 auto;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px 10px;
    box-shadow: 0.3px 0.3px 0.5px 0.5px;
    transition: 0.1s ease-out;
    &:hover {
      transform: scale(1.01);
      background-color: white;
      color: black;
      text-decoration: none;
    }
  }

  @media only screen and (max-width: 650px) {
    h1 {
      padding-top: 8vh;
      font-size: 3em;
      margin-bottom: 8vh;
    }

    h2 {
      font-size: 2em;
      width: 85%;
    }

    a {
      font-size: 1em;
    }
  }
`;

export default Login;
