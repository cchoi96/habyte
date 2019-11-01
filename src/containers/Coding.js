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
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <StyledDiv>
      <StyledProjectList
        cookies={cookies}
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

const StyledProjectList = styled(ProjectList)`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  @media (min-width: 480px) {
    flex-direction: column;
  }
`;
const StyledDiv = styled.div`
  margin-left: 3vw;
  width: 60%;
  border-radius: 10px;
`;
