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
      .get(`https://api.github.com/users/${cookies.github_name}/repos`)
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
      <div id="add-project">
        <img
          src="/assets/other/white-plus.png"
          onClick={() => setIsOpen(true)}
        ></img>
      </div>

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
  #add-project {
    height: 80%;
    min-height: 60px;
    transition: 0.1s ease-out;
    border-radius: 10px;
    box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
      rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
    background-color: rgba(
      ${25 * 0.5 + 255 * 0.5},
      ${181 * 0.5 + 255 * 0.5},
      ${254 * 0.5 + 255 * 0.5},
      1
    );
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
  img {
    width: 40px;
    height: 40px;
    margin: 0px 10px;
  }
`;

export default AddProject;
