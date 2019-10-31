import React, { useState } from "react";
import styled from "styled-components";
import ProjectList from "./ProjectList";
import TrelloModal from "./TrelloModal";

const Coding = ({
  cookies,
  setProjectSelected,
  projectSelected,
  projectState,
  setProjectState
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <StyledDiv>
      <ProjectList
        cookies={cookies}
        setProjectSelected={setProjectSelected}
        setModalOpen={setModalOpen}
      />
      {modalOpen && (
        <TrelloModal
          projectSelected={projectSelected}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          projectSelected={projectSelected}
          projectState={projectState}
          setProjectState={setProjectState}
        />
      )}
    </StyledDiv>
  );
};

export default Coding;

const StyledDiv = styled.div`
  margin-left: 3vw;
  border-radius: 10px;
  height: 80vh;
  width: 70vw;
  @media only screen and (max-width: 950px) {
    margin: 0 auto;
    width: 88vw;
  }
`;
