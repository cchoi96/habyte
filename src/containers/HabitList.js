import React from "react";
import HabitListItem from "./HabitListItem";
import styled from "styled-components";
const HabitList = ({ specificHabits, setIsOpen, habit_name }) => {
  const habitList = specificHabits.map(habit => {
    return (
      <HabitListItem
        key={habit.id}
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
  .addImage {
    width: 20%;
    height: 40%;
    padding: 20px;
    margin: 20px 2.5%;
    border-radius: 10px;
    background-color: rgb(237, 236, 238);
    box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
      0 1px 4px 0 rgba(26, 24, 29, 0.12);

    &:hover {
      box-shadow: 0 2px 2px 0 #fff, 0 1px 4px 0 #fff;
    }

    @media only screen and (max-width: 750px) {
      width: 40%;
      height: 30%;
      margin: 20px 5%;
    }

    @media only screen and (max-width: 500px) {
      width: 220px;
      height: 220px;
      margin: 20px auto;
    }
  }
  .addImage img {
    width: 100px;
    height: 100px;
    border: none;
    justify-self: center;
    align-self: center;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
`;
