import React, { useEffect } from "react";
import { SET_REPOS } from "../reducers/reducers";

const DummyProjects = ({ repos, setRepos }) => {
  useEffect(() => {
    setRepos(prev => setRepos(prev));
    console.log("BEFORE:", repos);
    setRepos("123");
    console.log("After:", repos);
  }, [repos]);
  // let projectList = projects.map(project => {
  //   return <div>{project}</div>;
  // });
  return <div></div>;
  // return <div key={projects}>{projectList}</div>;
};

export default DummyProjects;
