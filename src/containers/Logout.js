import React from "react";
import {history} from '../App';

const Logout = ({removeCookie}) => {

  removeCookie('github_id');
  history.push('/login')

  return <div></div>;
};

export default Logout;
