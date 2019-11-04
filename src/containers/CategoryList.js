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
        <div id="old" onClick={() => setHabitMode("old")}>
          Past
        </div>
      </div>
      {renderedHabits}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  width: 20vw;
  flex-direction: column;
  .headers {
    display: flex;
    height: 60px;
  }

  #new,
  #old {
    background-color: rgba(36, 204, 143);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  #new {
    border-right: 1px solid black;
  }
`;

const StyledHabitDiv = styled.div`
  height: 66vh;
  min-height: 400px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow-y: scroll;
  background-color: #edecee;
`;

export default CategoryList;
