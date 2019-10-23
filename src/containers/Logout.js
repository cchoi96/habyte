import React from "react";
import { history } from "../App";

const Logout = ({ removeCookie }) => {
  removeCookie("github_id");
  history.push("/");

  return <div></div>;
};

export default Logout;
