import React, { useEffect } from "react";
import DummyProjects from "./DummyProjects";
import Footer from "../components/Footer";
import axios from "axios";

const CLIENT_ID = "9eef6e17d66411722d42";
const REDIRECT_URI = "http://localhost:3000/verify";

const Login = ({ setRepos, repos, setStatus }) => {
  const verify_user = code => {
    axios
      .post(`http://0.0.0.0:8080/verify`, {
        code
      })
      .then(res => {
        let result = res.data;
        setRepos(result);
      });
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

  return !repos ? (
    <div className="Login">
      <h1>Welcome to Codeville!</h1>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      >
        Login
      </a>
      <Footer />
    </div>
  ) : (
    <DummyProjects repos={repos} />
  );
};

export default Login;
