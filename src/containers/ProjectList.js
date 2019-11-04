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
      <ProjectListItem
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  list-style-type: none;
  width: 95%;
  height: 85px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(25, 181, 254, 0.7);
  overflow-x: auto;
  margin: 20px auto 0 auto;
  padding: 20px auto 20px auto;
`;

export default ProjectList;
