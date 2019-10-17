import React from "react";

const ProjectListItem = ({ projectName, projectCrop }) => {
  return (
    <div>
      <p>{projectName}</p>
      <p>{projectCrop}</p>
    </div>
  );
};

export default ProjectListItem;
