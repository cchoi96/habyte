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
    props.selected ? "#3cd3d1" : "rgba( 140, 218, 254.5, 1);"};
  width: 100%;
  display: flex;
  cursor: pointer;
  border-radius: 10px;
  align-items: center;
  height: 80%;
  justify-content: center;
  align-self: center;
  text-align: center;

  &: hover {
    transform: scale(1.01);
  }
`;
