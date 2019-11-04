import React, { useState } from "react";
import styled from "styled-components";
import ProjectList from "./ProjectList";
import TrelloBoard from "./TrelloBoard";

const Coding = ({
  cookies,
  setProjectSelected,
  projectSelected,
  projectState,
  setProjectState
}) => {
  return (
    <StyledDiv>
      <div id="coding-title">
        <h1>Coding</h1>
      </div>
      <ProjectList
        cookies={cookies}
        projectSelected={projectSelected}
        setProjectSelected={setProjectSelected}
      />
      <TrelloBoard
        projectSelected={projectSelected}
        projectState={projectState}
        setProjectState={setProjectState}
      />
    </StyledDiv>
  );
};

export default Coding;

const StyledDiv = styled.div`
  height: 80vh;
  width: 70vw;
  margin-left: 3vw;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: rgba(25, 181, 254, 0.5);
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);

  #coding-title {
    background-color: rgba(25, 181, 254, 1);
    width: 40%;
    min-width: 250px;
    margin: 0 auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
  }

  @media only screen and (max-width: 950px) {
    height: 70vh;
    margin: 0 auto;
    margin-bottom: 100px;
    width: 100%;
  }
`;
