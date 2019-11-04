import React from 'react';
import styled from "styled-components";
import GithubProjectListItem from './GithubProjectListItem';


function GithubprojectList({repos, data}) {

  const repoList = repos.map(repo => {
    data[repo] = false;
    return (
      <StyledRepoList key={repo}>
        <GithubProjectListItem repo={repo} data={data} />
      </StyledRepoList>
    );
  });
  return <StyledGithubProjectList>{repoList}</StyledGithubProjectList>
}

export default GithubprojectList;


const StyledRepoList = styled.div`
  display: flex;
  height: 100px;
  width: 40%
  justify-content: center;
  border: 2px solid black;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  flex-wrap: wrap;
  box-shadow: 0.5px 0.5px 1px 1px;

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