import React, { useState } from "react";
import styled from "styled-components";

function GithubProjectListItem({ repo, data }) {
  const [repoSelected, setRepoSelected] = useState(false);

  return (
    <StyledLabel
      onClick={() => {
        data[repo] = !data[repo];
        console.log(data[repo]);
        setRepoSelected(!repoSelected);
      }}
      selected={repoSelected}
    >
      {repo}
    </StyledLabel>
  );
}

export default GithubProjectListItem;

const StyledLabel = styled.label`
  background-color: ${props => (props.selected ? "#3cd3d1" : "white")};
  width: 100%;
  display: flex;
  cursor: pointer;
  border-radius: 10px;
  align-items: center;
  height: 80%;
  justify-content: center;
  align-self: center;
  box-shadow: ${props => (props.selected ? "1px 1px 1px 1px" : "0px 0.5px 0.5px 0.6px")};

  &: hover {
    background-color: #3cd3d1;
    transform: scale(1.01);
  }


`;
