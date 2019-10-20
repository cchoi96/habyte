import React, { useEffect } from "react";

const DummyProjects = ({ repos }) => {
  let arr = repos.map(repo => {
    return <li>{repo}</li>;
  });

  return <ul>{arr}</ul>;
};

export default DummyProjects;
