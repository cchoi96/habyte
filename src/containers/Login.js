import React, { useEffect } from "react";
import DummyProjects from "./DummyProjects";
import Footer from "../components/Footer";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { history } from "../App";

const CLIENT_ID = "9eef6e17d66411722d42";
const REDIRECT_URI = "http://localhost:3000/verify";

const Login = ({ setRepos, repos, setStatus }) => {
  const verify_user = code => {
    axios
      .post(`http://0.0.0.0:8080/verify`, {
        code
      })
      .then(res => {
        console.log('res inside react', res)
        if (res.data) {
          let result = res.data;
          setRepos(result);
          history.push('/project-selection')
        } else{
          console.log('inside else, home')
          return history.push('/home')
        }
      });
      // .then(() => {
      //   history.push("/project-selection");
      // });
  };

  useEffect(() => {
    console.log("Repos in Login -->", repos);
    const code =
      window.location.href.match(/\\?code=(.*)/) &&
      window.location.href.match(/\\?code=(.*)/)[1];
    if (code) {
      setStatus("status_loading");
      verify_user(code);
    }
  }, [repos]);

  return (
    <div className="Login">
      <h1>Welcome to Codeville!</h1>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      >
        Login
      </a>
      <Footer />
    </div>
  );
};

export default Login;
