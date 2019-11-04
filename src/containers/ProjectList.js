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
        cookies={cookies}
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

  border: 2px solid #D7DEE3
  border-radius: 10px;
  list-style-type: none;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center
  background-color: rgba(67, 40, 116, 0.4);
  overflow-x: auto;
  height: fit-content;
  margin: 10px;


`;

const StyledProjectListItem = styled(ProjectListItem)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 90%;
  padding: 0 15px;
  margin: 8px 10px;

  border: 1px solid #ffffff;
  border-radius: 10px;
  box-shadow: 1.3px 1px 1px 2px;

  &: hover {
    color: #ffffff;
    font-weight: 400;
    cursor: pointer
  }



  .projectName, .projectCommit {
    width: 100%;
    text-align: center;
    align-self: center;
  }

  .projectName {
    font-size: 1.5em;
  }

  .projectCommit {
    font-size: 1em;
  }

`;

export default ProjectList;


// border: 1px solid black;
// box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
//   0 1px 4px 0 rgba(26, 24, 29, 0.12);
// &:hover {
//   box-shadow: 0 2px 1px 3px rgba(26, 24, 29, 0.21),
//     0 1px 1px 1px rgba(26, 24, 29, 0.16);
// }
// background-color: ${props =>
//   props.projectSelected == props.projectid
//     ? "rgba(0, 0, 0, 0.5)"
//     : "rgb(237, 236, 238);"};

// display: flex;
// flex-direction: column;

