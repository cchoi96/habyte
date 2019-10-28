import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem";
import AddProject from "./AddProject";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import axios from "axios";

const SortableItem = sortableElement(({ projectName, projectNumberCommit }) => (
  <StyledProjectListItem
    projectName={projectName}
    projectNumberCommit={projectNumberCommit}
  />
));

const SortableContainer = sortableContainer(({ children, className }) => {
  return <ul className={className}>{children}</ul>;
});

const ProjectList = ({ cookies }) => {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    axios
      .post("http://0.0.0.0:8080/projects", {
        github_id: cookies.github_id
      })
      .then(res => {
        setProjectList(res.data);
      });
  }, []);

  const refreshList = () => {
    axios
      .post("http://0.0.0.0:8080/projects", {
        github_id: cookies.github_id
      })
      .then(res => {
        setProjectList(res.data);
      });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setProjectList(arrayMove(projectList, oldIndex, newIndex));
  };

  let totalProjectList = projectList.map((project, index) => {
    return (
      <SortableItem
        key={project.name}
        index={index}
        projectName={project.name}
        projectNumberCommit={project.number_commit}
      ></SortableItem>
    );
  });

  return (
    <StyledSortableContainer onSortEnd={onSortEnd}>
      {totalProjectList}
      <AddProject
        refreshList={refreshList}
        projectList={projectList}
        cookies={cookies}
      />
    </StyledSortableContainer>
  );
};

const StyledProjectListItem = styled(ProjectListItem)`
  border: 1px solid black;
  width: 50%;
  margin: 30px;
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
