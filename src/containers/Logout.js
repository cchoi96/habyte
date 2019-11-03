import React from "react";
import { history } from "../App";

const Logout = ({ removeCookie }) => {
  removeCookie("github_id");
  removeCookie("name");
  removeCookie("animal");
  history.push("/");

  return <div></div>;
};

export default Logout;
