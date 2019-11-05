import React, { useState } from "react";
import styled from "styled-components";

function GithubProjectListItem({ repo, data }) {
  const [repoSelected, setRepoSelected] = useState(false);

  return (
    <StyledLabel
      onClick={() => {
        data[repo] = !data[repo];
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
  background-color: ${props =>
    props.selected ? "#6c7bf8" : "rgba(25,181,254,1)"};
  width: 100%;
  display: flex;
  cursor: pointer;
  border-radius: 10px;
  align-items: center;
  height: 80%;
  justify-content: center;
  align-self: center;
  text-align: center;
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);

  &: hover {
    transform: scale(1.01);
  }
`;
