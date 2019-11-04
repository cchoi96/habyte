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
      <div id="title-container">
        <div id="coding-title">Coding</div>
        <StyledProjectList>
          <ProjectList
            cookies={cookies}
            projectSelected={projectSelected}
            setProjectSelected={setProjectSelected}
          />
        </StyledProjectList>
      </div>
      <StyledTrelloBoard>
        <TrelloBoard
          projectSelected={projectSelected}
          projectState={projectState}
          setProjectState={setProjectState}
        />
      </StyledTrelloBoard>
    </StyledDiv>
  );
};

export default Coding;

const StyledDiv = styled.div`

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  margin-left: 30px;
  #title-container {
    width: 100%
    height: fit-content
  }
  border: 1px solid black;
  border-radius: 10px;

  background-color: rgba(67, 40, 116, 0.4);

  #coding-title {
    background-color: rgba(67, 40, 116, 1);
    text-color: white;
    width: 40%;
    height: fit-content;
    margin: 0 auto;
    text-align: center;
    font-size: 5vh;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
    margin-bottom: 20px;
  }
`;

const StyledProjectList = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  height: 12vh;
  margin: 0px auto;
  min-width: 100%;
`;

const StyledTrelloBoard = styled.div`
  width: 90%;
  display: flex;
  height: 60%;

`;
