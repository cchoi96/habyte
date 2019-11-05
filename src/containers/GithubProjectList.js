import React from "react";
import styled from "styled-components";
import GithubProjectListItem from "./GithubProjectListItem";

function GithubprojectList({ repos, data }) {
  const repoList = repos.map(repo => {
    data[repo] = false;
    return (
      <StyledRepoList key={repo}>
        <GithubProjectListItem repo={repo} data={data} />
      </StyledRepoList>
    );
  });
  return <StyledGithubProjectList>{repoList}</StyledGithubProjectList>;
}

export default GithubprojectList;

const StyledRepoList = styled.div`
  display: flex;
  height: 100px;
  width: 40%
  justify-content: center;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  flex-wrap: wrap;
  background-color: rgba( 140, 218, 254.5, 1)
  box-shadow: rgba(26,24,29,0.16) 0px 2px 2px 0px, rgba(26,24,29,0.12) 0px 1px 4px 0px;
  color: #fff;

  input {
    display: none;
  }


  @media only screen and (max-width: 750px) {
    width: 60%
  }

`;

const StyledGithubProjectList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
