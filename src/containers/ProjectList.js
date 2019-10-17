import React from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ array }) => {
  let projectList = array.map(item => {
    return <ProjectListItem projectName={item.name} projectCrop={item.crop} />;
  });
  return <div>{projectList}</div>;
};

export default ProjectList;
