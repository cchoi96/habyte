import React, { useState } from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem";
import AddProject from "./AddProject";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = sortableElement(({ projectName, projectNumberCommit }) => (
  <StyledProjectListItem
    projectName={projectName}
    projectNumberCommit={projectNumberCommit}
  />
));

const SortableContainer = sortableContainer(({ children, className }) => {
  return <ul className={className}>{children}</ul>;
});

const ProjectList = () => {
  const projects = [
    {
      project_name: "Project 1",
      number_commit: 1
    },
    {
      project_name: "Project 2",
      number_commit: 2
    }
  ];

  const [projectList, setProjectList] = useState(projects);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setProjectList(arrayMove(projectList, oldIndex, newIndex));
  };

  let totalProjectList = projectList.map((project, index) => {
    return (
      <SortableItem
        key={project.project_name}
        index={index}
        projectName={project.project_name}
        projectNumberCommit={project.number_commit}
      ></SortableItem>
    );
  });

  return (
    <StyledSortableContainer onSortEnd={onSortEnd}>
      {totalProjectList}
      <AddProject />
    </StyledSortableContainer>
  );
};

const StyledProjectListItem = styled(ProjectListItem)`
  border: 1px solid black;
  width: 50%;
  margin: 30px;
  padding:
  list-style-type: none;
  
  .projectName {
    font-size: 1.5em;
  }

  .projectStatus {
    font-size: 1.5em;
  }

  img {
    width: 50px;
  }
`;

const StyledSortableContainer = styled(SortableContainer)`
  border: 1px solid black;
  list-style-type: none;
  width: 100%;
`;

export default ProjectList;
