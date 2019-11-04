import React, { useState, Fragment } from "react";
import styled from "styled-components";
// import CategoryListItem from "./CategoryListItem";
import NewHabits from "./NewHabits";
import OldHabits from "./OldHabits";

const CategoryList = ({
  cookies,
  habits,
  setHabits,
  refreshHabits,
  oldHabits,
  setOldHabits,
  refreshOldHabits
}) => {
  const [habitMode, setHabitMode] = useState("new");

  const renderedHabits =
    habitMode === "new" ? (
      <StyledHabitDiv>
        <NewHabits
          cookies={cookies}
          habits={habits}
          setHabits={setHabits}
          refreshHabits={refreshHabits}
        />
      </StyledHabitDiv>
    ) : (
      <StyledHabitDiv>
        <OldHabits
          cookies={cookies}
          oldHabits={oldHabits}
          setOldHabits={setOldHabits}
          refreshOldHabits={refreshOldHabits}
        />
      </StyledHabitDiv>
    );

  return (
    <StyledDiv>
      <div className="headers">
        <div id="new" onClick={() => setHabitMode("new")}>
          Current
        </div>
        <div className="new" onClick={() => setHabitMode("old")}>
          Past
        </div>
      </div>
      {renderedHabits}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;

  .headers {
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    background-color: rgba(36, 204, 143);
    border-top-left-radius: 5px;
  }
`;

const StyledHabitDiv = styled.div``;

export default CategoryList;
