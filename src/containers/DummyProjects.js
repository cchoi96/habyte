import React from "react";

const DummyProjects = ({ projects }) => {
  let projectList = projects.map(project => {
    return <div>{project}</div>;
  });

  return <div>{projectList}</div>;
};

export default DummyProjects;
