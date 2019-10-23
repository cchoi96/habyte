import React, { useEffect } from "react";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import axios from "axios";
import { history } from "../App";

const CLIENT_ID = "9eef6e17d66411722d42";
const REDIRECT_URI = "http://localhost:3000/verify";

const Login = ({ setRepos, repos, setGithubId }) => {
  const verify_user = code => {
    axios
      .post(`http://0.0.0.0:8080/verify`, {
        code
      })
      .then(res => {
        if (res.data.length > 1) {
          let result = res.data[0];
          let github_id = res.data[1];
          setGithubId(github_id);
          setRepos(result);
          history.push("/project-selection");
        } else {
          let github_id = res.data[0].github_id;
          setGithubId(github_id);
          history.push("/home");
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
