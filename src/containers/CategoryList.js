import React, { useState } from "react";
import styled from "styled-components";
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
    <StyledDiv habitmode={habitMode}>
      <div className="headers">
        <div id="new" habitmode={habitMode} onClick={() => setHabitMode("new")}>
          Current
        </div>
        <div id="old" habitmode={habitMode} onClick={() => setHabitMode("old")}>
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
  border-radius: 10px;
  z-index: 5;
  .headers {
    display: flex;
    height: 7vh;
    color: #fff;
  }

  #new,
  #old {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 600;
  }

  #new {
    border-right: 1px solid #fff;
    background-color: ${props =>
      props.habitmode === "new"
        ? "rgba(36, 204, 143)"
        : "rgba(146, 230, 199, 1)"};
  }

  #old {
    border-right: 1px solid #fff;
    background-color: ${props =>
      props.habitmode === "old"
        ? "rgba(36, 204, 143)"
        : "rgba(146, 230, 199, 1)"};
  }

  @media only screen and (max-width: 950px) {
    order: 2;
    position: fixed;
    bottom: 0;
    left: 0;
    flex-direction: row;
    width: 100vw;

    .headers {
      flex-direction: column;
      margin-top: 10px;
      height: 80px;

      #new,
      #old {
        font-size: 0.7em;
        width: 15vw;
      }

      #old {
        border-radius: 0;
      }

      #new {
        border-radius: 0;
      }
    }
  }
`;

const StyledHabitDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  width: 100%;
  height: 73vh;
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);
  min-height: 400px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #edecee;
  @media only screen and (max-width: 950px) {
    margin-top: 10px;
    border-radius: 0;
    width: 85vw;
    max-height: 80px;
    min-height: 80px;
    overflow-x: scroll;
  }
`;

export default CategoryList;
