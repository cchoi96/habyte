import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem";
import AddProject from "./AddProject";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import axios from "axios";

const SortableItem = sortableElement(
  ({
    setModalOpen,
    projectName,
    projectNumberCommit,
    setProjectSelected,
    projectid
  }) => (
    <StyledProjectListItem
      setModalOpen={setModalOpen}
      setProjectSelected={setProjectSelected}
      projectName={projectName}
      projectid={projectid}
      projectNumberCommit={projectNumberCommit}
    />
  )
);

const SortableContainer = sortableContainer(({ children, className }) => {
  return <ul className={className}>{children}</ul>;
});

const ProjectList = ({ cookies, setProjectSelected, setModalOpen }) => {
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
  console.log("projectlist", projectList);
  let totalProjectList = projectList.map((project, index) => {
    console.log("projectnc", project);
    return (
      <SortableItem
        key={project.name}
        setProjectSelected={setProjectSelected}
        index={index}
        projectid={project.id}
        projectName={project.name}
        projectNumberCommit={project.number_commit}
        setModalOpen={setModalOpen}
      ></SortableItem>
    );
  });

  return (
    <StyledSortableContainer onSortEnd={onSortEnd} distance={1}>
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
  background-color: grey;
  width: 100%;
  margin: 2% auto;
  list-style-type: none;
  border-radius: 10px;
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
  list-style-type: none;
  padding: 3%;

  border-radius: 10px;
  height: 80vh;
  width: 70vw;
  background-color: rgba(67, 40, 116, 0.6);
  @media only screen and (max-width: 950px) {
    margin: 0 auto;
    margin-bottom: 10vh;
    height: 70vh;
    width: 100%;
  }
  display: flex;
  flex-wrap: wrap;

  overflow-y: scroll;
`;

export default ProjectList;
