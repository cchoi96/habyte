import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ProjectListItem = ({
  cookies,
  setModalOpen,
  projectName,
  projectNumberCommit,
  className,
  setProjectSelected,
  projectid
}) => {
  const [commits, setCommits] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/repos/${cookies.github_name}/${projectName}/contributors`
      )
      .then(res => {
        const contributors = res.data;
        let commits = 0;
        contributors.forEach(contributor => {
          commits += contributor.contributions;
        });
        setCommits(commits);
      });
  }, []);

  return (
    <StyledDiv
      className={className}
      onClick={() => {
        setProjectSelected(projectid);
      }}
    >
      <div className="projectCommit">{commits}</div>
      <div className="projectName">{projectName}</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  height: 70%;
  min-width: fit-content;
  min-height: 60px;
  font-size: 1.1.em;
  margin: 15px 7.5px;
  :first-child {
    margin-left: 15px;
  }
  :last-child {
    margin-right: 15px;
  }
  border-radius: 10px;
  box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
    rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
  transition: 0.1s ease-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  .projectName {
    display: flex;
    align-items: center;
    font-size: 1.3em;
    background-color: #f8f9fa;
    overflow-x: scroll;
    min-width: fit-content;
    height: 100%;
    min-height: 60px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 0 10px;
  }

  .projectCommit {
    font-size: 1em;
    min-width: 50px;
    font-weight: 600;
    height: 100%;
    background-color: rgba(140, 218, 254.5, 1);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f8f9fa;
  }
`;

export default ProjectListItem;
