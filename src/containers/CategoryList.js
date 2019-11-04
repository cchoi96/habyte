import React, { useState, Fragment } from "react";
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
    <StyledDiv habitMode={habitMode}>
      <div className="headers">
        <div id="new" habitMode={habitMode} onClick={() => setHabitMode("new")}>
          Current
        </div>
        <div id="old" habitMode={habitMode} onClick={() => setHabitMode("old")}>
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
    height: 50px;
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
      props.habitMode === "new"
        ? "rgba(36, 204, 143)"
        : "rgba(36, 204, 143, 0.5)"};
  }

  #old {
    border-right: 1px solid #fff;
    background-color: ${props =>
      props.habitMode === "old"
        ? "rgba(36, 204, 143)"
        : "rgba(36, 204, 143, 0.5)"};
  }

  @media only screen and (max-width: 950px) {
    order: 2;
    flex-direction: row;
    width: 92%;
    margin: 0 auto;
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
        border-radius: 0 0 0 10px;
      }

      #new {
        border-radius: 10px 0 0 0;
      }
    }
  }
`;

const StyledHabitDiv = styled.div`
  display: flex;
  overflow-y: hidden;
  width: 100%;
  height: 73vh;
  min-height: 400px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #edecee;
  @media only screen and (max-width: 950px) {
    margin-top: 10px;
    border-radius: 0 10px 10px 0;
    width: 70vw;
    max-height: 80px;
    min-height: 80px;
    overflow-x: scroll;
  }
`;

export default CategoryList;
