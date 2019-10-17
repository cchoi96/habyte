import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./containers/Login";
import Home from "./containers/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/:username"} component={Home} />
        <Route path={"/"} component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
