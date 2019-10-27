import React from "react";

const ProjectListItem = ({ projectName, projectNumberCommit, className }) => {
  return (
    <li className={className}>
      <p className="projectName">{projectName}</p>
      <img src={projectNumberCommit} alt={projectName} />
    </li>
  );
};

export default ProjectListItem;
