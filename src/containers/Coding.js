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
  console.log(projectState);
  return (
    <StyledDiv>
      <ProjectList
        cookies={cookies}
        projectSelected={projectSelected}
        setProjectSelected={setProjectSelected}
        // setModalOpen={setModalOpen}
      />

      <TrelloBoard
        projectSelected={projectSelected}
        projectState={projectState}
        setProjectState={setProjectState}
      />

      {/* <TrelloModal
        projectSelected={projectSelected}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        projectSelected={projectSelected}
        projectState={projectState}
        setProjectState={setProjectState}
      /> */}
    </StyledDiv>
  );
};

export default Coding;

const StyledDiv = styled.div`
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);
  display: flex;
  margin-left: 3vw;
  border-radius: 10px;
  height: 80vh;
  width: 70vw;
  @media only screen and (max-width: 950px) {
    margin: 0 auto;
    width: 88vw;
  }
`;
