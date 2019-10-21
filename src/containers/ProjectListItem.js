import React from "react";

const ProjectListItem = ({ projectName, projectStatus, className }) => {
  return (
    <li className={className}>
      <p className="projectName">{projectName}</p>
      <img src="/" alt={projectName} />
      <p className="projectStatus">{projectStatus}</p>
    </li>
  );
};

export default ProjectListItem;
