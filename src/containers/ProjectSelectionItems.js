import React from "react";

const ProjectSelectionItems = ({ projectList, onSave }) => {
  let projects = projectList.map(project => {
    return (
      <div key={project.id}>
        <div >{project.id}</div>
        <div>{project.name}</div>
        <button onClick={() => onSave(project.id)}> + </button>
      </div>
    );
  });

  return <div>{projects}</div>;
};

export default ProjectSelectionItems;
