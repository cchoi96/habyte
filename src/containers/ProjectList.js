import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem";
import AddProject from "./AddProject";

import axios from "axios";

const ProjectList = ({ cookies, setProjectSelected, projectSelected }) => {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    axios
      .post("http://0.0.0.0:8080/projects", {
        github_id: cookies.github_id
      })
      .then(res => {
        setProjectList(res.data);
        setProjectSelected(res.data[0].id);
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

  let totalProjectList = projectList.map(project => {
    return (
      <StyledProjectListItem
        projectSelected={projectSelected}
        key={project.name}
        setProjectSelected={setProjectSelected}
        projectid={project.id}
        projectName={project.name}
        projectNumberCommit={project.number_commit}
      />
    );
  });

  return (
    <StyledProjectList>
      <div className="habit-info">
        <h1>Coding</h1>
      </div>
      {totalProjectList}
      <AddProject
        refreshList={refreshList}
        projectList={projectList}
        cookies={cookies}
      />
    </StyledProjectList>
  );
};

const StyledProjectList = styled.div`
  list-style-type: none;
  padding: 3%;

  border-radius: 10px;
  height: 80vh;
  min-width: 20vw;
  max-width: 30vw;
  background-color: rgba(67, 40, 116, 0.4);
  padding-top: 0;
  .habit-info {
    background-color: rgba(67, 40, 116, 1);
    width: auto;
    padding: 0 15px;
    height: fit-content;
    margin: 0 auto;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
  }

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

const StyledProjectListItem = styled(ProjectListItem)`
  border: 1px solid black;
  background-color: ${props =>
    props.projectSelected == props.projectid
      ? "rgba(0, 0, 0, 0.5)"
      : "rgb(237, 236, 238);"};
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

export default ProjectList;
