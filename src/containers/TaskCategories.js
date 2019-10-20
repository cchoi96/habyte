import React from "react";
import TaskItems from "./TaskItems";

const TaskCategories = ({ array }) => {
  let projectList = array.map(item => {
    return <TaskItems takName={item.name} projectCrop={item.crop} />;
  });
  return <div>{projectList}</div>;
};

export default ProjectList;
