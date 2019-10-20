import React from "react";

const ProjectListItem = ({ projectName, projectCropImage, projectStatus }) => {
  return (
    <li>
      <p>{projectName}</p>
      <img src={projectCropImage} alt={projectName} />
      <p>{projectStatus}</p>
    </li>
  );
};

export default ProjectListItem;
