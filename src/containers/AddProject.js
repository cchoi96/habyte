import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import axios from "axios";
import styled from "styled-components";

const AddProject = ({ cookies, refreshList, projectList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState([]);

  const check_repo_existing = (repo, projectList) => {
    for (let project of projectList) {
      if (project.name === repo.name) {
        return true;
      }
    }
  };
  //Add projectList as dependency, need to rerender this after projectList is changed
  useEffect(() => {
    axios
      .get(`https://api.github.com/users/cchoi96/repos`)
      .then(res => {
        let repoList = [];
        res.data.map(repo => {
          if (!check_repo_existing(repo, projectList)) {
            repoList.push(repo.name);
          }
        });
        return repoList;
      })
      .then(res => {
        setRepos(res);
      });
  }, [projectList]);

  return (
    <StyledDiv>
      <img src="/assets/other/plus.png" onClick={() => setIsOpen(true)}></img>
      {isOpen && (
        <ProjectModal
          refreshList={refreshList}
          cookies={cookies}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          repos={repos}
        />
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  img {
    width: 50px;
    transition: 0.1s ease-out;
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
`;

export default AddProject;
