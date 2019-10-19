import React, { useState, useEffect } from "react";
import DummyProjects from "./DummyProjects";
import Footer from "../components/Footer";
import axios from "axios";

const CLIENT_ID = "9eef6e17d66411722d42";
const CLIENT_SECRET = "57a0b151fc4486b1ba6fad21d573f80bf1ee69cf";
const REDIRECT_URI = "http://localhost:3000/verify";

const Login = () => {
  const [status, setStatus] = useState("initial");
  const [token, setToken] = useState(null);
  const [repos, setRepos] = useState([]);

  const verify_user = code => {
    axios
      .post(`http://0.0.0.0:8080/verify`, {
        code
      })
      .then(res => {
        console.log(res.data);
        let result = res.data;
        setRepos(result);
      });
  };

  useEffect(() => {
    const code =
      window.location.href.match(/\\?code=(.*)/) &&
      window.location.href.match(/\\?code=(.*)/)[1];
    if (code) {
      setStatus(() => "status_loading");

      verify_user(code);
    }
    console.log(code);
  }, [repos]);

  return (
    <div className="App">
      <h1>Welcome to Codeville!</h1>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      >
        Login
      </a>
      <DummyProjects projects={repos} />
      <Footer />
    </div>
  );
};

export default Login;
