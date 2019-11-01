import React, { useState } from "react";
import HabitListItem from "./HabitListItem";
import styled from "styled-components";
const HabitList = ({ specificHabits, setIsOpen }) => {
  const habitList = specificHabits.map(habit => {
    return <HabitListItem key={habit.name} habit={habit} image={habit.image} />;
  });
  return (
    <StyledDiv className="habitList">
      {habitList}

      <img
        className="addImage"
        src="/assets/other/plus.png"
        onClick={() => setIsOpen(true)}
      ></img>
    </StyledDiv>
  );
};

export default HabitList;

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .addImage {
    width: 10%;
    height: 10%;
  }
`;
