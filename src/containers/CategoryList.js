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
      <StyledDiv>
        <NewHabits
          cookies={cookies}
          habits={habits}
          setHabits={setHabits}
          refreshHabits={refreshHabits}
        />
      </StyledDiv>
    ) : (
      <StyledDiv>
        <OldHabits
          cookies={cookies}
          oldHabits={oldHabits}
          setOldHabits={setOldHabits}
          refreshOldHabits={refreshOldHabits}
        />
      </StyledDiv>
    );

  return (
    <Fragment>
      <div className="header" onClick={() => setHabitMode("new")}>
        Current
      </div>
      <div className="header" onClick={() => setHabitMode("old")}>
        Past
      </div>
      {renderedHabits}
    </Fragment>
  );
};

const StyledDiv = styled.div`
  .header {
    text-align: center;
    width: 100%;
    height: 10vh;
    min-height: 75px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: rgba(36, 204, 143, 1);
    color: #fff;
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  list-style-type: none;
  width: 20%;
  background-color: #edecee;
  height: 80vh;
  min-height: 500px;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);

  @media only screen and (max-width: 950px) {
    width: 100%;
    min-height: 80px;
    height: 10vw;
    margin-bottom: 30px;
    .header {
      display: none;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    margin: 0;
    border-radius: 0;
  }
`;

export default CategoryList;
