import React from "react";

const ProjectListItem = ({
  projectName,
  projectCropImage,
  projectStatus,
  className
}) => {
  return (
    <li className={className}>
      <p className="projectName">{projectName}</p>
      <img src={projectCropImage} alt={projectName} />
      <p className="projectStatus">{projectStatus}</p>
    </li>
  );
};

export default ProjectListItem;
