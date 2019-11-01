import React, { useState } from "react";
import HabitListItem from "./HabitListItem";
import styled from "styled-components";
const HabitList = ({ specificHabits, setIsOpen, habit_name }) => {
  const habitList = specificHabits.map(habit => {
    return (
      <HabitListItem
        key={habit.name}
        habit={habit}
        image={habit.image}
        habit_name={habit_name}
      />
    );
  });
  return (
    <StyledDiv className="habitList">
      {habitList}
      <div className="addImage">
        <img
          className="addImage"
          src="/assets/other/plus.png"
          onClick={() => setIsOpen(true)}
        ></img>
      </div>
    </StyledDiv>
  );
};

export default HabitList;

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .addImage {
    width: 250px;
    height: 250px;
    padding: 20px;
    margin: 20px;
    border: 1px solid black;
  }
  .addImage img {
    width: 100px;
    height: 100px;
    justify-self: center;
    align-self: center;
  }
`;
