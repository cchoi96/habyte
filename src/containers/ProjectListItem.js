import React from "react";

const ProjectListItem = ({
  projectName,
  projectNumberCommit,
  className,
  setProjectSelected,
  projectid
}) => {
  return (
    <li className={className} onClick={() => setProjectSelected(projectid)}>
      <p className="projectName">{projectName}</p>
      <img src={projectNumberCommit} alt={projectName} />
    </li>
  );
};

export default ProjectListItem;
