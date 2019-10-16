import React, { useState, useEffect } from "react";
import "./App.css";

const CLIENT_ID = "9eef6e17d66411722d42";
const REDIRECT_URI = "http://localhost:3000/";

function App() {
  const [status, setStatus] = useState("initial");
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log(window.location.href);
    const code =
      window.location.href.match("?code=") &&
      window.location.href.match("?code=")[1];
    if (code) {
      setStatus(() => "status_loading");
      fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          setStatus("finished_loading");
          setToken(token);
        });
    }
    console.log(code);
  }, []);

  return (
    <div className="App">
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      >
        Login
      </a>
    </div>
  );
}

export default App;
