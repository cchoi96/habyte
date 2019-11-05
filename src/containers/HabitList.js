import React from "react";
import HabitListItem from "./HabitListItem";
import styled from "styled-components";
const HabitList = ({ specificHabits, setIsOpen, habit_name, habitslength }) => {
  const addHabits = () => {
    setIsOpen(true);
  };
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
      {habitslength <= 8 && (
        <div className="addImage">
          <StyledImg
            src="/assets/other/plus.png"
            onClick={addHabits}
          ></StyledImg>
        </div>
      )}
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
    min-height: 220px;
    padding: 20px;
    margin: 20px 2.5%;
    border-radius: 10px;
    background-color: rgb(237, 236, 238);
    box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
      0 1px 4px 0 rgba(26, 24, 29, 0.12);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.1s ease-out;

    &:hover {
      transform: scale(1.02);
    }

    @media only screen and (max-width: 750px) {
      width: 40%;
      height: 200px;
      margin: 20px 5%;
    }

    @media only screen and (max-width: 500px) {
      width: 220px;
      height: 200px;
      margin: 20px auto;
    }
  }
`;

const StyledImg = styled.img`
  width: 90px;
  height: 90px;
  border: none;
  box-shadow: none;
`;
